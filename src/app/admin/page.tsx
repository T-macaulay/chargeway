"use client";
import { useState, useEffect } from "react";
import {
  sampleVehicles,
  sampleVendors,
  sampleOffers,
  sampleContent,
  sampleLeads,
  formatNaira,
  type Vehicle,
  type Vendor,
  type VendorOffer,
  type ContentItem,
  type Lead,
} from "@/data/sampleData";

type Tab = "listings" | "vendors" | "leads" | "content";

const statusColors: Record<string, string> = {
  New: "bg-sky/10 text-sky",
  Contacted: "bg-plum/10 text-plum",
  Interested: "bg-gold/10 text-gold",
  Negotiating: "bg-coral/10 text-coral",
  Closed: "bg-mint/10 text-mint",
  Cold: "bg-warm-gray/10 text-warm-gray",
};

function useLocalData<T>(key: string, fallback: T[]): [T[], (data: T[]) => void] {
  const [data, setDataState] = useState<T[]>(fallback);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try { setDataState(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, [key]);
  const setData = (newData: T[]) => {
    setDataState(newData);
    localStorage.setItem(key, JSON.stringify(newData));
  };
  return [data, setData];
}

// ---------- Listings Tab ----------
function ListingsTab() {
  const [vehicles, setVehicles] = useLocalData<Vehicle>("driveev_vehicles", sampleVehicles);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [showForm, setShowForm] = useState(false);

  const blankVehicle: Vehicle = {
    id: "", name: "", year: 2025, askingPrice: 0, currentBid: 0, bidCount: 0,
    timerEnd: Date.now() + 86400000 * 3, image: "",
    specs: { range: "", chargeTime: "", seats: 5, power: "", topSpeed: "" },
    hot: false, featured: false, active: true,
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const updated = editing.id
      ? vehicles.map((v) => (v.id === editing.id ? editing : v))
      : [...vehicles, { ...editing, id: "v" + Date.now() }];
    setVehicles(updated);
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-bark" >
          Vehicle Listings ({vehicles.length})
        </h2>
        <button
          onClick={() => { setEditing({ ...blankVehicle }); setShowForm(true); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-coral shadow-warm hover:shadow-warm-lg transition-all"
        >
          + Add Vehicle
        </button>
      </div>

      {showForm && editing && (
        <form onSubmit={handleSave} className="bg-cream rounded-2xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-warm-gray block mb-1">Vehicle Name</label>
            <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-coral" />
          </div>
          <div>
            <label className="text-xs font-medium text-warm-gray block mb-1">Year</label>
            <input type="number" value={editing.year} onChange={(e) => setEditing({ ...editing, year: parseInt(e.target.value) })} className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-coral" />
          </div>
          <div>
            <label className="text-xs font-medium text-warm-gray block mb-1">Asking Price (₦)</label>
            <input type="number" value={editing.askingPrice || ""} onChange={(e) => setEditing({ ...editing, askingPrice: parseInt(e.target.value) || 0 })} required className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-coral" />
          </div>
          <div>
            <label className="text-xs font-medium text-warm-gray block mb-1">Initial Bid Count</label>
            <input type="number" value={editing.bidCount} onChange={(e) => setEditing({ ...editing, bidCount: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-coral" />
          </div>
          <div>
            <label className="text-xs font-medium text-warm-gray block mb-1">Range</label>
            <input value={editing.specs.range} onChange={(e) => setEditing({ ...editing, specs: { ...editing.specs, range: e.target.value } })} placeholder="420km" className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-coral" />
          </div>
          <div>
            <label className="text-xs font-medium text-warm-gray block mb-1">Charge Time</label>
            <input value={editing.specs.chargeTime} onChange={(e) => setEditing({ ...editing, specs: { ...editing.specs, chargeTime: e.target.value } })} placeholder="45min (fast)" className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-coral" />
          </div>
          <div className="flex items-center gap-4 col-span-full">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.hot} onChange={(e) => setEditing({ ...editing, hot: e.target.checked })} className="w-4 h-4 rounded accent-coral" />
              <span className="text-sm text-bark">Hot</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="w-4 h-4 rounded accent-plum" />
              <span className="text-sm text-bark">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} className="w-4 h-4 rounded accent-mint" />
              <span className="text-sm text-bark">Active</span>
            </label>
          </div>
          <div className="col-span-full flex gap-2">
            <button type="submit" className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-coral">Save</button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-5 py-2 rounded-xl text-sm font-medium text-warm-gray border border-bark/10">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-warm hover:shadow-warm-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold ${v.active ? "bg-mint" : "bg-warm-gray"}`}>
                {v.active ? "ON" : "OFF"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-bark" >{v.name}</span>
                  {v.hot && <span className="px-1.5 py-0.5 text-[10px] font-bold bg-coral/10 text-coral rounded">HOT</span>}
                  {v.featured && <span className="px-1.5 py-0.5 text-[10px] font-bold bg-plum/10 text-plum rounded">FEATURED</span>}
                </div>
                <div className="text-xs text-warm-gray">{v.year} &middot; {formatNaira(v.askingPrice)} &middot; {v.bidCount} bids</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing({ ...v }); setShowForm(true); }} className="px-3 py-1.5 rounded-lg text-xs font-medium text-bark border border-bark/10 hover:bg-cream transition-colors">Edit</button>
              <button onClick={() => setVehicles(vehicles.filter((x) => x.id !== v.id))} className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 border border-red-200 hover:bg-red-50 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Vendors Tab ----------
function VendorsTab() {
  const [vendors, setVendors] = useLocalData<Vendor>("driveev_vendors", sampleVendors);
  const [offers, setOffers] = useLocalData<VendorOffer>("driveev_offers", sampleOffers);
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [editVendor, setEditVendor] = useState<Vendor | null>(null);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [editOffer, setEditOffer] = useState<VendorOffer | null>(null);

  const blankVendor: Vendor = { id: "", name: "", verified: false, logo: "", location: "", rating: 4.5, deliveries: 0 };
  const blankOffer: VendorOffer = { id: "", vendorId: "", vehicleName: "", price: 0, deliveryDays: 14, warranty: "", budgetMatch: [], usageMatch: [] };

  const handleSaveVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editVendor) return;
    const updated = editVendor.id
      ? vendors.map((v) => (v.id === editVendor.id ? editVendor : v))
      : [...vendors, { ...editVendor, id: "vd" + Date.now() }];
    setVendors(updated);
    setEditVendor(null);
    setShowVendorForm(false);
  };

  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editOffer) return;
    const updated = editOffer.id
      ? offers.map((o) => (o.id === editOffer.id ? editOffer : o))
      : [...offers, { ...editOffer, id: "o" + Date.now() }];
    setOffers(updated);
    setEditOffer(null);
    setShowOfferForm(false);
  };

  return (
    <div>
      {/* Vendor Profiles */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-bark" >
            Vendor Profiles ({vendors.length})
          </h2>
          <button onClick={() => { setEditVendor({ ...blankVendor }); setShowVendorForm(true); }} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-plum shadow-warm">
            + Add Vendor
          </button>
        </div>

        {showVendorForm && editVendor && (
          <form onSubmit={handleSaveVendor} className="bg-cream rounded-2xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-warm-gray block mb-1">Vendor Name</label>
              <input value={editVendor.name} onChange={(e) => setEditVendor({ ...editVendor, name: e.target.value })} required className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-plum" />
            </div>
            <div>
              <label className="text-xs font-medium text-warm-gray block mb-1">Location</label>
              <input value={editVendor.location} onChange={(e) => setEditVendor({ ...editVendor, location: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-plum" />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editVendor.verified} onChange={(e) => setEditVendor({ ...editVendor, verified: e.target.checked })} className="w-4 h-4 rounded accent-sky" />
                <span className="text-sm text-bark">Verified</span>
              </label>
            </div>
            <div className="col-span-full flex gap-2">
              <button type="submit" className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-plum">Save</button>
              <button type="button" onClick={() => { setShowVendorForm(false); setEditVendor(null); }} className="px-5 py-2 rounded-xl text-sm font-medium text-warm-gray border border-bark/10">Cancel</button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {vendors.map((v) => (
            <div key={v.id} className="bg-white rounded-xl p-4 shadow-warm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-plum text-white flex items-center justify-center font-bold text-sm">{v.name.charAt(0)}</div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-bark">{v.name}</span>
                    {v.verified && <span className="text-sky text-xs">&#x2713;</span>}
                  </div>
                  <span className="text-xs text-warm-gray">{v.location} &middot; {v.deliveries} deliveries</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { setEditVendor({ ...v }); setShowVendorForm(true); }} className="px-3 py-1 rounded-lg text-xs font-medium text-bark border border-bark/10 hover:bg-cream">Edit</button>
                <button onClick={() => setVendors(vendors.filter((x) => x.id !== v.id))} className="px-3 py-1 rounded-lg text-xs font-medium text-red-500 border border-red-200 hover:bg-red-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vendor Offers */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-bark" >
            Vendor Offers ({offers.length})
          </h2>
          <button onClick={() => { setEditOffer({ ...blankOffer }); setShowOfferForm(true); }} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-coral shadow-warm">
            + Add Offer
          </button>
        </div>

        {showOfferForm && editOffer && (
          <form onSubmit={handleSaveOffer} className="bg-cream rounded-2xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-warm-gray block mb-1">Vendor</label>
              <select value={editOffer.vendorId} onChange={(e) => setEditOffer({ ...editOffer, vendorId: e.target.value })} required className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-coral">
                <option value="">Select vendor...</option>
                {vendors.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-warm-gray block mb-1">Vehicle Name</label>
              <input value={editOffer.vehicleName} onChange={(e) => setEditOffer({ ...editOffer, vehicleName: e.target.value })} required className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-coral" />
            </div>
            <div>
              <label className="text-xs font-medium text-warm-gray block mb-1">Price (₦)</label>
              <input type="number" value={editOffer.price || ""} onChange={(e) => setEditOffer({ ...editOffer, price: parseInt(e.target.value) || 0 })} required className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-coral" />
            </div>
            <div>
              <label className="text-xs font-medium text-warm-gray block mb-1">Delivery (days)</label>
              <input type="number" value={editOffer.deliveryDays} onChange={(e) => setEditOffer({ ...editOffer, deliveryDays: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-coral" />
            </div>
            <div>
              <label className="text-xs font-medium text-warm-gray block mb-1">Warranty</label>
              <input value={editOffer.warranty} onChange={(e) => setEditOffer({ ...editOffer, warranty: e.target.value })} placeholder="5 years / 100,000km" className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-coral" />
            </div>
            <div>
              <label className="text-xs font-medium text-warm-gray block mb-1">Budget Match</label>
              <div className="flex flex-wrap gap-1.5">
                {["Under ₦5M", "₦5M - ₦15M", "₦15M - ₦25M", "Above ₦25M"].map((b) => (
                  <label key={b} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editOffer.budgetMatch.includes(b)}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...editOffer.budgetMatch, b]
                          : editOffer.budgetMatch.filter((x) => x !== b);
                        setEditOffer({ ...editOffer, budgetMatch: next });
                      }}
                      className="w-3 h-3 rounded accent-coral"
                    />
                    <span className="text-xs text-bark">{b}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="col-span-full flex gap-2">
              <button type="submit" className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-coral">Save</button>
              <button type="button" onClick={() => { setShowOfferForm(false); setEditOffer(null); }} className="px-5 py-2 rounded-xl text-sm font-medium text-warm-gray border border-bark/10">Cancel</button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {offers.map((o) => {
            const vendor = vendors.find((v) => v.id === o.vendorId);
            return (
              <div key={o.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-warm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-bark">{o.vehicleName}</span>
                    <span className="text-xs text-warm-gray">by {vendor?.name || "Unknown"}</span>
                  </div>
                  <div className="text-xs text-warm-gray mt-0.5">
                    {formatNaira(o.price)} &middot; {o.deliveryDays}d delivery &middot; {o.warranty}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {o.budgetMatch.map((b) => (
                      <span key={b} className="px-1.5 py-0.5 text-[10px] bg-coral/10 text-coral rounded">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditOffer({ ...o }); setShowOfferForm(true); }} className="px-3 py-1.5 rounded-lg text-xs font-medium text-bark border border-bark/10 hover:bg-cream">Edit</button>
                  <button onClick={() => setOffers(offers.filter((x) => x.id !== o.id))} className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 border border-red-200 hover:bg-red-50">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- Leads Tab ----------
function LeadsTab() {
  const [leads, setLeads] = useLocalData<Lead>("driveev_leads", sampleLeads);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState("");

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const statuses: Lead["status"][] = ["New", "Contacted", "Interested", "Negotiating", "Closed", "Cold"];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-bark" >
          Leads ({leads.length})
        </h2>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => {
            const count = leads.filter((l) => l.status === s).length;
            return (
              <span key={s} className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[s]}`}>
                {s} ({count})
              </span>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-xl shadow-warm overflow-hidden">
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-cream/50 transition-colors"
              onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral/20 to-plum/20 flex items-center justify-center text-sm font-bold text-bark">
                  {lead.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-sm text-bark">{lead.name}</div>
                  <div className="text-xs text-warm-gray">{lead.whatsapp} &middot; {lead.source} &middot; {new Date(lead.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={lead.status}
                  onChange={(e) => { e.stopPropagation(); updateLead(lead.id, { status: e.target.value as Lead["status"] }); }}
                  onClick={(e) => e.stopPropagation()}
                  className={`px-2 py-1 rounded-lg text-xs font-medium border-0 outline-none cursor-pointer ${statusColors[lead.status]}`}
                >
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-warm-gray transition-transform ${expandedLead === lead.id ? "rotate-180" : ""}`}>
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {expandedLead === lead.id && (
              <div className="px-4 pb-4 border-t border-bark/5">
                {lead.quizAnswers && (
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="bg-cream rounded-lg p-2">
                      <div className="text-[10px] text-warm-gray uppercase">Usage</div>
                      <div className="text-xs font-medium text-bark">{lead.quizAnswers.usage}</div>
                    </div>
                    <div className="bg-cream rounded-lg p-2">
                      <div className="text-[10px] text-warm-gray uppercase">Budget</div>
                      <div className="text-xs font-medium text-bark">{lead.quizAnswers.budget}</div>
                    </div>
                    <div className="bg-cream rounded-lg p-2">
                      <div className="text-[10px] text-warm-gray uppercase">Distance</div>
                      <div className="text-xs font-medium text-bark">{lead.quizAnswers.distance}</div>
                    </div>
                    <div className="bg-cream rounded-lg p-2">
                      <div className="text-[10px] text-warm-gray uppercase">Priority</div>
                      <div className="text-xs font-medium text-bark">{lead.quizAnswers.priority}</div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className="mt-3">
                  <div className="text-xs font-medium text-warm-gray mb-1">Notes</div>
                  <div className="text-sm text-bark mb-2">{lead.notes || "No notes yet."}</div>
                  <div className="flex gap-2">
                    <input
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      placeholder="Add a note..."
                      className="flex-1 px-3 py-2 rounded-lg bg-cream border border-bark/10 text-xs outline-none focus:border-coral"
                    />
                    <button
                      onClick={() => {
                        if (noteInput.trim()) {
                          updateLead(lead.id, { notes: (lead.notes ? lead.notes + "\n" : "") + noteInput });
                          setNoteInput("");
                        }
                      }}
                      className="px-3 py-2 rounded-lg text-xs font-medium text-white bg-coral"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Timeline */}
                {lead.interactions.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs font-medium text-warm-gray mb-2">Activity</div>
                    <div className="space-y-2">
                      {lead.interactions.map((interaction, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-coral mt-1.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs text-bark">{interaction.detail}</div>
                            <div className="text-[10px] text-warm-gray">{new Date(interaction.date).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* WhatsApp link */}
                <a
                  href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#25D366]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Message on WhatsApp
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Content Tab ----------
function ContentTab() {
  const [content, setContent] = useLocalData<ContentItem>("driveev_content", sampleContent);
  const [editing, setEditing] = useState<ContentItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  const blankContent: ContentItem = { id: "", title: "", type: "Guide", views: "0", duration: "0:00", thumbnail: "", link: "" };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const updated = editing.id
      ? content.map((c) => (c.id === editing.id ? editing : c))
      : [...content, { ...editing, id: "c" + Date.now() }];
    setContent(updated);
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-bark" >
          Content ({content.length})
        </h2>
        <button onClick={() => { setEditing({ ...blankContent }); setShowForm(true); }} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-plum shadow-warm">
          + Add Content
        </button>
      </div>

      {showForm && editing && (
        <form onSubmit={handleSave} className="bg-cream rounded-2xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-warm-gray block mb-1">Title</label>
            <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-plum" />
          </div>
          <div>
            <label className="text-xs font-medium text-warm-gray block mb-1">Type</label>
            <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value as ContentItem["type"] })} className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-plum">
              {["Review", "Guide", "Comparison", "Vlog"].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-warm-gray block mb-1">Duration</label>
            <input value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} placeholder="12:34" className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-plum" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-warm-gray block mb-1">Video URL</label>
            <input value={editing.link} onChange={(e) => setEditing({ ...editing, link: e.target.value })} placeholder="https://youtube.com/..." className="w-full px-3 py-2 rounded-lg bg-white border border-bark/10 text-sm outline-none focus:border-plum" />
          </div>
          <div className="col-span-full flex gap-2">
            <button type="submit" className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-plum">Save</button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-5 py-2 rounded-xl text-sm font-medium text-warm-gray border border-bark/10">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {content.map((c) => (
          <div key={c.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-warm">
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                  c.type === "Review" ? "bg-coral/10 text-coral" : c.type === "Guide" ? "bg-plum/10 text-plum" : c.type === "Comparison" ? "bg-gold/10 text-gold" : "bg-mint/10 text-mint"
                }`}>{c.type}</span>
                <span className="font-semibold text-sm text-bark">{c.title}</span>
              </div>
              <div className="text-xs text-warm-gray mt-0.5">{c.views} views &middot; {c.duration}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing({ ...c }); setShowForm(true); }} className="px-3 py-1.5 rounded-lg text-xs font-medium text-bark border border-bark/10 hover:bg-cream">Edit</button>
              <button onClick={() => setContent(content.filter((x) => x.id !== c.id))} className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 border border-red-200 hover:bg-red-50">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Main Admin Page ----------
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("listings");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check — in production this would be proper auth
    if (password === "driveev2026") {
      setAuthed(true);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-[100dvh] bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-2xl font-bold" >
                Drive<span className="text-coral">EV</span>
              </span>
            </div>
            <h1 className="text-xl font-bold text-bark" >Admin Panel</h1>
            <p className="text-sm text-warm-gray mt-1">Enter your password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-warm p-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-cream border border-bark/10 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all mb-4"
            />
            <button type="submit" className="w-full px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-coral to-coral-dark shadow-warm">
              Log In
            </button>
            <p className="text-xs text-warm-gray text-center mt-3">Hint: driveev2026</p>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "listings", label: "Listings", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { key: "vendors", label: "Vendors", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { key: "leads", label: "Leads", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { key: "content", label: "Content", icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  return (
    <div className="min-h-[100dvh] bg-cream">
      {/* Top bar */}
      <div className="bg-white shadow-warm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-lg font-bold" >
              Drive<span className="text-coral">EV</span>
              <span className="text-warm-gray text-sm font-normal ml-2">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-xs text-warm-gray hover:text-coral transition-colors">View Site</a>
            <button onClick={() => setAuthed(false)} className="text-xs text-warm-gray hover:text-red-500 transition-colors">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab nav */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-warm overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                tab === t.key
                  ? "bg-coral text-white shadow-warm"
                  : "text-warm-gray hover:text-bark hover:bg-cream"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={t.icon} />
              </svg>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "listings" && <ListingsTab />}
        {tab === "vendors" && <VendorsTab />}
        {tab === "leads" && <LeadsTab />}
        {tab === "content" && <ContentTab />}
      </div>
    </div>
  );
}
