import React, { useEffect, useState } from "react";
import { authService } from "../services/apiService";
import newLogo from "../assets/new.svg";

function Members() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [previewSrc, setPreviewSrc] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");
        // Fetch the requested page, then top-up from subsequent pages if
        // duplicates reduce the count below the limit.
        let currentPage = page;
        let firstResponse = null;
        const uniqueById = new Map();
        let safety = 0; // prevent infinite loops
        while (uniqueById.size < limit && safety < 5) {
          const resp = await authService.getUsers(currentPage, limit);
          if (!firstResponse) firstResponse = resp;
          const batch = Array.isArray(resp?.users) ? resp.users : [];
          for (const u of batch) {
            const id = u?._id || u?.id || `${u?.email || Math.random()}`;
            if (!uniqueById.has(id) && uniqueById.size < limit) {
              uniqueById.set(id, u);
            }
          }
          const hasNext = resp?.pagination?.hasNextPage;
          if (!hasNext) break;
          if (uniqueById.size < limit) {
            currentPage += 1;
            safety += 1;
          } else {
            break;
          }
        }

        setUsers(Array.from(uniqueById.values()));
        setTotalPages(firstResponse?.pagination?.totalPages || 1);
        setTotalUsers(firstResponse?.pagination?.totalUsers || firstResponse?.totalUsers || 0);
        setLoading(false);
      } catch (e) {
        setError(e?.message || "Failed to load members");
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page, limit]);

  const MemberCard = ({ user }) => {
    const img = user?.profilePicUrl || user?.profilePic || "";
    const name = user?.name || "Unnamed";
    const familyName = user?.familyName || "";
    const subFam = user?.subFam || "";
    const email = user?.email || "";
    const birthday = user?.birthday ? new Date(user.birthday) : null;
    const birthdayText = birthday ? birthday.toLocaleDateString() : "N/A";
    return (
      <div className="w-full">
        <div className="rounded-xl border border-blue-200 bg-white hover:shadow-md transition-shadow overflow-hidden">
          <div className="w-full aspect-[4/3] bg-blue-50">
            {img ? (
              <img
                src={img}
                alt={name}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setPreviewSrc(img)}
              />
            ) : (
              <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl">
                {name?.charAt(0)?.toUpperCase() || "M"}
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 break-words">
              {name}
            </h3>
            <div className="mt-1 flex items-center flex-wrap gap-2">
              {!!subFam && (
                <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 text-[11px] font-semibold">
                  {subFam}
                </span>
              )}
              {!!familyName && (
                <span className="inline-flex items-center rounded-md bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 text-[11px] font-semibold break-words">
                  {familyName}
                </span>
              )}
            </div>
            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <p className="truncate"><span className="font-semibold">Email:</span> {email}</p>
              <p><span className="font-semibold">Birthday:</span> {birthdayText}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Pagination = () => {
    const disablePrev = page <= 1;
    const disableNext = page >= totalPages;
    return (
      <div className="flex items-center justify-between mt-8">
        <div className="text-sm text-gray-600">
          Showing page {page} of {totalPages} • Total {totalUsers} members
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={disablePrev}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`px-3 py-2 rounded-md border text-sm ${
              disablePrev ? "text-gray-400 border-gray-200" : "text-blue-700 border-blue-200 hover:bg-blue-50"
            }`}
          >
            Prev
          </button>
          <button
            disabled={disableNext}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={`px-3 py-2 rounded-md border text-sm ${
              disableNext ? "text-gray-400 border-gray-200" : "text-blue-700 border-blue-200 hover:bg-blue-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-10 max-w-6xl">
          <div className="flex flex-col items-center justify-center py-16">
            <img src={newLogo} alt="Loading" className="w-20 h-20 animate-spin" />
            <p className="mt-4 text-gray-600">Loading members…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-2xl mx-auto mb-4">!</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Members</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-blue-700">Members of AERG IMENA ({totalUsers})</h1>
          <p className="text-gray-600 mt-2">Beloved brothers and sisters of our IMENA family. </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {users.map((u) => (
            <MemberCard key={u._id} user={u} />
          ))}
        </div>

        <Pagination />
      </div>

      {previewSrc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70"
          onClick={() => setPreviewSrc(null)}
        >
          <div className="relative max-w-4xl w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-10 right-0 text-white bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 text-sm"
              onClick={() => setPreviewSrc(null)}
            >
              Close
            </button>
            <img src={previewSrc} alt="Profile Preview" className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Members;


