export type UserRole =
    | "admin"
    | "manager"
    | "sales"
    | "support"
    | "marketing"
    | "technician"
    | "dispatcher"
    | "project_manager";

export type UserStatus = "active" | "inactive" | "pending" | "on_field";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    mobile?: string;
    avatar_url?: string;
    role: UserRole;
    status: UserStatus;
    department: string;
    territory?: string;
    certification?: string;
    address?: string;
    last_active_at: string;
    created_at: string;
    // 1. Leads & Conversion
    leads_assigned?: number;
    leads_contacted?: number;
    leads_qualified?: number;
    leads_converted?: number;
    leads_lost?: number;
    // 2. Communication (Calls)
    calls_assigned?: number;
    calls_dials?: number;
    calls_connected?: number;
    calls_voicemails?: number;
    calls_lost?: number;
    avg_call_duration?: string;
    // 3. Communication (Emails)
    emails_assigned?: number;
    emails_sent?: number;
    emails_replies_received?: number;
    emails_conversations?: number;
    emails_lost?: number;
    // 4. Communication (SMS)
    sms_assigned?: number;
    sms_sent?: number;
    sms_received?: number;
    sms_conversations?: number;
    sms_lost?: number;
    // 5. Tasks
    tasks_assigned?: number;
    tasks_in_progress?: number;
    tasks_completed?: number;
    tasks_lost?: number;
    // 6. Sales & Opportunities
    opportunities_assigned?: number;
    opportunities_in_progress?: number;
    opportunities_won?: number;
    opportunities_lost?: number;
    pipeline_value?: number;
    revenue_generated?: number;
    // 7. Field Service & Booking
    jobs_assigned?: number;
    jobs_dispatched?: number;
    jobs_on_field?: number;
    jobs_completed?: number;
    jobs_lost?: number;
    avg_job_rating?: number;
    // 8. Support & Marketing
    tickets_assigned?: number;
    tickets_in_progress?: number;
    tickets_resolved?: number;
    tickets_lost?: number;
    avg_resolution_time?: string;
    campaigns_managed?: number;
    // Access & Identity
    access_level?: "Full" | "Restricted" | "Limited";
    teams?: string[];
    current_location?: string;
}

export type ContactType = "lead" | "customer" | "partner";
export type ContactStatus = "active" | "inactive" | "cold" | "hot" | "warm";
export type CompanyStatus = "prospect" | "customer" | "partner" | "inactive";

export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    phone: string;
    company?: string;
    jobTitle?: string;
    avatar?: string;
    type?: ContactType;
    status?: ContactStatus;
    tags?: string[];
    assigned_to?: string;
    last_contact?: string;
    lifetime_value?: number;
    deals_count?: number;
    streetAddress?: string;
    suburb?: string;
    postalCode?: string;
    city?: string;
    state?: string;
}

export interface Company {
    id: string;
    name: string;
    email: string;
    phone: string;
    mobile: string;
    address: string;
    industry?: string;
    website?: string;
    status: CompanyStatus;
    employee_count?: string;
    annual_revenue?: number;
    location: string;
    assigned_to?: string;
}

export type LeadSource =
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

export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    source: LeadSource;
    source_detail: string;
    status: LeadStatus;
    priority: "hot" | "warm" | "cold";
    assigned_to: string;
    created_at: string;
    last_contacted: string;
}

export type PipelineStep = 'leads' | 'contacted' | 'quoting' | 'booked' | 'completed' | 'lost';
export type OpportunitySource = 'webform' | 'lead' | 'referral';

export interface Opportunity {
    id: string;
    title: string;
    contactId: string;
    companyId?: string;
    value: number; // Booked/Quoted Value
    actualRevenue: number; // Set only when completed
    pipeline: PipelineStep;
    probability: number;
    source: OpportunitySource;
    customerSatisfaction?: 'happy' | 'unhappy';
    lossReason?: string;
    scheduledDate?: string;
    completedDate?: string;
    assignedTo: string;
    technicianId?: string;
    createdAt: string;
}

