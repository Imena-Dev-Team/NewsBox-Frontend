import React, { useState, useEffect } from "react";
// Removed unused auth context and api service imports
import { client } from "../sanityClient";
import img1 from "../assets/aboutPhotos/image1.jpg";
import img2 from "../assets/aboutPhotos/image2.jpg";
import img3 from "../assets/aboutPhotos/image3.jpg";
import img4 from "../assets/aboutPhotos/image4.jpg";
import img5 from "../assets/aboutPhotos/image5.jpg";
import img6 from "../assets/aboutPhotos/image6.jpg";
import img7 from "../assets/aboutPhotos/image7.jpg";

const About = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Removed old mock tree and layout helpers

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "about"]|order(_createdAt asc){
          _id,
          name,
          familyName,
          role,
          image{asset->{url}}
        }`;
        const data = await client.fetch(query);
        const photoPool = [img1, img2, img3, img4, img5, img6, img7];
        let photoIndex = 0;
        const pickPhoto = () => {
          const p = photoPool[photoIndex % photoPool.length];
          photoIndex += 1;
          return p;
        };
        const mapped = (data || []).map((m) => ({
          id: m._id,
          name: m.name || "Unnamed",
          role: m.role || "",
          familyName: m.familyName || "",
          profilePic: m?.image?.asset?.url || pickPhoto(),
        }));
        setMembers(mapped);
        setLoading(false);
      } catch (err) {
        setError("Failed to load members");
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // Create a simple card component for members
  const MemberCard = ({ member }) => {
    return (
      <div className="rounded-xl border border-gray-200 shadow-sm p-5 transition-transform duration-200 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex items-start gap-4">
          {member.profilePic ? (
            <img
              src={member.profilePic}
              alt={member.name}
              className="h-20 w-20 rounded-full object-cover ring-2 ring-blue-100"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
              {member.name?.charAt(0)?.toUpperCase() || "M"}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {member.name}
            </p>
            {member.familyName && (
              <p className="text-sm text-gray-700 truncate">
                {member.familyName}
              </p>
            )}
            {member.role && (
              <p className="text-sm text-gray-600 truncate">{member.role}</p>
            )}
            {member.email && (
              <p className="text-xs text-gray-500 truncate mt-1">
                {member.email}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 animate-pulse">
              I
            </div>
            <div className="space-y-4">
              <div className="w-64 h-8 bg-gray-200 animate-pulse rounded-lg mx-auto"></div>
              <div className="w-96 h-4 bg-gray-200 animate-pulse rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-2xl mx-auto mb-4">
            !
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Family Tree
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-lg">
            I
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-blue-600 mb-4">
            IMENA Family Tree
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover the connections and relationships within our extended
            family. Each level represents a generation, and each circle
            represents a family member.
          </p>
        </div>
        {/* Members from Sanity in 2-1-2-2-2 layout */}
        <div className="rounded-lg p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Our Core Members
          </h2>
          {(() => {
            const list = members;
            // Ensure we have deterministic groups; pad with empty if needed
            const safe = (i) => list[i] || null;
            const firstRow = [safe(0), safe(1)].filter(Boolean);
            const middle = [safe(2)].filter(Boolean);
            const secondRow = [safe(3), safe(4)].filter(Boolean);
            const thirdRow = [safe(5), safe(6)].filter(Boolean);
            const fourthRow = [safe(7), safe(8)].filter(Boolean);
            return (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {firstRow.map((m) => (
                    <MemberCard key={m.id} member={m} />
                  ))}
                </div>
                {middle.length > 0 && (
                  <div className="max-w-md mx-auto">
                    <MemberCard key={middle[0].id} member={middle[0]} />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {secondRow.map((m) => (
                    <MemberCard key={m.id} member={m} />
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {thirdRow.map((m) => (
                    <MemberCard key={m.id} member={m} />
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {fourthRow.map((m) => (
                    <MemberCard key={m.id} member={m} />
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default About;
