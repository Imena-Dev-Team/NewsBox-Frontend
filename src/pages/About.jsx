import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/apiService";

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
          profilePic: null,
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
          ...level2Nodes[index ],
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

  const BinaryTreeNode = ({ node, level = 0, position = "center" }) => {
    const getNodeSize = () => {
      if (level === 0) return "w-24 h-32";
      if (level === 1) return "w-20 h-28";
      return "w-16 h-24";
    };

    const getImageSize = () => {
      if (level === 0) return "w-16 h-12";
      if (level === 1) return "w-14 h-10";
      return "w-12 h-8";
    };

    return (
      <div
        className={`flex flex-col items-center ${
          position === "left"
            ? "items-start"
            : position === "right"
            ? "items-end"
            : "items-center"
        }`}
      >
        {/* Node Rectangle */}
        <div
          className={`${getNodeSize()} bg-white border-2 border-gray-300 rounded-lg shadow-sm flex flex-col items-center justify-start p-2 relative`}
        >
          {/* Profile Image Rectangle */}
          <div
            className={`${getImageSize()} bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs mb-2`}
          >
            {node.name?.charAt(0)?.toUpperCase() || "M"}
          </div>

          {/* Name */}
          <h3 className="font-semibold text-gray-800 text-xs text-center mb-1 leading-tight">
            {node.name}
          </h3>

          {/* Title/Role */}
          {node.role && (
            <p className="text-xs text-gray-600 text-center leading-tight">
              {node.role}
            </p>
          )}
        </div>

        {/* Children */}
        {node.children && node.children.length > 0 && (
          <div className="flex justify-center space-x-12 mt-6">
            {node.children.map((child, index) => (
              <div key={child.id} className="relative">
                {/* Dashed Connection Lines */}
                <div
                  className="absolute -top-6 left-1/2 w-px h-6 border-l-2 border-dashed border-gray-400"
                  style={{ transform: "translateX(-50%)" }}
                ></div>
                {index === 0 && (
                  <div
                    className="absolute -top-6 left-1/2 w-12 h-px border-t-2 border-dashed border-gray-400"
                    style={{ transform: "translateX(-50%) translateX(-3rem)" }}
                  ></div>
                )}
                {index === 1 && (
                  <div
                    className="absolute -top-6 left-1/2 w-12 h-px border-t-2 border-dashed border-gray-400"
                    style={{ transform: "translateX(-50%) translateX(3rem)" }}
                  ></div>
                )}

                <BinaryTreeNode
                  node={child}
                  level={level + 1}
                  position={index === 0 ? "left" : "right"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 animate-pulse">
              I
            </div>
            <div className="space-y-4">
              <div className="w-64 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg mx-auto"></div>
              <div className="w-96 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-lg">
            I
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent mb-4">
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

        {/* Family Tree */}
        <div className="bg-gray-100 rounded-lg p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Family Structure - {selectedYear}
          </h2>

          <div className="flex justify-center overflow-x-auto">
            <div className="min-w-full">
              {familyMembers.children && familyMembers.children.length > 0 && (
                <div className="flex justify-center space-x-20">
                  {familyMembers.children.map((child, index) => (
                    <BinaryTreeNode
                      key={child.id}
                      node={child}
                      level={0}
                      position={index === 0 ? "left" : "right"}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 bg-gray-100 rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Legend
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs">
                E
              </div>
              <span className="text-sm text-gray-700">
                Elders/Adults (Level 1)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-14 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs">
                C
              </div>
              <span className="text-sm text-gray-700">Children (Level 2)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs">
                G
              </div>
              <span className="text-sm text-gray-700">
                Grandchildren (Level 3)
              </span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Each year shows different family members in the same binary tree
              structure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