// --- DUMMY USERS ---
export const DUMMY_USERS: User[] = [
    {
        id: "u1",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.j@company.com",
        phone: "+1 (555) 123-4567",
        role: "admin",
        status: "active",
        department: "Executive",
        last_active_at: "2 minutes ago",
        created_at: "2024-01-15",
        access_level: "Full",
        teams: ["All"],
        mobile: "+1 (555) 000-1111",
        address: "100 Executive Way, Houston, TX",
    },
    {
        id: "u2",
        firstName: "Michael",
        lastName: "Chen",
        email: "m.chen@company.com",
        phone: "+1 (555) 234-5678",
        role: "manager",
        status: "active",
        department: "Sales",
        territory: "West Coast",
        last_active_at: "15 minutes ago",
        created_at: "2024-02-10",
        // 2. Communication (Calls)
        calls_assigned: 700,
        calls_dials: 650,
        calls_connected: 542,
        calls_voicemails: 108,
        calls_lost: 50,
        avg_call_duration: "4m 15s",
        // 3. Communication (Emails)
        emails_assigned: 1500,
        emails_replies_received: 450,
        emails_sent: 1240,
        emails_conversations: 200,
        emails_lost: 50,
        // 4. Communication (SMS)
        sms_assigned: 500,
        sms_sent: 450,
        sms_received: 380,
        sms_conversations: 120,
        sms_lost: 20,
        // 5. Tasks
        tasks_assigned: 60,
        tasks_in_progress: 12,
        tasks_completed: 45,
        tasks_lost: 3,
        // 6. Sales & Opportunities
        opportunities_assigned: 32,
        opportunities_in_progress: 4,
        opportunities_won: 24,
        opportunities_lost: 4,
        pipeline_value: 450000,
        revenue_generated: 198000,
        mobile: "+1 (555) 111-2222",
        address: "200 Sales Lane, Seattle, WA",
    },
    {
        id: "u3",
        firstName: "Emily",
        lastName: "Rodriguez",
        email: "emily.r@company.com",
        phone: "+1 (555) 345-6789",
        role: "sales",
        status: "active",
        department: "Sales",
        territory: "East Coast",
        last_active_at: "1 hour ago",
        created_at: "2024-03-05",
        // 1. Leads & Conversion
        leads_assigned: 156,
        leads_contacted: 142,
        leads_qualified: 88,
        leads_converted: 42,
        leads_lost: 15,
        // 2. Communication (Calls)
        calls_assigned: 500,
        calls_dials: 450,
        calls_connected: 385,
        calls_voicemails: 65,
        calls_lost: 30,
        // 3. Communication (Emails)
        emails_assigned: 1100,
        emails_replies_received: 320,
        emails_sent: 950,
        emails_conversations: 150,
        emails_lost: 30,
        // 4. Communication (SMS)
        sms_assigned: 300,
        sms_sent: 280,
        sms_received: 210,
        sms_conversations: 85,
        sms_lost: 10,
        // 5. Tasks
        tasks_assigned: 60,
        tasks_in_progress: 15,
        tasks_completed: 38,
        tasks_lost: 7,
        // 6. Sales & Opportunities
        opportunities_assigned: 28,
        opportunities_in_progress: 4,
        opportunities_won: 18,
        opportunities_lost: 6,
        pipeline_value: 320000,
        revenue_generated: 167000,
        mobile: "+1 (555) 222-3333",
        address: "300 East Blvd, New York, NY",
    },
    {
        id: "u4",
        firstName: "David",
        lastName: "Park",
        email: "d.park@company.com",
        phone: "+1 (555) 456-7890",
        role: "support",
        status: "active",
        department: "Customer Support",
        last_active_at: "30 minutes ago",
        created_at: "2024-03-20",
        // 8. Support & Marketing
        tickets_assigned: 250,
        tickets_in_progress: 15,
        tickets_resolved: 234,
        tickets_lost: 1,
        avg_resolution_time: "2.5h",
        mobile: "+1 (555) 333-4444",
        address: "400 Support St, Chicago, IL",
    },
    {
        id: "u5",
        firstName: "Lisa",
        lastName: "Thompson",
        email: "l.thompson@company.com",
        phone: "+1 (555) 567-8901",
        role: "marketing",
        status: "active",
        department: "Marketing",
        last_active_at: "2 hours ago",
        created_at: "2024-04-01",
        campaigns_managed: 18,
        leads_assigned: 1250,
        leads_contacted: 1100,
        leads_qualified: 420,
        leads_converted: 65,
        leads_lost: 45,
        mobile: "+1 (555) 444-5555",
        address: "500 Marketing Ave, Los Angeles, CA",
    },
    {
        id: "u6",
        firstName: "Carlos",
        lastName: "Martinez",
        email: "c.martinez@company.com",
        phone: "+1 (555) 678-9012",
        role: "technician",
        status: "on_field",
        department: "Field Service",
        certification: "HVAC Master, EPA Certified",
        current_location: "3847 Maple Ave, Austin, TX",
        last_active_at: "10 minutes ago",
        created_at: "2024-04-15",
        // 7. Field Service & Booking
        jobs_assigned: 180,
        jobs_completed: 156,
        jobs_lost: 4,
        avg_job_rating: 4.8,
        mobile: "+1 (555) 555-6666",
        address: "3847 Maple Ave, Austin, TX",
    },
    {
        id: "u7",
        firstName: "Rachel",
        lastName: "Kim",
        email: "r.kim@company.com",
        phone: "+1 (555) 789-0123",
        role: "dispatcher",
        status: "active",
        department: "Operations",
        last_active_at: "5 minutes ago",
        created_at: "2024-05-01",
        // 7. Field Service & Booking
        jobs_assigned: 200,
        jobs_dispatched: 156,
        jobs_on_field: 3,
    },
    {
        id: "u8",
        firstName: "James",
        lastName: "Wilson",
        email: "j.wilson@company.com",
        phone: "+1 (555) 890-1234",
        role: "project_manager",
        status: "active",
        department: "Operations",
        last_active_at: "1 hour ago",
        created_at: "2024-05-10",
        // 2. Communication (Calls)
        calls_assigned: 200,
        calls_dials: 150,
        calls_connected: 120,
        calls_voicemails: 30,
        // 4. Communication (SMS)
        sms_assigned: 50,
        sms_sent: 25,
        sms_received: 20,
        // 5. Tasks
        tasks_assigned: 20,
        tasks_in_progress: 4,
        tasks_completed: 12,
        // 6. Sales & Opportunities
        opportunities_assigned: 24,
        opportunities_in_progress: 6,
        opportunities_won: 15,
        pipeline_value: 580000,
        revenue_generated: 425000,
        // 7. Field Service & Booking
        jobs_assigned: 25,
        jobs_completed: 18,
    },
    {
        id: "u9",
        firstName: "Alex",
        lastName: "Rivera",
        email: "a.rivera@company.com",
        phone: "+1 (555) 901-2345",
        role: "technician",
        status: "active",
        department: "Field Service",
        certification: "Electrician Level 2",
        last_active_at: "5 minutes ago",
        created_at: "2024-06-01",
        // 7. Field Service & Booking
        jobs_assigned: 100,
        jobs_completed: 89,
        jobs_lost: 2,
    },
    {
        id: "u10",
        firstName: "Jordan",
        lastName: "Lee",
        email: "j.lee@company.com",
        phone: "+1 (555) 012-3456",
        role: "technician",
        status: "on_field",
        department: "Field Service",
        certification: "Plumbing Specialist",
        last_active_at: "Just now",
        created_at: "2024-06-15",
        // 7. Field Service & Booking
        jobs_assigned: 75,
        jobs_completed: 64,
        jobs_lost: 3,
    },
    {
        id: "u11",
        firstName: "Taylor",
        lastName: "Smith",
        email: "t.smith@company.com",
        phone: "+1 (555) 123-0000",
        role: "technician",
        status: "active",
        department: "Field Service",
        certification: "Roofing Expert",
        last_active_at: "45 minutes ago",
        created_at: "2024-07-01",
        // 7. Field Service & Booking
        jobs_assigned: 130,
        jobs_completed: 112,
        jobs_lost: 5,
    },
    {
        id: "u12",
        firstName: "Casey",
        lastName: "Jones",
        email: "c.jones@company.com",
        phone: "+1 (555) 234-1111",
        role: "technician",
        status: "on_field",
        department: "Field Service",
        certification: "Solar Panel Installer",
        last_active_at: "10 minutes ago",
        created_at: "2024-07-10",
        // 7. Field Service & Booking
        jobs_assigned: 50,
        jobs_completed: 45,
        jobs_lost: 2,
        mobile: "+1 (555) 345-2222",
        address: "742 Evergreen Terrace, Springfield",
    },
];

