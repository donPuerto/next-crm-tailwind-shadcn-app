/**
 * Lead data generation for dashboard
 * 
 * This file generates dummy lead data for 1 year (Jan 2025 - Jan 2026)
 * Designed to be easily migrated to Supabase with the following table schema:
 * 
 * CREATE TABLE leads (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   name TEXT NOT NULL,
 *   email TEXT NOT NULL,
 *   phone TEXT NOT NULL,
 *   source TEXT NOT NULL,
 *   source_detail TEXT,
 *   status TEXT NOT NULL,
 *   priority TEXT NOT NULL,
 *   assigned_to TEXT NOT NULL,
 *   created_at TIMESTAMP WITH TIME ZONE NOT NULL,
 *   last_contacted TIMESTAMP WITH TIME ZONE,
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 */

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
  created_at: string; // ISO 8601 format (Supabase compatible)
  last_contacted: string; // ISO 8601 format or "Not contacted"
}

// Helper function to generate random date within a range
function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Helper function to add hours to a date
function addHours(date: Date, hours: number): Date {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}

// Generate leads for the past year (Jan 2025 - Jan 2026)
function generateLeads(): Lead[] {
  const leads: Lead[] = [];
  const startDate = new Date('2025-01-27T00:00:00Z');
  const endDate = new Date('2026-01-27T23:59:59Z');

  const sources: LeadSource[] = [
    "website1", "website2", "trade_site", "inbound_call",
    "voicemail", "email", "facebook_campaign", "facebook_messenger",
    "instagram", "whatsapp"
  ];

  const statuses: LeadStatus[] = ["new", "contacted", "qualified", "converted", "lost"];
  const priorities: ("hot" | "warm" | "cold")[] = ["hot", "warm", "cold"];
  const salesReps = ["Emily Rodriguez", "Michael Chen", "James Wilson", "Sarah Thompson"];

  const firstNames = [
    "John", "Jane", "Michael", "Sarah", "David", "Emily", "Robert", "Jennifer",
    "William", "Linda", "Richard", "Patricia", "Joseph", "Elizabeth", "Thomas", "Barbara",
    "Christopher", "Susan", "Daniel", "Jessica", "Matthew", "Karen", "Anthony", "Nancy",
    "Mark", "Lisa", "Donald", "Betty", "Steven", "Margaret", "Paul", "Sandra",
    "Andrew", "Ashley", "Joshua", "Kimberly", "Kenneth", "Donna", "Kevin", "Carol"
  ];

  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
    "Taylor", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris",
    "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen"
  ];

  const sourceDetails: Record<LeadSource, string[]> = {
    website1: ["DoorWindowPro.com - Contact Form", "DoorWindowPro.com - Quote Request", "DoorWindowPro.com - Live Chat"],
    website2: ["HomeFix24.com - Contact Form", "HomeFix24.com - Quote Request", "HomeFix24.com - Newsletter"],
    trade_site: ["Checkatrade", "MyBuilder", "Rated People", "TrustATrader"],
    inbound_call: ["Direct Phone Call", "Callback Request", "Phone Inquiry"],
    voicemail: ["After Hours Voicemail", "Missed Call Voicemail"],
    email: ["Direct Email Inquiry", "Info Request", "Quote Request Email"],
    facebook_campaign: ["Summer Sale 2025", "Winter Promotion 2025", "Spring Campaign 2026", "General FB Ads"],
    facebook_messenger: ["Facebook Page Message", "Messenger Inquiry"],
    instagram: ["Instagram DM", "Instagram Story Reply", "Instagram Ad Response"],
    whatsapp: ["WhatsApp Business", "WhatsApp Inquiry"]
  };

  // Generate approximately 3-5 leads per day over the year (1095-1825 leads total)
  const totalLeads = 1500;

  for (let i = 0; i < totalLeads; i++) {
    const createdAt = randomDate(startDate, endDate);
    const source = sources[Math.floor(Math.random() * sources.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const assignedTo = salesReps[Math.floor(Math.random() * salesReps.length)];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;

    const emailDomain = Math.random() > 0.5 ? "email.com" : "example.com";
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomain}`;

    const areaCode = 200 + Math.floor(Math.random() * 800);
    const prefix = 200 + Math.floor(Math.random() * 800);
    const line = 1000 + Math.floor(Math.random() * 9000);
    const phone = `+1 (${areaCode}) ${prefix}-${line}`;

    const sourceDetailOptions = sourceDetails[source];
    const sourceDetail = sourceDetailOptions[Math.floor(Math.random() * sourceDetailOptions.length)];

    // Determine last_contacted based on status
    let lastContacted = "Not contacted";
    if (status !== "new") {

      const contactDate = addHours(createdAt, Math.random() * 24);
      lastContacted = contactDate.toISOString();
    }

    leads.push({
      id: `lead-${i + 1}`,
      name,
      email,
      phone,
      source,
      source_detail: sourceDetail,
      status,
      priority,
      assigned_to: assignedTo,
      created_at: createdAt.toISOString(),
      last_contacted: lastContacted
    });
  }

  // Sort by created_at (newest first)
  return leads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// Export the generated leads
export const generatedLeads: Lead[] = generateLeads();

// Export count by status for quick reference
export const leadStats = {
  total: generatedLeads.length,
  new: generatedLeads.filter(l => l.status === "new").length,
  contacted: generatedLeads.filter(l => l.status === "contacted").length,
  qualified: generatedLeads.filter(l => l.status === "qualified").length,
  converted: generatedLeads.filter(l => l.status === "converted").length,
  lost: generatedLeads.filter(l => l.status === "lost").length,
};

