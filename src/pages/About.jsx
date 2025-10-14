import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/apiService";
import img1 from "../assets/aboutPhotos/image1.jpg";
import img2 from "../assets/aboutPhotos/image2.jpg";
import img3 from "../assets/aboutPhotos/image3.jpg";
import img4 from "../assets/aboutPhotos/image4.jpg";
import img5 from "../assets/aboutPhotos/image5.jpg";
import img6 from "../assets/aboutPhotos/image6.jpg";
import img7 from "../assets/aboutPhotos/image7.jpg";

const About = () => {
  const { user, isAuthenticated } = useAuth();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");

  // Mock family tree data organized by years - in a real app, this would come from an API
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
    // Simulate API call
    const fetchFamilyMembers = async () => {
      try {
        setLoading(true);
        // In a real app, you would call an API here
        // const response = await authService.getAllFamilyMembers();
        // setFamilyMembers(response.data);

        // For now, use mock data with binary tree structure
        setTimeout(() => {
          const yearData = mockFamilyTreeByYear[selectedYear];
          const binaryTree = generateBinaryTree(yearData);
          setFamilyMembers(binaryTree);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load family members");
        setLoading(false);
      }
    };

    fetchFamilyMembers();
  }, [selectedYear]);

  // Create a simple card component for members
  const MemberCard = ({ member }) => {
    return (
      <div className="rounded-xl border border-gray-200 shadow-sm p-5">
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

          {/* Year Filter */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <label
              htmlFor="yearFilter"
              className="text-sm font-medium text-gray-700"
            >
              Filter by Year:
            </label>
            <select
              id="yearFilter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        {/* 2-1-2(+2) Card Layout */}
        <div className="rounded-lg p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Our Core Members - {selectedYear}
          </h2>

          {/* Prepare a flat list: take first 5 derived from the mock tree */}
          {(() => {
            const photoPool = [img1, img2, img3, img4, img5, img6, img7];
            let photoIndex = 0;
            const pickPhoto = () => {
              const p = photoPool[photoIndex % photoPool.length];
              photoIndex += 1;
              return p;
            };
            const topTwo = (familyMembers.children || []).slice(0, 2);
            const nextThree = [];
            // pull two children from first top node and one from second if available
            if (topTwo[0]?.children) {
              nextThree.push(...topTwo[0].children.slice(0, 2));
            }
            if (topTwo[1]?.children) {
              nextThree.push(topTwo[1].children[0]);
            }
            const remainingTwo = [];
            // try to take grandchildren for a final pair
            if (topTwo[0]?.children?.[0]?.children) {
              remainingTwo.push(...topTwo[0].children[0].children.slice(0, 2));
            }
            const extraTwo = [];
            if (topTwo[1]?.children?.[0]?.children) {
              extraTwo.push(...topTwo[1].children[0].children.slice(0, 2));
            }

            const cards = {
              firstRow: topTwo.filter(Boolean),
              middle: nextThree.filter(Boolean)[0]
                ? [nextThree.filter(Boolean)[0]]
                : [],
              lastRow: remainingTwo.filter(Boolean).slice(0, 2),
              secondPair: nextThree.filter(Boolean).slice(1, 3),
              extraTwo: extraTwo.filter(Boolean).slice(0, 2),
            };

            // Attach profile pictures from pool
            const attachPhoto = (m) => ({
              ...m,
              profilePic: m.profilePic || pickPhoto(),
            });

            return (
              <div className="space-y-6">
                {/* Top row: two cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {cards.firstRow.map((m) => (
                    <MemberCard key={m.id} member={attachPhoto(m)} />
                  ))}
                </div>

                {/* Middle single card */}
                {cards.middle.length > 0 && (
                  <div className="max-w-md mx-auto">
                    <MemberCard member={attachPhoto(cards.middle[0])} />
                  </div>
                )}

                {/* Second pair below middle (remaining from nextThree) */}
                {cards.secondPair.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {cards.secondPair.map((m) => (
                      <MemberCard key={m.id} member={attachPhoto(m)} />
                    ))}
                  </div>
                )}

                {/* Last row: two cards */}
                {cards.lastRow.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {cards.lastRow.map((m) => (
                      <MemberCard key={m.id} member={attachPhoto(m)} />
                    ))}
                  </div>
                )}

                {/* Extra row: two more cards below last two */}
                {cards.extraTwo.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {cards.extraTwo.map((m) => (
                      <MemberCard key={m.id} member={attachPhoto(m)} />
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default About;