// --- DUMMY COMPANIES ---
export const DUMMY_COMPANIES: Company[] = [
    { id: "c1", name: "Ace Building Services", email: "info@acebuilding.com", phone: "07 3344 5566", mobile: "0412 345 678", address: "123 Business Way, Brisbane QLD 4000", status: "customer", location: "Brisbane, QLD", employee_count: "50-100", annual_revenue: 15000000, industry: "Real Estate", website: "acebuilding.com", assigned_to: "Michael Chen" },
    { id: "c2", name: "Brisbane Developments", email: "contact@brisdev.com", phone: "07 3322 1100", mobile: "0422 111 222", address: "45 St George Terrace, Brisbane QLD 4000", status: "customer", location: "Brisbane, QLD", employee_count: "10-50", annual_revenue: 5000000, industry: "Real Estate", website: "brisdev.com", assigned_to: "Michael Chen" },
    { id: "c3", name: "Coastal Property Management", email: "support@coastalprop.com", phone: "07 5566 7788", mobile: "0444 555 666", address: "88 Ocean Drive, Gold Coast QLD 4217", status: "customer", location: "Gold Coast, QLD", employee_count: "50-100", annual_revenue: 8000000, industry: "Real Estate", website: "coastalprop.com", assigned_to: "Michael Chen" },
    { id: "c4", name: "Delta Construction Group", email: "projects@deltacon.com", phone: "02 9988 7766", mobile: "0433 999 888", address: "12 Industry St, Sydney NSW 2000", status: "prospect", location: "Sydney, NSW", employee_count: "100-500", annual_revenue: 25000000, industry: "Construction", website: "deltacon.com", assigned_to: "Michael Chen" },
    { id: "c5", name: "Elite Facilities Management", email: "admin@elitefm.com", phone: "03 9988 1122", mobile: "0455 444 333", address: "55 Corporate Blvd, Melbourne VIC 3000", status: "customer", location: "Melbourne, VIC", employee_count: "500+", annual_revenue: 45000000, industry: "Facilities", website: "elitefm.com", assigned_to: "Michael Chen" },
    { id: "c6", name: "First Class Building Services", email: "hello@firstclass.com", phone: "07 4433 2211", mobile: "0466 777 888", address: "22 Excellence Rd, Brisbane QLD 4006", status: "partner", location: "Brisbane, QLD", employee_count: "10-50", annual_revenue: 3000000, industry: "Real Estate", website: "firstclass.com", assigned_to: "Michael Chen" },
    { id: "c7", name: "Gold Coast Properties", email: "info@gcproperties.com", phone: "07 5588 9900", mobile: "0477 888 999", address: "101 Surfers Paradise Blvd, Gold Coast QLD 4217", status: "customer", location: "Gold Coast, QLD", employee_count: "50-100", annual_revenue: 12000000, industry: "Real Estate", website: "gcproperties.com", assigned_to: "Michael Chen" },
    { id: "c8", name: "Heritage Builders Ltd", email: "contact@heritage.com", phone: "02 8877 6655", mobile: "0488 999 000", address: "44 Traditional Ave, Sydney NSW 2000", status: "prospect", location: "Sydney, NSW", employee_count: "100-500", annual_revenue: 18000000, industry: "Construction", website: "heritage.com", assigned_to: "Michael Chen" },
    { id: "c9", name: "Innovative Housing Solutions", email: "leads@innovative.com", phone: "03 7766 5544", mobile: "0499 000 111", address: "77 Modern Way, Melbourne VIC 3000", status: "customer", location: "Melbourne, VIC", employee_count: "50-100", annual_revenue: 9000000, industry: "Construction", website: "innovative.com", assigned_to: "Michael Chen" },
    { id: "c10", name: "Jones & Partners Real Estate", email: "sales@jones.com", phone: "08 9988 7766", mobile: "0400 111 222", address: "33 Property Lane, Perth WA 6000", status: "prospect", location: "Perth, WA", employee_count: "10-50", annual_revenue: 4000000, industry: "Real Estate", website: "jones.com", assigned_to: "Michael Chen" },
];

