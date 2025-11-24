import React, { useState, useEffect } from "react";
import { client } from "../sanityClient";
import newLogo from "../assets/new.svg";
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
  const [selectedYearRange, setSelectedYearRange] = useState("");
  const [years, setYears] = useState([]); // array of yearRange strings

 
  const quotes = [
    "Urukundo ni ibanga ryacu",
    "Shinjagira, Niyo waba ushira",
    "Imbere heza haraharanirwa",
    "Mu buzima ntakujenjeka, urumva",
    "Imbere heza ni ahacu",
    "Hora ukeye Nka za mfura z'iwacu",
    "Mu ruhongore harugariye",
    "Shinga icumu n'ahakomeye ririnjira",
    "Niriva tuzumana",
    "Umurava wacu, Intsinzi yacu",
    
  ];

  const pickQuote = (seed) => {
    let hash = 0;
    const text = String(seed || "");
    for (let i = 0; i < text.length; i += 1) {
      hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
    }
    return quotes[hash % quotes.length];
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "about"]|order(yearRange asc){
          _id,
          name,
          familyName,
          role,
          yearRange,
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
        const mapped = (data || []).map((m) => {
          const yr = String(m.yearRange || '');
          const startYear = Number.parseInt(yr.split('-')[0], 10);
          return {
          id: m._id,
          name: m.name || "Unnamed",
          role: m.role || "",
          familyName: m.familyName || "",
          yearRange: yr,
          year: Number.isFinite(startYear) ? startYear : null,
          profilePic: m?.image?.asset?.url || pickPhoto(),
          };
        });
        setMembers(mapped);
        const uniqueYearRanges = Array.from(
          new Set(mapped.map((m) => m.yearRange).filter((y) => Boolean(y)))
        );
        // sort by start year ascending
        uniqueYearRanges.sort((a, b) => {
          const as = parseInt(String(a).split('-')[0], 10);
          const bs = parseInt(String(b).split('-')[0], 10);
          return (as || 0) - (bs || 0);
        });
        setYears(uniqueYearRanges);
        if (uniqueYearRanges.length > 0) {
          setSelectedYearRange(uniqueYearRanges[uniqueYearRanges.length - 1]);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load members");
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // Card component for members with minimal blue border, responsive sizing, and a quote
  const MemberCard = ({ member }) => {
    return (
      <div className="relative group w-full max-w-[700px]">
        <div className="relative rounded-2xl bg-white border border-blue-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-stretch">
            <div className="w-full h-64 sm:w-72 sm:h-80 md:h-96 m-4 rounded-xl overflow-hidden ring-4 ring-white shadow-md shrink-0">
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
            <div className="min-w-0 flex-1 flex flex-col justify-center px-4 pb-4 sm:pr-5 sm:py-5">
              <div className="flex flex-col">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight break-words">
                  {member.name}
                </h3>
                {member.role && (
                  <span className="mt-1 self-start inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-3 py-0.5 text-xs font-semibold">
                    {member.role}
                  </span>
                )}
              </div>
              {member.familyName && (
                <span className="mt-2 self-start inline-flex items-center rounded-md bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 text-xs sm:text-sm md:text-base font-semibold break-words">
                  {member.familyName}
                </span>
              )}
              <blockquote className="mt-3 text-sm sm:text-base text-gray-700 italic border-l-4 border-blue-200 pl-3">
                “{pickQuote(member.id || member.name)}”
              </blockquote>
            </div>
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-10 md:py-12 max-w-6xl">
          <div className="flex flex-col items-center justify-center py-16">
            <img src={newLogo} alt="Loading" className="w-20 h-20 animate-spin" />
            <p className="mt-4 text-gray-600">Loading family tree…</p>
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-3 sm:px-4 py-8 md:py-12 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <img src={newLogo} alt="AERG IMENA" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-blue-700 mb-3">
            AERG IMENA Family Tree
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover the connections and relationships within our extended
            family. Each level represents a generation, and each circle
            represents a family member.
          </p>
        </div>
        {/* Members from Sanity in 2-1-2-2-2 layout (or 2-2-2-2-2 if Vice Coordinator exists) */}
        <div className="rounded-lg">
          <div className="mb-6">
            {years.length > 0 && (
              <div role="tablist" aria-label="Year ranges" className="-mx-2 overflow-x-auto">
                <div className="flex items-center gap-2 px-2">
                  {years.map((yr) => {
                    const active = yr === selectedYearRange;
                    return (
                      <button
                        key={yr}
                        role="tab"
                        aria-selected={active}
                        className={
                          `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ` +
                          (active
                            ? `bg-blue-600 text-white`
                            : `bg-white text-blue-700 border border-blue-200 hover:bg-blue-50`)
                        }
                        onClick={() => setSelectedYearRange(yr)}
                      >
                        {yr}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {(() => {
            const list = members.filter((m) => m.yearRange === selectedYearRange);

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
            // Ensure Grandpere appears before Grandmere in the first row
            const isGrandpere = (m) =>
              hasAny(textOf(m), ["grandpere", "grand pere", "grand-pere"]);
            grandparents.sort((a, b) => (isGrandpere(a) ? 0 : 1) - (isGrandpere(b) ? 0 : 1));
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
            // Sort wihogora: Pere first, then Mere
            wihogora.sort((a, b) => {
              const aIsPere = hasAny(textOf(a), ["pere"]);
              const bIsPere = hasAny(textOf(b), ["pere"]);
              return (bIsPere ? 1 : 0) - (aIsPere ? 1 : 0);
            });

            const hope = pick((m) => {
              const t = textOf(m);
              return hasAll(t, ["hope"]) && hasAny(t, ["pere", "mere"]);
            });
            // Sort hope: Pere first, then Mere
            hope.sort((a, b) => {
              const aIsPere = hasAny(textOf(a), ["pere"]);
              const bIsPere = hasAny(textOf(b), ["pere"]);
              return (bIsPere ? 1 : 0) - (aIsPere ? 1 : 0);
            });

            const light = pick((m) => {
              const t = textOf(m);
              return hasAll(t, ["light"]) && hasAny(t, ["pere", "mere"]);
            });
            // Sort light: Pere first, then Mere
            light.sort((a, b) => {
              const aIsPere = hasAny(textOf(a), ["pere"]);
              const bIsPere = hasAny(textOf(b), ["pere"]);
              return (bIsPere ? 1 : 0) - (aIsPere ? 1 : 0);
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
                <div className="grid grid-cols-1 md:grid-cols-2 w-full place-items-center gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-8 md:gap-x-12">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-8 md:gap-x-12">
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
                <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-8 md:gap-x-12">
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
                <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-8 md:gap-x-12">
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
                <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-8 md:gap-x-12">
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
