"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  UserPlus,
  ArrowLeft,
  Save,
  Loader2,
  Plus
} from "lucide-react";

/*
 * SUPABASE SCHEMA:
 * 
 * Table: leads
 * Columns:
 * - id: uuid (PRIMARY KEY, auto-generated)
 * - name: text (required)
 * - email: text (required)
 * - phone: text (required)
 * - address: text
 * - source: text (required)
 * - source_detail: text
 * - status: text (default: 'new')
 * - priority: text (default: 'warm')
 * - assigned_to: uuid (FOREIGN KEY to profiles)
 * - notes: text
 * - created_at: timestamptz (auto-generated)
 * - last_contacted: timestamptz
 * - converted_to_customer: boolean (default: false)
 * - metadata: jsonb
 * 
 * Example Supabase query:
 * const { data, error } = await supabase
 *   .from('leads')
 *   .insert([
 *     {
 *       name: formData.name,
 *       email: formData.email,
 *       phone: formData.phone,
 *       source: formData.source,
 *       source_detail: formData.sourceDetail,
 *       status: 'new',
 *       priority: formData.priority,
 *       assigned_to: formData.assignedTo,
 *       notes: formData.notes
 *     }
 *   ])
 *   .select()
 */

type LeadSource =
  | "website1"
  | "website2"
  | "trade_site"
  | "inbound_call"
  | "voicemail"
  | "email"
  | "facebook_campaign"
  | "facebook_messenger"
  | "instagram"
  | "whatsapp";

interface LeadFormData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  state: string;
  suburb: string;
  postalCode: string;
  country: string;
  company: string;
  referralType: "technician" | "customer" | "none" | "";
  referralName: string;
  source: LeadSource | "";
  priority: "hot" | "warm" | "cold";
  assignedTo: string;
  notes: string;
}

const sourceOptions = [
  { value: "website1", label: "DoorWindowPro.com" },
  { value: "website2", label: "HomeFix24.com" },
  { value: "trade_site", label: "Trade Sites (Checkatrade, TrustedTrader)" },
  { value: "inbound_call", label: "Inbound Call" },
  { value: "voicemail", label: "Voicemail" },
  { value: "email", label: "Email" },
  { value: "facebook_campaign", label: "Facebook Ads" },
  { value: "facebook_messenger", label: "Facebook Messenger" },
  { value: "instagram", label: "Instagram" },
  { value: "whatsapp", label: "WhatsApp Business" },
];

const teamMembers = [
  "Emily Rodriguez",
  "Michael Chen",
  "James Wilson",
  "Sarah Thompson",
];

const mockCompanies = [
  "Ace Building Services",
  "Brisbane Developments",
  "Coastal Property Management",
  "Delta Construction Group",
  "Elite Facilities Management",
  "First Class Building Services",
  "Gold Coast Properties",
  "Heritage Builders Ltd",
  "Innovative Housing Solutions",
  "Jones & Partners Real Estate",
  "Kings Commercial Services",
  "Lifestyle Property Group",
  "Metro Housing Association",
  "Northern Developments",
  "Omega Construction Co",
  "Premier Building Group",
  "Queensland Building Co",
  "Riverside Property Trust",
  "Smith Property Management",
  "TechBuild Australia",
  "Urban Development Corp",
  "Victory Construction Ltd",
  "Western Properties Group",
  "Xcel Building Services",
  "York Commercial Real Estate",
  "Zenith Property Solutions",
];

const mockTechnicians = [
  "John Smith (Tech)",
  "Mike Johnson (Tech)",
  "Sarah Williams (Tech)",
  "David Brown (Tech)",
  "Emma Wilson (Tech)",
];

const mockCustomers = [
  "ABC Corporation",
  "XYZ Properties",
  "Smith Homes",
  "Johnson Enterprises",
  "Williams Group",
];