// --- DUMMY CONTACTS ---
export const DUMMY_CONTACTS: Contact[] = [
    { id: "1", firstName: "James", lastName: "Wilson", email: "james.wilson@example.com", mobile: "0412 345 678", phone: "07 3344 5566", company: "Ace Building Services", jobTitle: "Project Manager", streetAddress: "123 Business Way", suburb: "Brisbane City", postalCode: "4000", city: "Brisbane", state: "QLD" },
    { id: "2", firstName: "Sarah", lastName: "Thompson", email: "sarah.t@homemail.com", mobile: "0422 111 222", phone: "07 3322 1100", jobTitle: "Residential Customer", streetAddress: "45 St George Terrace", suburb: "South Brisbane", postalCode: "4101", city: "Brisbane", state: "QLD" },
    { id: "3", firstName: "Michael", lastName: "Chen", email: "m.chen@techbuild.au", mobile: "0433 999 888", phone: "02 9988 7766", company: "TechBuild Australia", jobTitle: "Architect", streetAddress: "12 Industry St", suburb: "Surry Hills", postalCode: "2010", city: "Sydney", state: "NSW" },
    { id: "4", firstName: "Emily", lastName: "Rodriguez", email: "emily.r@coastalprop.com", mobile: "0444 555 666", phone: "07 5566 7788", company: "Coastal Property Management", jobTitle: "Property Manager", streetAddress: "88 Ocean Drive", suburb: "Surfers Paradise", postalCode: "4217", city: "Gold Coast", state: "QLD" },
    { id: "5", firstName: "David", lastName: "Park", email: "d.park@urban.au", mobile: "0455 444 333", phone: "03 9988 1122", jobTitle: "Residential Customer", streetAddress: "55 Corporate Blvd", suburb: "Melbourne CBD", postalCode: "3000", city: "Melbourne", state: "VIC" },
    { id: "6", firstName: "Lisa", lastName: "Thompson", email: "lisa.t@firstclass.com", mobile: "0466 777 888", phone: "07 4433 2211", company: "First Class Building Services", jobTitle: "Director", streetAddress: "22 Excellence Rd", suburb: "Fortitude Valley", postalCode: "4006", city: "Brisbane", state: "QLD" },
    { id: "7", firstName: "Carlos", lastName: "Martinez", email: "c.martinez@fieldservice.au", mobile: "0477 222 111", phone: "02 8877 6655", company: "Field Service Pro", jobTitle: "Head Technician", streetAddress: "44 Traditional Ave", suburb: "Manly", postalCode: "2095", city: "Sydney", state: "NSW" },
    { id: "8", firstName: "Rachel", lastName: "Kim", email: "r.kim@metroha.org", mobile: "0488 333 444", phone: "03 7766 5544", company: "Metro Housing Association", jobTitle: "Operations Manager", streetAddress: "77 Modern Way", suburb: "Richmond", postalCode: "3121", city: "Melbourne", state: "VIC" },
    { id: "9", firstName: "Marcus", lastName: "Johnson", email: "m.johnson@xcel.com", mobile: "0499 666 555", phone: "08 9988 7766", jobTitle: "Property Manager", streetAddress: "33 Property Lane", suburb: "Perth City", postalCode: "6000", city: "Perth", state: "WA" },
    { id: "10", firstName: "Amanda", lastName: "Foster", email: "a.foster@zenith.com", mobile: "0400 111 222", phone: "07 2233 4455", company: "Zenith Property Solutions", jobTitle: "CEO", streetAddress: "101 Zenith Dr", suburb: "Spring Hill", postalCode: "4000", city: "Brisbane", state: "QLD" },
    ...Array.from({ length: 90 }).map((_, i) => ({
        id: (i + 11).toString(),
        firstName: `Contact${i + 11}`,
        lastName: `Lastname${i + 11}`,
        email: `contact${i + 11}@example.com`,
        mobile: `0400 000 ${String(i + 11).padStart(3, '0')}`,
        phone: `07 0000 ${String(i + 11).padStart(4, '0')}`,
        company: i % 4 === 0 ? undefined : i % 2 === 0 ? "Global Reach" : "Lifestyle Property Group",
        jobTitle: i % 4 === 0 ? "Residential" : i % 5 === 0 ? "Technician" : i % 3 === 0 ? "Lead Developer" : "Customer",
        streetAddress: `${i + 20} Random St`,
        suburb: i % 3 === 0 ? "North Sydney" : "South Perth",
        postalCode: String(2000 + i),
        city: i % 2 === 0 ? "Sydney" : "Perth",
        state: i % 2 === 0 ? "NSW" : "WA"
    }))
];

