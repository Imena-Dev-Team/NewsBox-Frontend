import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/apiService";
import { client } from "../sanityClient";
import img1 from "../assets/aboutPhotos/image1.jpg";
import img2 from "../assets/aboutPhotos/image2.jpg";
import img3 from "../assets/aboutPhotos/image3.jpg";
import img4 from "../assets/aboutPhotos/image4.jpg";
import img5 from "../assets/aboutPhotos/image5.jpg";
import img6 from "../assets/aboutPhotos/image6.jpg";
import img7 from "../assets/aboutPhotos/image7.jpg";

const About = () => {
  const { user, isAuthenticated } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedYearRange, setSelectedYearRange] = useState("");
  const [years, setYears] = useState([]); // start years as numbers

  // Mock data removed; content now comes from Sanity
  const mockFamilyTreeByYear = {
    2020: {
      id: "root",
      name: "IMENA Family 2020",
      type: "family",
      // Level 1: 2 circles at top
      children: [
        {
          id: "member1",
          name: "Jean Mukamana",
          role: "Elder",
          email: "jean.mukamana@email.com",
          birthday: "1970-05-15",
          profilePic: "/assets/aboutPhotos/image1.jpg",
          type: "member",
          year: 2020,
        },
        {
          id: "member2",
          name: "Marie Mukamana",
          role: "Elder",
          email: "marie.mukamana@email.com",
          birthday: "1975-08-22",
          profilePic: null,
          type: "member",
          year: 2020,
        },
      ],
    },
    2021: {
      id: "root",
      name: "IMENA Family 2021",
      type: "family",
      // Level 1: 2 circles at top
      children: [
        {
          id: "member3",
          name: "Pierre Nkurunziza",
          role: "Elder",
          email: "pierre.nkurunziza@email.com",
          birthday: "1968-03-18",
          profilePic: null,
          type: "member",
          year: 2021,
        },
        {
          id: "member4",
          name: "Grace Nkurunziza",
          role: "Elder",
          email: "grace.nkurunziza@email.com",
          birthday: "1972-11-05",
          profilePic: null,
          type: "member",
          year: 2021,
        },
      ],
    },
    2022: {
      id: "root",
      name: "IMENA Family 2022",
      type: "family",
      // Level 1: 2 circles at top
      children: [
        {
          id: "member5",
          name: "Joseph Uwimana",
          role: "Elder",
          email: "joseph.uwimana@email.com",
          birthday: "1975-01-25",
          profilePic: null,
          type: "member",
          year: 2022,
        },
        {
          id: "member6",
          name: "Claire Uwimana",
          role: "Elder",
          email: "claire.uwimana@email.com",
          birthday: "1980-04-12",
          profilePic: null,
          type: "member",
          year: 2022,
        },
      ],
    },
    2023: {
      id: "root",
      name: "IMENA Family 2023",
      type: "family",
      // Level 1: 2 circles at top
      children: [
        {
          id: "member7",
          name: "David Mukamana",
          role: "Adult",
          email: "david.mukamana@email.com",
          birthday: "1995-12-10",
          profilePic: null,
          type: "member",
          year: 2023,
        },
        {
          id: "member8",
          name: "Sarah Nkurunziza",
          role: "Adult",
          email: "sarah.nkurunziza@email.com",
          birthday: "1998-07-14",
          profilePic: null,
          type: "member",
          year: 2023,
        },
      ],
    },
    2024: {
      id: "root",
      name: "IMENA Family 2024",
      type: "family",
      // Level 1: 2 circles at top
      children: [
        {
          id: "member9",
          name: "Paul Nkurunziza",
          role: "Young Adult",
          email: "paul.nkurunziza@email.com",
          birthday: "2001-09-30",
          profilePic: null,
          type: "member",
          year: 2024,
        },
        {
          id: "member10",
          name: "Esther Uwimana",
          role: "Young Adult",
          email: "esther.uwimana@email.com",
          birthday: "2003-06-08",
          profilePic: null,
          type: "member",
          year: 2024,
        },
      ],
    },
  };

  // Generate binary tree structure for each year
  const generateBinaryTree = (yearData) => {
    const root = { ...yearData };

    // Level 1: 2 circles at top (already have these)
    const level1Nodes = root.children;

    // Level 2: 2 more circles coming from each of the top 2
    const level2Nodes = [];
    level1Nodes.forEach((node, index) => {
      const leftChild = {
        id: `${node.id}_left`,
        name: `${node.name} Jr.`,
        role: "Child",
        email: `${node.name.toLowerCase().replace(" ", ".")}.jr@email.com`,
        birthday: "2005-01-01",
        profilePic: null,
        type: "member",
        year: node.year,
      };
      const rightChild = {
        id: `${node.id}_right`,
        name: `${node.name} II`,
        role: "Child",
        email: `${node.name.toLowerCase().replace(" ", ".")}.ii@email.com`,
        birthday: "2007-01-01",
        profilePic: null,
        type: "member",
        year: node.year,
      };
      level2Nodes.push(leftChild, rightChild);
    });

    // Level 3: 2 more circles from each of the level 2 nodes
    const level3Nodes = [];
    level2Nodes.forEach((node, index) => {
      const leftChild = {
        id: `${node.id}_left`,
        name: `${node.name} III`,
        role: "Grandchild",
        email: `${node.name.toLowerCase().replace(" ", ".")}.iii@email.com`,
        birthday: "2010-01-01",
        profilePic: null,
        type: "member",
        year: node.year,
      };
      const rightChild = {
        id: `${node.id}_right`,
        name: `${node.name} IV`,
        role: "Grandchild",
        email: `${node.name.toLowerCase().replace(" ", ".")}.iv@email.com`,
        birthday: "2012-01-01",
        profilePic: null,
        type: "member",
        year: node.year,
      };
      level3Nodes.push(leftChild, rightChild);
    });

    // Build the tree structure
    root.children = level1Nodes.map((node, index) => ({
      ...node,
      children: [
        {
          ...level2Nodes[index],
          children: [level3Nodes[index * 4], level3Nodes[index * 4 + 1]],
        },
        {
          ...level2Nodes[index * 2 + 1],
          children: [level3Nodes[index * 4 + 2], level3Nodes[index * 4 + 3]],
        },
      ],
    }));

    return root;
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "about"]|order(year asc){
          _id,
          name,
          familyName,
          role,
          year,
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
          year: Number.isFinite(parseInt(m.year, 10))
            ? parseInt(m.year, 10)
            : null,
          profilePic: m?.image?.asset?.url || pickPhoto(),
        }));
        setMembers(mapped);
        const uniqueYears = Array.from(
          new Set(mapped.map((m) => m.year).filter((y) => Number.isFinite(y)))
        ).sort((a, b) => a - b);
        setYears(uniqueYears);
        if (uniqueYears.length > 0) {
          const latest = uniqueYears[uniqueYears.length - 1];
          setSelectedYearRange(`${latest}-${latest + 1}`);
        }
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
      <div className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white w-[610px]">
        <div className="flex items-center">
          <div className=" w-30 h-72 sm:w-72 sm:h-80 md:w-50 md:h-96 shrink-0 overflow-hidden">
            {member.profilePic ? (
              <img
                src={member.profilePic}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-600 text-white p-5 flex items-center justify-center font-bold text-2xl">
                {member.name?.charAt(0)?.toUpperCase() || "M"}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1 flex flex-col items-center justify-center text-center text-xl space-y-2 px-2">
            <p className="font-semibold text-gray-900 truncate max-w-[260px]">
              {member.name}
            </p>
            {member.familyName && (
              <p className="text-base text-gray-700 truncate max-w-[260px]">
                {member.familyName}
              </p>
            )}
            {member.role && (
              <span className="inline-block px-4 py-1 text-sm text-white rounded-full border bg-blue-700 mt-2">
                {member.role}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const PlaceholderCard = () => {
    return (
      <div
        className="rounded-xl border border-transparent p-5"
        aria-hidden="true"
      ></div>
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
        {/* Members from Sanity in 2-1-2-2-2 layout (or 2-2-2-2-2 if Vice Coordinator exists) */}
        <div className="rounded-lg shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 text-center flex-1"></h2>
            {years.length > 0 && (
              <div className="ml-4">
                <label htmlFor="yearFilter" className="sr-only">
                  Filter by Year
                </label>
                <select
                  id="yearFilter"
                  value={String(selectedYearRange)}
                  onChange={(e) => setSelectedYearRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {years.map((y) => {
                    const label = `${y}-${y + 1}`;
                    return (
                      <option key={y} value={label}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
          {(() => {
            const startOfSelected = Number.parseInt(
              (selectedYearRange || "").split("-")[0],
              10
            );
            const list = members.filter((m) => m.year === startOfSelected);

            const used = new Set();
            const textOf = (m) => (m.role || "").toLowerCase();
            const hasAll = (t, parts) => parts.every((p) => t.includes(p));
            const hasAny = (t, parts) => parts.some((p) => t.includes(p));

            const pick = (predicate) => {
              const result = [];
              for (const m of list) {
                if (used.has(m.id)) continue;
                if (predicate(m)) {
                  result.push(m);
                  used.add(m.id);
                }
              }
              return result;
            };

            const grandparents = pick((m) =>
              hasAny(textOf(m), [
                "grandpere",
                "grand pere",
                "grand-pere",
                "grandmere",
                "grand mere",
                "grand-mere",
                "grandparent",
                "grandparents",
              ])
            );
            const viceRecruit = pick((m) => {
              const t = textOf(m);
              const vice =
                hasAny(t, ["vice"]) &&
                hasAny(t, [
                  "coordinator",
                  "coord",
                  "co-ordinator",
                  "co ordinator",
                  "co",
                ]);
              const recruitment = hasAny(t, [
                "recruitment",
                "recruiter",
                "recruit",
              ]);
              return vice || recruitment;
            });
            const wihogora = pick((m) => {
              const t = textOf(m);
              return hasAll(t, ["wihogora"]) && hasAny(t, ["pere", "mere"]);
            });
            const hope = pick((m) => {
              const t = textOf(m);
              return hasAll(t, ["hope"]) && hasAny(t, ["pere", "mere"]);
            });
            const light = pick((m) => {
              const t = textOf(m);
              return hasAll(t, ["light"]) && hasAny(t, ["pere", "mere"]);
            });

            const firstRow = grandparents.slice(0, 2);
            const secondRow = viceRecruit.slice(0, 2);
            const thirdRow = wihogora.slice(0, 2);
            const fourthRow = hope.slice(0, 2);
            const fifthRow = light.slice(0, 2);

            return (
              <div className="space-y-14 w-full">
                {/* Row 1 */}
                {firstRow.length > 0 && (
                  <h3 className="text-center text-xl font-semibold text-gray-800">
                    Grandpere & Grandmere
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-14 gap-x-40">
                  {firstRow.map((m) => (
                    <MemberCard key={m.id} member={m} />
                  ))}
                </div>

                {/* Row 2 */}
                {secondRow.length > 0 && (
                  <h3 className="text-center text-xl font-semibold text-gray-800 mt-4">
                    Vice Coordinator / Recruitment
                  </h3>
                )}
                {secondRow.length === 1 ? (
                  <div className="max-w-2xl mx-auto">
                    <MemberCard key={secondRow[0].id} member={secondRow[0]} />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-14 gap-x-40">
                    {secondRow.map((m) => (
                      <MemberCard key={m.id} member={m} />
                    ))}
                    {secondRow.length === 1 && <PlaceholderCard />}
                  </div>
                )}

                {/* Row 3 */}
                {thirdRow.length > 0 && (
                  <h3 className="text-center text-xl font-semibold text-gray-800 mt-4">
                    Pere Wihogora & Mere Wihogora
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-14 gap-x-40">
                  {thirdRow.map((m) => (
                    <MemberCard key={m.id} member={m} />
                  ))}
                  {thirdRow.length === 1 && <PlaceholderCard />}
                </div>

                {/* Row 4 */}
                {fourthRow.length > 0 && (
                  <h3 className="text-center text-xl font-semibold text-gray-800 mt-4">
                    Pere Hope & Mere Hope
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-14 gap-x-40">
                  {fourthRow.map((m) => (
                    <MemberCard key={m.id} member={m} />
                  ))}
                  {fourthRow.length === 1 && <PlaceholderCard />}
                </div>

                {/* Row 5 */}
                {fifthRow.length > 0 && (
                  <h3 className="text-center text-xl font-semibold text-gray-800 mt-4">
                    Pere Light & Mere Light
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-14 gap-x-40">
                  {fifthRow.map((m) => (
                    <MemberCard key={m.id} member={m} />
                  ))}
                  {fifthRow.length === 1 && <PlaceholderCard />}
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
