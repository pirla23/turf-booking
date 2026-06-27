import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Check, X, Trash2, Search } from "lucide-react";

export default function Admin() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (e) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      toast.success("Status updated");
      fetchBookings();
    } catch (e) {
      toast.error("Update failed");
    }
  };

  const deleteBooking = async (id: number) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      toast.success("Booking deleted");
      fetchBookings();
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const filtered = bookings.filter(b => 
    b.playerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.mobile?.includes(searchTerm)
  );

  return (
    <div className="pt-24 pb-10 min-h-screen px-4 container">
      <h1 className="text-3xl font-bold font-[Outfit] text-white mb-6">Admin Panel</h1>
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Name, Email or Mobile" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass rounded-lg pl-10 pr-4 py-2 text-sm text-white" 
          />
        </div>
      </div>

      <div className="overflow-x-auto glass rounded-xl">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="text-xs uppercase bg-white/5 text-gray-400 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name / Contact</th>
              <th className="px-6 py-4">Sport</th>
              <th className="px-6 py-4">Timing</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8">No bookings found</td></tr>
            ) : (
              filtered.map(b => (
                <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-6 py-4">#{b.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{b.playerName}</div>
                    <div className="text-xs text-gray-400">{b.mobile}</div>
                    {b.email && <div className="text-xs text-gray-400">{b.email}</div>}
                  </td>
                  <td className="px-6 py-4 capitalize">{b.sport}</td>
                  <td className="px-6 py-4">
                    <div className="text-white">{b.date}</div>
                    <div className="text-xs text-gray-400">
                      {b.session === "Custom" ? `${b.startTime} - ${b.endTime}` : b.startTime}
                      {b.session !== "Custom" && ` (${b.duration}h)`}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      b.status === "confirmed" ? "bg-green-500/20 text-green-400" :
                      b.status === "completed" ? "bg-blue-500/20 text-blue-400" :
                      b.status === "cancelled" ? "bg-red-500/20 text-red-400" :
                      "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => updateStatus(b.id, "confirmed")} title="Confirm" className="p-1.5 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => updateStatus(b.id, "completed")} title="Mark Completed" className="p-1.5 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => updateStatus(b.id, "cancelled")} title="Cancel" className="p-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30">
                        <X className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteBooking(b.id)} title="Delete" className="p-1.5 rounded bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 ml-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