export default function AddLeadPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    mobile: "",
    address: "",
    state: "",
    suburb: "",
    postalCode: "",
    country: "Australia",
    company: "",
    referralType: "",
    referralName: "",
    source: "",
    priority: "warm",
    assignedTo: teamMembers[0],
    notes: "",
  });
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([]);
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
  const [referralSuggestions, setReferralSuggestions] = useState<string[]>([]);
  const [showReferralSuggestions, setShowReferralSuggestions] = useState(false);

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim() && !formData.mobile.trim()) {
      newErrors.phone = "At least one phone number is required";
    }

    if (!formData.source) {
      newErrors.source = "Source is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call (replace with actual Supabase insert)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In production, this would be:
      // const { data, error } = await supabase
      //   .from('leads')
      //   .insert([{
      //     name: `${formData.firstName} ${formData.lastName}`,
      //     email: formData.email,
      //     phone: formData.phone,
      //     mobile: formData.mobile,
      //     address: formData.address,
      //     state: formData.state,
      //     suburb: formData.suburb,
      //     postal_code: formData.postalCode,
      //     country: formData.country,
      //     company: formData.company,
      //     referral_type: formData.referralType,
      //     referral_name: formData.referralName,
      //     source: formData.source,
      //     status: 'new',
      //     priority: formData.priority,
      //     assigned_to: formData.assignedTo,
      //     notes: formData.notes
      //   }])
      //   .select()
      //
      // if (error) throw error;


      // Show success and redirect to leads dashboard
      router.push("/dashboard/leads");
    } catch (error) {
      console.error("Error creating lead:", error);
      alert("Failed to create lead. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Handle address autocomplete - Australian addresses
    if (field === "address" && value.length > 2) {
      const mockSuggestions = [
        `${value} Street, Brisbane, QLD 4000, Australia`,
        `${value} Avenue, Gold Coast, QLD 4217, Australia`,
        `${value} Road, Sydney, NSW 2000, Australia`,
        `${value} Drive, Melbourne, VIC 3000, Australia`,
        `${value} Lane, Perth, WA 6000, Australia`,
      ];
      setAddressSuggestions(mockSuggestions);
      setShowAddressSuggestions(true);
    } else if (field === "address") {
      setShowAddressSuggestions(false);
      if (value.length === 0) {
        setShowAddressDetails(false);
      }
    }

    // Handle company autocomplete
    if (field === "company") {
      if (value.length === 0) {
        setCompanySuggestions(mockCompanies);
      } else {
        const filtered = mockCompanies.filter(c => c.toLowerCase().includes(value.toLowerCase()));
        setCompanySuggestions(filtered);
      }
    }

    // Handle referral autocomplete
    if (field === "referralName" && formData.referralType) {
      const referralList = formData.referralType === "technician" ? mockTechnicians : mockCustomers;
      if (value.length === 0) {
        setReferralSuggestions(referralList);
      } else {
        const filtered = referralList.filter(r => r.toLowerCase().includes(value.toLowerCase()));
        setReferralSuggestions(filtered);
      }
    } else if (field === "referralName" && value.length <= 1) {
      setShowReferralSuggestions(false);
    }
  };

  const handleAddressSelect = (address: string) => {
    // Parse Australian address
    const parts = address.split(', ');
    const suburb = parts[1] || "";
    const state = parts[2] || "";
    const country = parts[3] || "Australia";

    // Extract postal code from state if present (e.g., "QLD 4000")
    let stateCode = state;
    let postalCode = "";
    if (state.includes(' ')) {
      const stateParts = state.split(' ');
      stateCode = stateParts[0];
      postalCode = stateParts[1] || "";
    }

    setFormData(prev => ({
      ...prev,
      address,
      suburb,
      state: stateCode,
      country,
      postalCode
    }));
    setShowAddressSuggestions(false);
    setShowAddressDetails(true);
  };

  const handleCompanySelect = (company: string) => {
    setFormData(prev => ({ ...prev, company }));
    setShowCompanySuggestions(false);
  };

  const handleReferralSelect = (referral: string) => {
    setFormData(prev => ({ ...prev, referralName: referral }));
    setShowReferralSuggestions(false);
  };

  return (
    <>
      {/* Breadcrumb Header */}
      <header className="flex shrink-0 items-center gap-2 border-b bg-background px-6 py-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard/leads">Leads</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Add Lead</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="p-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Add New Lead</h1>
                <p className="text-muted-foreground mt-1">
                  Capture lead information from any source
                </p>
              </div>
            </div>
            <UserPlus className="h-8 w-8 text-muted-foreground" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-1">
              {/* Main Information */}
              <div className="xl:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Lead Information</CardTitle>
                    <CardDescription>Basic contact details and source information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* First Name and Last Name */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          className={errors.firstName ? "border-red-500" : ""}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-500">{errors.firstName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Smith"
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          className={errors.lastName ? "border-red-500" : ""}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-500">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Job Title */}
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        placeholder="e.g., Property Manager, Homeowner"
                        value={formData.jobTitle}
                        onChange={(e) => handleChange("jobTitle", e.target.value)}
                      />
                    </div>

                    {/* Email - Full Width */}
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    {/* Mobile and Phone */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input
                          id="mobile"
                          type="tel"
                          placeholder="+61 4XX XXX XXX"
                          value={formData.mobile}
                          onChange={(e) => handleChange("mobile", e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Primary contact number
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone {!formData.mobile && <span className="text-red-500">*</span>}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+61 X XXXX XXXX"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-2 relative">
                      <Label htmlFor="company">Company</Label>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Input
                            id="company"
                            placeholder="Search or type company name"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            onFocus={() => {
                              if (formData.company.length === 0) {
                                setCompanySuggestions(mockCompanies);
                              }
                              setShowCompanySuggestions(true);
                            }}
                            onBlur={() => setTimeout(() => setShowCompanySuggestions(false), 200)}
                            autoComplete="off"
                          />
                          {showCompanySuggestions && companySuggestions.length > 0 && (
                            <div className="absolute z-50 w-full mt-1 bg-background border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              {companySuggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                                  onClick={() => handleCompanySelect(suggestion)}
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => window.open('/dashboard/companies/add', '_blank')}
                          title="Add new company"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Link this lead to a company or create new
                      </p>
                    </div>

                    {/* Referral */}
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="referralType">Referral Source</Label>
                          <Select
                            value={formData.referralType}
                            onValueChange={(value) => handleChange("referralType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="How did this lead find you?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="technician">Technician Referral</SelectItem>
                              <SelectItem value="customer">Customer Referral</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {formData.referralType && formData.referralType !== "none" && (
                          <div className="space-y-2">
                            <Label htmlFor="referralName">Referred By</Label>
                            <div className="flex gap-2">
                              <div className="flex-1 relative">
                                <Input
                                  id="referralName"
                                  placeholder="Search or type name"
                                  value={formData.referralName}
                                  onChange={(e) => handleChange("referralName", e.target.value)}
                                  onFocus={() => {
                                    const referralList = formData.referralType === "technician" ? mockTechnicians : mockCustomers;
                                    if (formData.referralName.length === 0) {
                                      setReferralSuggestions(referralList);
                                    }
                                    setShowReferralSuggestions(true);
                                  }}
                                  onBlur={() => setTimeout(() => setShowReferralSuggestions(false), 200)}
                                  autoComplete="off"
                                />
                                {showReferralSuggestions && referralSuggestions.length > 0 && (
                                  <div className="absolute z-50 w-full mt-1 bg-background border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                    {referralSuggestions.map((suggestion, index) => (
                                      <button
                                        key={index}
                                        type="button"
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                                        onClick={() => handleReferralSelect(suggestion)}
                                      >
                                        {suggestion}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => { }}
                                title="Add new referral"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {formData.referralType === "technician" ? "Select a technician who referred this lead" : "Select a customer who referred this lead"}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Address with Autocomplete */}
                    <div className="space-y-2 relative">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Start typing address..."
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        onFocus={() => formData.address.length > 2 && setShowAddressSuggestions(true)}
                        autoComplete="off"
                      />
                      {showAddressSuggestions && addressSuggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-background border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {addressSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                              onClick={() => handleAddressSelect(suggestion)}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Property address for service location
                      </p>
                    </div>

                    {/* Address Details - Show after autocomplete selection */}
                    {showAddressDetails && (
                      <div className="grid gap-4 sm:grid-cols-2 p-4 border rounded-lg bg-muted/30">
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Select
                            value={formData.state}
                            onValueChange={(value) => handleChange("state", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="QLD">Queensland</SelectItem>
                              <SelectItem value="NSW">New South Wales</SelectItem>
                              <SelectItem value="VIC">Victoria</SelectItem>
                              <SelectItem value="WA">Western Australia</SelectItem>
                              <SelectItem value="SA">South Australia</SelectItem>
                              <SelectItem value="TAS">Tasmania</SelectItem>
                              <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                              <SelectItem value="NT">Northern Territory</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="suburb">Suburb/City</Label>
                          <Select
                            value={formData.suburb}
                            onValueChange={(value) => handleChange("suburb", value)}
                            disabled={!formData.state}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select suburb" />
                            </SelectTrigger>
                            <SelectContent>
                              {formData.state === "QLD" && (
                                <>
                                  <SelectItem value="Brisbane">Brisbane</SelectItem>
                                  <SelectItem value="Gold Coast">Gold Coast</SelectItem>
                                  <SelectItem value="Sunshine Coast">Sunshine Coast</SelectItem>
                                  <SelectItem value="Cairns">Cairns</SelectItem>
                                  <SelectItem value="Townsville">Townsville</SelectItem>
                                </>
                              )}
                              {formData.state === "NSW" && (
                                <>
                                  <SelectItem value="Sydney">Sydney</SelectItem>
                                  <SelectItem value="Newcastle">Newcastle</SelectItem>
                                  <SelectItem value="Wollongong">Wollongong</SelectItem>
                                  <SelectItem value="Central Coast">Central Coast</SelectItem>
                                  <SelectItem value="Blue Mountains">Blue Mountains</SelectItem>
                                </>
                              )}
                              {formData.state === "VIC" && (
                                <>
                                  <SelectItem value="Melbourne">Melbourne</SelectItem>
                                  <SelectItem value="Geelong">Geelong</SelectItem>
                                  <SelectItem value="Ballarat">Ballarat</SelectItem>
                                  <SelectItem value="Bendigo">Bendigo</SelectItem>
                                </>
                              )}
                              {formData.state === "WA" && (
                                <>
                                  <SelectItem value="Perth">Perth</SelectItem>
                                  <SelectItem value="Fremantle">Fremantle</SelectItem>
                                  <SelectItem value="Mandurah">Mandurah</SelectItem>
                                </>
                              )}
                              {formData.state === "SA" && (
                                <>
                                  <SelectItem value="Adelaide">Adelaide</SelectItem>
                                  <SelectItem value="Glenelg">Glenelg</SelectItem>
                                </>
                              )}
                              {formData.state === "TAS" && (
                                <>
                                  <SelectItem value="Hobart">Hobart</SelectItem>
                                  <SelectItem value="Launceston">Launceston</SelectItem>
                                </>
                              )}
                              {formData.state === "ACT" && (
                                <SelectItem value="Canberra">Canberra</SelectItem>
                              )}
                              {formData.state === "NT" && (
                                <>
                                  <SelectItem value="Darwin">Darwin</SelectItem>
                                  <SelectItem value="Alice Springs">Alice Springs</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            placeholder="Postal Code"
                            value={formData.postalCode}
                            onChange={(e) => handleChange("postalCode", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={(e) => handleChange("country", e.target.value)}
                            readOnly
                          />
                        </div>
                      </div>
                    )}

                    {/* Source */}
                    <div className="space-y-2">
                      <Label htmlFor="source">
                        Lead Source <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.source}
                        onValueChange={(value) => handleChange("source", value)}
                      >
                        <SelectTrigger className={errors.source ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          {sourceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.source && (
                        <p className="text-sm text-red-500">{errors.source}</p>
                      )}
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add any additional information about this lead..."
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => handleChange("notes", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Assignment & Priority */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Assignment</CardTitle>
                    <CardDescription>Set priority and assign to team member</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Priority */}
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) => handleChange("priority", value as "hot" | "warm" | "cold")}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hot">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-500" />
                              Hot
                            </div>
                          </SelectItem>
                          <SelectItem value="warm">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-orange-500" />
                              Warm
                            </div>
                          </SelectItem>
                          <SelectItem value="cold">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                              Cold
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Assigned To */}
                    <div className="space-y-2">
                      <Label htmlFor="assignedTo">Assign To</Label>
                      <Select
                        value={formData.assignedTo}
                        onValueChange={(value) => handleChange("assignedTo", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers.map((member) => (
                            <SelectItem key={member} value={member}>
                              {member}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Info Box */}
                    <div className="pt-4 border-t">
                      <div className="rounded-lg bg-muted p-4 space-y-2">
                        <h4 className="font-medium text-sm">Lead Status</h4>
                        <p className="text-xs text-muted-foreground">
                          New leads are automatically set to <span className="font-semibold">&quot;New&quot;</span> status and will appear in the team member&apos;s queue.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating Lead...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Create Lead
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
