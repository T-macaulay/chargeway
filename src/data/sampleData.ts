export interface Vehicle {
  id: string;
  name: string;
  year: number;
  askingPrice: number;
  currentBid: number;
  bidCount: number;
  timerEnd: number; // timestamp
  image: string;
  specs: {
    range: string;
    chargeTime: string;
    seats: number;
    power: string;
    topSpeed: string;
  };
  hot?: boolean;
  featured?: boolean;
  active: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  verified: boolean;
  logo: string;
  location: string;
  rating: number;
  deliveries: number;
}

export interface VendorOffer {
  id: string;
  vendorId: string;
  vehicleName: string;
  price: number;
  deliveryDays: number;
  warranty: string;
  budgetMatch: string[];
  usageMatch: string[];
}

export interface ContentItem {
  id: string;
  title: string;
  type: "Review" | "Guide" | "Comparison" | "Vlog";
  views: string;
  duration: string;
  thumbnail: string;
  link: string;
}

export interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  email?: string;
  quizAnswers?: {
    usage: string;
    budget: string;
    distance: string;
    priority: string;
  };
  source: "quiz" | "bid" | "lead-form";
  status: "New" | "Contacted" | "Interested" | "Negotiating" | "Closed" | "Cold";
  notes: string;
  interactions: { type: string; detail: string; date: string }[];
  createdAt: string;
}

// --- Sample Vehicles ---
export const sampleVehicles: Vehicle[] = [
  {
    id: "v1",
    name: "BYD Dolphin",
    year: 2024,
    askingPrice: 12500000,
    currentBid: 11800000,
    bidCount: 14,
    timerEnd: Date.now() + 86400000 * 2,
    image: "",
    specs: { range: "420km", chargeTime: "45min (fast)", seats: 5, power: "95HP", topSpeed: "160km/h" },
    hot: true,
    featured: true,
    active: true,
  },
  {
    id: "v2",
    name: "BYD Seal",
    year: 2024,
    askingPrice: 22000000,
    currentBid: 20500000,
    bidCount: 8,
    timerEnd: Date.now() + 86400000 * 3,
    image: "",
    specs: { range: "570km", chargeTime: "30min (fast)", seats: 5, power: "313HP", topSpeed: "180km/h" },
    hot: false,
    featured: true,
    active: true,
  },
  {
    id: "v3",
    name: "JAC e-JS1",
    year: 2024,
    askingPrice: 4800000,
    currentBid: 4500000,
    bidCount: 22,
    timerEnd: Date.now() + 86400000 * 1,
    image: "",
    specs: { range: "210km", chargeTime: "60min (fast)", seats: 4, power: "61HP", topSpeed: "120km/h" },
    hot: true,
    featured: false,
    active: true,
  },
  {
    id: "v4",
    name: "Hyundai Kona Electric",
    year: 2025,
    askingPrice: 18500000,
    currentBid: 17200000,
    bidCount: 11,
    timerEnd: Date.now() + 86400000 * 4,
    image: "",
    specs: { range: "490km", chargeTime: "40min (fast)", seats: 5, power: "204HP", topSpeed: "167km/h" },
    hot: false,
    featured: true,
    active: true,
  },
  {
    id: "v5",
    name: "MG4 Electric",
    year: 2024,
    askingPrice: 14000000,
    currentBid: 13200000,
    bidCount: 6,
    timerEnd: Date.now() + 86400000 * 5,
    image: "",
    specs: { range: "450km", chargeTime: "35min (fast)", seats: 5, power: "203HP", topSpeed: "160km/h" },
    hot: false,
    featured: false,
    active: true,
  },
  {
    id: "v6",
    name: "BYD Atto 3",
    year: 2024,
    askingPrice: 16500000,
    currentBid: 15800000,
    bidCount: 18,
    timerEnd: Date.now() + 86400000 * 2.5,
    image: "",
    specs: { range: "420km", chargeTime: "45min (fast)", seats: 5, power: "204HP", topSpeed: "160km/h" },
    hot: true,
    featured: true,
    active: true,
  },
];

// --- Sample Vendors ---
export const sampleVendors: Vendor[] = [
  { id: "vd1", name: "AutoElectric Lagos", verified: true, logo: "", location: "Lagos", rating: 4.8, deliveries: 47 },
  { id: "vd2", name: "GreenDrive Nigeria", verified: true, logo: "", location: "Lagos", rating: 4.6, deliveries: 32 },
  { id: "vd3", name: "EV Hub Abuja", verified: true, logo: "", location: "Abuja", rating: 4.7, deliveries: 28 },
  { id: "vd4", name: "Zap Motors", verified: false, logo: "", location: "Port Harcourt", rating: 4.3, deliveries: 12 },
  { id: "vd5", name: "ChargeDrive NG", verified: true, logo: "", location: "Lagos", rating: 4.9, deliveries: 63 },
];