// --- DUMMY OPPORTUNITIES ---
export const DUMMY_OPPORTUNITIES: Opportunity[] = [
    {
        id: "o1",
        title: "Summit Real Estate - System Upgrade",
        contactId: "1", // James Wilson
        companyId: "c1",
        value: 125000,
        actualRevenue: 125000,
        pipeline: "completed",
        probability: 100,
        source: "referral",
        customerSatisfaction: "happy",
        completedDate: "2024-01-20",
        assignedTo: "u3", // Emily Rodriguez
        technicianId: "u6", // Carlos Martinez
        createdAt: "2024-01-01"
    },
    {
        id: "o2",
        title: "Wellness Pro Gym - New Install",
        contactId: "4",
        companyId: "c3",
        value: 89500,
        actualRevenue: 0,
        pipeline: "booked",
        probability: 90,
        source: "webform",
        scheduledDate: "2024-02-15",
        assignedTo: "u2", // Michael Chen
        technicianId: "u9", // Alex Rivera
        createdAt: "2024-01-10"
    },
    {
        id: "o3",
        title: "Local Dental Care - Maintenance",
        contactId: "2",
        value: 15600,
        actualRevenue: 0,
        pipeline: "quoting",
        probability: 60,
        source: "lead",
        assignedTo: "u3",
        createdAt: "2024-01-15"
    },
    {
        id: "o4",
        title: "AutoMax Dealership - Solar",
        contactId: "6",
        companyId: "c4",
        value: 215000,
        actualRevenue: 0,
        pipeline: "contacted",
        probability: 25,
        source: "webform",
        assignedTo: "u2",
        createdAt: "2024-01-18"
    },
    {
        id: "o5",
        title: "Home Services Plus - HVAC",
        contactId: "5",
        value: 78500,
        actualRevenue: 0,
        pipeline: "lost",
        probability: 0,
        lossReason: "Price too high",
        source: "lead",
        assignedTo: "u3",
        createdAt: "2024-01-05"
    },
    {
        id: "o6",
        title: "Sunset Apartments - HVAC Quote",
        contactId: "3", // Michael Chen
        value: 45000,
        actualRevenue: 0,
        pipeline: "leads",
        probability: 10,
        source: "webform",
        assignedTo: "u4", // David Park
        createdAt: "2024-01-25"
    }
];

// Exporting types for convenience
export type { ActivityLog } from "@/app/dashboard/users/activity/page";