// --- Sample Vendor Offers ---
export const sampleOffers: VendorOffer[] = [
  {
    id: "o1", vendorId: "vd1", vehicleName: "BYD Dolphin",
    price: 12200000, deliveryDays: 14, warranty: "5 years / 100,000km",
    budgetMatch: ["₦5M - ₦15M"], usageMatch: ["Daily commute", "Business / Uber"],
  },
  {
    id: "o2", vendorId: "vd5", vehicleName: "BYD Dolphin",
    price: 11900000, deliveryDays: 7, warranty: "3 years / 80,000km",
    budgetMatch: ["₦5M - ₦15M"], usageMatch: ["Daily commute", "Business / Uber", "Weekend driving"],
  },
  {
    id: "o3", vendorId: "vd2", vehicleName: "JAC e-JS1",
    price: 4600000, deliveryDays: 10, warranty: "2 years / 50,000km",
    budgetMatch: ["Under ₦5M"], usageMatch: ["Daily commute", "Weekend driving"],
  },
  {
    id: "o4", vendorId: "vd3", vehicleName: "BYD Seal",
    price: 21500000, deliveryDays: 21, warranty: "5 years / 150,000km",
    budgetMatch: ["₦15M - ₦25M"], usageMatch: ["Family trips", "Weekend driving"],
  },
  {
    id: "o5", vendorId: "vd1", vehicleName: "Hyundai Kona Electric",
    price: 18000000, deliveryDays: 30, warranty: "5 years / unlimited",
    budgetMatch: ["₦15M - ₦25M"], usageMatch: ["Family trips", "Daily commute"],
  },
  {
    id: "o6", vendorId: "vd5", vehicleName: "MG4 Electric",
    price: 13800000, deliveryDays: 14, warranty: "4 years / 100,000km",
    budgetMatch: ["₦5M - ₦15M"], usageMatch: ["Daily commute", "Family trips"],
  },
  {
    id: "o7", vendorId: "vd4", vehicleName: "JAC e-JS1",
    price: 4400000, deliveryDays: 5, warranty: "2 years / 40,000km",
    budgetMatch: ["Under ₦5M"], usageMatch: ["Daily commute", "Business / Uber"],
  },
  {
    id: "o8", vendorId: "vd2", vehicleName: "BYD Atto 3",
    price: 16200000, deliveryDays: 18, warranty: "5 years / 120,000km",
    budgetMatch: ["₦15M - ₦25M", "₦5M - ₦15M"], usageMatch: ["Family trips", "Daily commute"],
  },
];

// --- Sample Content ---
export const sampleContent: ContentItem[] = [
  {
    id: "c1", title: "EV vs Petrol: Real Cost Breakdown in Naira",
    type: "Guide", views: "24K", duration: "12:34", thumbnail: "", link: "#",
  },
  {
    id: "c2", title: "I Drove a BYD Dolphin in Lagos for 30 Days",
    type: "Review", views: "89K", duration: "18:02", thumbnail: "", link: "#",
  },
  {
    id: "c3", title: "How to Charge an EV at Home in Nigeria",
    type: "Guide", views: "15K", duration: "8:45", thumbnail: "", link: "#",
  },
  {
    id: "c4", title: "Top 5 Budget EVs You Can Buy Right Now",
    type: "Comparison", views: "42K", duration: "14:20", thumbnail: "", link: "#",
  },
  {
    id: "c5", title: "Battery Health: What Every Buyer Should Check",
    type: "Guide", views: "18K", duration: "10:15", thumbnail: "", link: "#",
  },
  {
    id: "c6", title: "Used EV Buyer's Guide for Nigeria",
    type: "Guide", views: "31K", duration: "16:48", thumbnail: "", link: "#",
  },
];

// --- Sample Leads ---
export const sampleLeads: Lead[] = [
  {
    id: "l1", name: "Chinedu Okafor", whatsapp: "+2348012345678", email: "chinedu@email.com",
    quizAnswers: { usage: "Business / Uber", budget: "Under ₦5M", distance: "100 - 200km", priority: "Lowest price" },
    source: "quiz", status: "Interested", notes: "Uber driver, wants the JAC e-JS1. Asking about financing.",
    interactions: [
      { type: "quiz", detail: "Completed car customizer quiz", date: "2026-02-28T10:00:00Z" },
      { type: "whatsapp", detail: "Sent welcome message + matches", date: "2026-02-28T10:01:00Z" },
      { type: "call", detail: "Called back, interested in JAC", date: "2026-03-01T14:00:00Z" },
    ],
    createdAt: "2026-02-28T10:00:00Z",
  },
  {
    id: "l2", name: "Amina Bello", whatsapp: "+2349087654321",
    quizAnswers: { usage: "Family trips", budget: "₦15M - ₦25M", distance: "50 - 100km", priority: "Best features" },
    source: "quiz", status: "Negotiating", notes: "Wants the BYD Seal. Husband also interested.",
    interactions: [
      { type: "quiz", detail: "Completed quiz", date: "2026-02-27T16:00:00Z" },
      { type: "whatsapp", detail: "Sent comparison of Seal vs Kona", date: "2026-02-28T09:00:00Z" },
    ],
    createdAt: "2026-02-27T16:00:00Z",
  },
  {
    id: "l3", name: "Tunde Adeyemi", whatsapp: "+2348098765432",
    source: "bid", status: "New", notes: "",
    interactions: [
      { type: "bid", detail: "Bid ₦11,500,000 on BYD Dolphin", date: "2026-03-01T12:00:00Z" },
    ],
    createdAt: "2026-03-01T12:00:00Z",
  },
];

// Helpers
export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function formatNairaShort(amount: number): string {
  if (amount >= 1000000) {
    return "₦" + (amount / 1000000).toFixed(1) + "M";
  }
  if (amount >= 1000) {
    return "₦" + (amount / 1000).toFixed(0) + "K";
  }
  return "₦" + amount.toLocaleString("en-NG");
}
