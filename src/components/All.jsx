"use client"
import { useState } from "react"
import kaneza from "./dp.png"
import NewsletterFooter from "./Footer"


const pageContent = [

  [ //page ya mbere
    {
      tag: "ACTIVITY",
      tagColor: "#1E88E5",
      tagBg: "#E3F2FD",
      title: "A Heart-warming Family Reunion: Embracing Togetherness ! Embarking cherished Moments together",
      description:
        "Amidst The Hustle And Bustle Of Our Daily Lives, This Family Reunion Serves As A Reminder Of The Importance Of Taking A Pause And Relishing The Company Of Those Who Matter Most.",
      author: "KANEZA A",
      date: "May 31, 2023",
    },
    {
      tag: "ACTIVITY",
      tagColor: "#1E88E5",
      tagBg: "#E3F2FD",
     title: "A Heart-warming Family Reunion: Embracing Togetherness ! Embarking cherished Moments together",
      description:
        "Amidst The Hustle And Bustle Of Our Daily Lives, This Family Reunion Serves As A Reminder Of The Importance Of Taking A Pause And Relishing The Company Of Those Who Matter Most.",
      author: "KANEZA A",
      date: "May 31, 2023",
    },
    {
      tag: "ACTIVITY",
      tagColor: "#1E88E5",
      tagBg: "#E3F2FD",
      title: "A Heart-warming Family Reunion: Embracing Togetherness ! Embarking cherished Moments together",
      description:
        "Amidst The Hustle And Bustle Of Our Daily Lives, This Family Reunion Serves As A Reminder Of The Importance Of Taking A Pause And Relishing The Company Of Those Who Matter Most.",
      author: "KANEZA A",
      date: "May 31, 2023",
    },
    {
      tag: "ACTIVITY",
      tagColor: "#1E88E5",
      tagBg: "#E3F2FD",
      title: "A Heart-warming Family Reunion: Embracing Togetherness ! Embarking cherished Moments together",
      description:
        "Amidst The Hustle And Bustle Of Our Daily Lives, This Family Reunion Serves As A Reminder Of The Importance Of Taking A Pause And Relishing The Company Of Those Who Matter Most.",
      author: "KANEZA A",
      date: "May 31, 2023",
    },
    {
      tag: "ACTIVITY",
      tagColor: "#1E88E5",
      tagBg: "#E3F2FD",
      title: "A Heart-warming Family Reunion: Embracing Togetherness ! Embarking cherished Moments together",
      description:
        "Amidst The Hustle And Bustle Of Our Daily Lives, This Family Reunion Serves As A Reminder Of The Importance Of Taking A Pause And Relishing The Company Of Those Who Matter Most.",
      author: "KANEZA A",
      date: "May 31, 2023",
    },
    {
      tag: "ACTIVITY",
      tagColor: "#1E88E5",
      tagBg: "#E3F2FD",
      title: "A Heart-warming Family Reunion: Embracing Togetherness ! Embarking cherished Moments together",
      description:
        "Amidst The Hustle And Bustle Of Our Daily Lives, This Family Reunion Serves As A Reminder Of The Importance Of Taking A Pause And Relishing The Company Of Those Who Matter Most.",
      author: "KANEZA A",
      date: "May 31, 2023",
    },
  ],
  //page ya 2
 [
  {
    tag: "ANNOUNCEMENT",
    tagColor: "#1E88E5",
    tagBg: "#E3F2FD",
    title: "AERG Celebrates 25th Anniversary: A Journey of Resilience",
    description:
      "The Genocide Survivors Students Association (AERG) marked its 25th anniversary on November 6, 2021, reflecting on its journey of resilience and contribution to Rwanda's recovery.",
    author: "BERWA S",
    date: "November 6, 2021",
  },
  {
    tag: "MERGER",
    tagColor: "#43A047",
    tagBg: "#E8F5E9",
    title: "AERG and GAERG Merge into One Organization to Strengthen Survivors’ Voice",
    description:
      "In December 2024, AERG and GAERG merged with IBUKA to form a unified entity, aiming to strengthen the support and advocacy for genocide survivors.",
    author: "AERG News Desk",
    date: "December 15, 2024",
  },
  {
    tag: "COMMUNITY",
    tagColor: "#F4511E",
    tagBg: "#FBE9E7",
    title: "Youth Survivors Recognize Genocide Rescuers with Acts of Gratitude",
    description:
      "AERG and GAERG honored individuals who rescued Tutsis during the genocide by gifting them cows, acknowledging their bravery and humanity.",
   author: "BERWA S",
    date: "March 3, 2023",
  },
  {
    tag: "EVENT",
    tagColor: "#6A1B9A",
    tagBg: "#F3E5F5",
    title: "AERG-GAERG Week Activities to Combat Genocide Denial",
    description:
      "AERG and GAERG organized the AERG-GAERG Week, focusing on combating genocide denial and promoting remembrance through various community activities.",
    author: "BERWA S",
    date: "April 20, 2024",
  },
  {
    tag: "PROJECT",
    tagColor: "#00897B",
    tagBg: "#E0F2F1",
    title: "AERG Humura Nturiwenyine: Trauma Counseling for Survivors",
    description:
      "Since 2011, AERG has trained over 3,200 members in trauma counseling to support fellow genocide survivors in healing and recovery.",
   author: "BERWA S",
    date: "Ongoing since 2011",
  },
  {
    tag: "WORKSHOP",
    tagColor: "#FF8F00",
    tagBg: "#FFF8E1",
    title: "Youth Digital Skills Workshop Empowers Next Generation",
    description:
      "AERG organized a digital skills workshop in 2023 to equip youth survivors with programming and IT literacy to foster employment opportunities.",
    author: "BERWA S",
    date: "July 15, 2023",
  }
],

  // Page YA 3
[
  {
    tag: "OUTREACH",
    tagColor: "#D81B60",
    tagBg: "#FCE4EC",
    title: "Community Outreach Program Strengthens Local Support Networks",
    description:
      "In 2022, AERG members actively participated in community education and support activities to promote unity and resilience.",
     author: "MFURA Y",
    date: "October 10, 2022",
  },
  {
    tag: "GALA",
    tagColor: "#6D4C41",
    tagBg: "#EFEBE9",
    title: "Annual Gala and Awards Night Celebrates Member Achievements",
    description:
      "The 2024 Gala recognized outstanding contributions of members and partners advancing the mission of AERG.",
    author: "MFURA Y",
    date: "January 18, 2024",
  },
  {
    tag: "HACKATHON",
    tagColor: "#3949AB",
    tagBg: "#E8EAF6",
    title: "Tech Hackathon Weekend Sparks Innovation Among Youth",
    description:
      "AERG hosted a 48-hour hackathon in 2023 encouraging youth survivors to develop tech solutions addressing community challenges.",
    author: "MFURA Y",
    date: "September 22-24, 2023",
  },
  {
    tag: "CULTURE",
    tagColor: "#F06292",
    tagBg: "#FCE4EC",
    title: "Cultural Festival and Art Exhibition Showcases Local Heritage",
    description:
      "In 2023, AERG organized an event to celebrate Rwandan culture and creativity, promoting unity and healing through art.",
     author: "MFURA Y",
    date: "December 5, 2023",
  },
  {
    tag: "TRAINING",
    tagColor: "#0288D1",
    tagBg: "#E1F5FE",
    title: "Capacity Building Seminar for New Members",
    description:
      "AERG conducted a seminar in early 2024 to train new members on organizational goals and leadership skills.",
     author: "MFURA Y",
    date: "February 12, 2024",
  },
  {
    tag: "PARTNERSHIP",
    tagColor: "#7B1FA2",
    tagBg: "#F3E5F5",
    title: "AERG Partners with Tech Companies for Digital Inclusion",
    description:
      "In 2023, AERG partnered with local tech firms to increase digital access for survivors through affordable internet and devices.",
    author: "MFURA Y",
    date: "August 30, 2023",
  }
],

  // Page YA 4

  [{
        tag: "ANNOUNCEMENT",
    tagColor: "#1E88E5",
    tagBg: "#E3F2FD",
    title: "AERG Celebrates 25th Anniversary: A Journey of Resilience",
    description:
      "The Genocide Survivors Students Association (AERG) marked its 25th anniversary on November 6, 2021, reflecting on its journey of resilience and contribution to Rwanda's recovery.",
    author: "AERG Communications",
    date: "November 6, 2021",
  },
  {
    tag: "MERGER",
    tagColor: "#43A047",
    tagBg: "#E8F5E9",
    title: "AERG and GAERG Merge into One Organization to Strengthen Survivors’ Voice",
    description:
      "In December 2024, AERG and GAERG merged with IBUKA to form a unified entity, aiming to strengthen the support and advocacy for genocide survivors.",
    author: "AERG News Desk",
    date: "December 15, 2024",
  },
  {
    tag: "COMMUNITY",
    tagColor: "#F4511E",
    tagBg: "#FBE9E7",
    title: "Youth Survivors Recognize Genocide Rescuers with Acts of Gratitude",
    description:
      "AERG and GAERG honored individuals who rescued Tutsis during the genocide by gifting them cows, acknowledging their bravery and humanity.",
    author: "AERG Outreach Team",
    date: "March 3, 2023",
  },
  {
    tag: "EVENT",
    tagColor: "#6A1B9A",
    tagBg: "#F3E5F5",
    title: "AERG-GAERG Week Activities to Combat Genocide Denial",
    description:
      "AERG and GAERG organized the AERG-GAERG Week, focusing on combating genocide denial and promoting remembrance through various community activities.",
    author: "Event Coordinator",
    date: "April 20, 2024",
  },
  {
    tag: "PROJECT",
    tagColor: "#00897B",
    tagBg: "#E0F2F1",
    title: "AERG Humura Nturiwenyine: Trauma Counseling for Survivors",
    description:
      "Since 2011, AERG has trained over 3,200 members in trauma counseling to support fellow genocide survivors in healing and recovery.",
    author: "AERG Mental Health Program",
    date: "Ongoing since 2011",
  },

    {
    tag: "PROJECT",
    tagColor: "#00897B",
    tagBg: "#E0F2F1",
    title: "AERG Humura Nturiwenyine: Trauma Counseling for Survivors",
    description:
      "Since 2011, AERG has trained over 3,200 members in trauma counseling to support fellow genocide survivors in healing and recovery.",
    author: "MWAMBI C",
    date: "Ongoing since 2011",
  }
],

  //page ya 5

 [
  {
    tag: "PARTY",
    tagColor: "#FF5722",
    tagBg: "#FBE9E7",
    title: "AERG End-of-Year Celebration",
    description:
      "A festive party held in December 2023 to celebrate the achievements and unity of AERG members throughout the year.",
    author: "AERG Events Committee",
    date: "December 22, 2023",
  },
  {
    tag: "PARTY",
    tagColor: "#E91E63",
    tagBg: "#FCE4EC",
    title: "AERG Youth Social Gathering",
    description:
      "A casual party in July 2023 where young survivors connected, shared stories, and strengthened friendships.",
    author: "AERG Youth Team",
    date: "July 10, 2023",
  },
  {
    tag: "PARTY",
    tagColor: "#9C27B0",
    tagBg: "#F3E5F5",
    title: "AERG Anniversary Gala and Dance Night",
    description:
      "An elegant gala and dance party to celebrate AERG’s 25th anniversary in November 2021 with music, awards, and dancing.",
    author: "AERG Communications",
    date: "November 6, 2021",
  },
  {
    tag: "PARTY",
    tagColor: "#FF9800",
    tagBg: "#FFF3E0",
    title: "AERG Summer BBQ and Family Picnic",
    description:
      "A summer party held in August 2022 inviting members and their families for food, games, and community bonding.",
    author: "AERG Outreach Team",
    date: "August 14, 2022",
  },
  {
    tag: "PARTY",
    tagColor: "#3F51B5",
    tagBg: "#E8EAF6",
    title: "AERG New Year Celebration",
    description:
      "A lively event welcoming the new year with music, dance, and reflections on hopes for the future.",
    author: "AERG Events Committee",
    date: "January 1, 2024",
  },
  {
    tag: "PARTY",
    tagColor: "#F44336",
    tagBg: "#FFEBEE",
    title: "AERG Cultural Dance Night",
    description:
      "A vibrant party celebrating Rwandan culture through traditional dance and music, fostering community spirit.",
    author: "AERG Cultural Team",
    date: "March 12, 2023",
  }
],

  //page ya 6

[{
        tag: "ANNOUNCEMENT",
    tagColor: "#1E88E5",
    tagBg: "#E3F2FD",
    title: "AERG Celebrates 25th Anniversary: A Journey of Resilience",
    description:
      "The Genocide Survivors Students Association (AERG) marked its 25th anniversary on November 6, 2021, reflecting on its journey of resilience and contribution to Rwanda's recovery.",
    author: "AERG Communications",
    date: "November 6, 2021",
  },

  {
        tag: "ANNOUNCEMENT",
    tagColor: "#1E88E5",
    tagBg: "#E3F2FD",
    title: "AERG Celebrates 25th Anniversary: A Journey of Resilience",
    description:
      "The Genocide Survivors Students Association (AERG) marked its 25th anniversary on November 6, 2021, reflecting on its journey of resilience and contribution to Rwanda's recovery.",
    author: "AERG IMENA",
    date: "November 6, 2021",
  },

  {
    tag: "MERGER",
    tagColor: "#43A047",
    tagBg: "#E8F5E9",
    title: "AERG and GAERG Merge into One Organization to Strengthen Survivors’ Voice",
    description:
      "In December 2024, AERG and GAERG merged with IBUKA to form a unified entity, aiming to strengthen the support and advocacy for genocide survivors.",
    author: "AERG News Desk",
    date: "December 15, 2024",
  },
  {
    tag: "COMMUNITY",
    tagColor: "#F4511E",
    tagBg: "#FBE9E7",
    title: "Youth Survivors Recognize Genocide Rescuers with Acts of Gratitude",
    description:
      "AERG and GAERG honored individuals who rescued Tutsis during the genocide by gifting them cows, acknowledging their bravery and humanity.",
    author: "AERG Outreach Team",
    date: "March 3, 2023",
  },
  {
    tag: "EVENT",
    tagColor: "#6A1B9A",
    tagBg: "#F3E5F5",
    title: "AERG-GAERG Week Activities to Combat Genocide Denial",
    description:
      "AERG and GAERG organized the AERG-GAERG Week, focusing on combating genocide denial and promoting remembrance through various community activities.",
    author: "Event Coordinator",
    date: "April 20, 2024",
  },
  {
    tag: "PROJECT",
    tagColor: "#00897B",
    tagBg: "#E0F2F1",
    title: "AERG Humura Nturiwenyine: Trauma Counseling for Survivors",
    description:
      "Since 2011, AERG has trained over 3,200 members in trauma counseling to support fellow genocide survivors in healing and recovery.",
    author: "AERG Mental Health Program",
    date: "Ongoing since 2011",
  }
],

]

function Duplicates() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = pageContent.length

 
  const currentPageContent = pageContent[currentPage - 1] || []

  const cardStyle = {
    backgroundColor: "white",
    height: "370px",
    marginLeft: "70px",
    borderRadius: "25px",
    width: "87%",
  }
   
  const sideBoxStyle = {
    backgroundColor: "#E9E9E9",
    height: "310px",
    left: "840px",
    position: "absolute",
    top: "30px",
    borderRadius: "25px",
    width: "35%",
  }

  const buttonBaseStyle = {
    backgroundColor: "white",
    border: "none",
    fontFamily: '"Poppins", sans-serif',
    fontWeight: "600",
    fontSize: "20px",
    cursor: "pointer",
  }

  return (
    <div style={{ backgroundColor: "#FAFAFA", paddingBottom: "100px" }}>
      {currentPageContent.map((card, index) => (
        <div key={index} style={{ position: "relative", marginBottom: "40px" }}>
          <div style={cardStyle}>
            <div
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                maxWidth: "600px",
              }}
            >
              <div
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: card.tagBg,
                  color: card.tagColor,
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "20px",
                  marginBottom: "8px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {card.tag}
              </div>

              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  margin: "0 0 8px 0",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {card.title}
              </h2>

              <p
                style={{
                  color: "#6B7280",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  margin: "0 0 16px 0",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {card.description}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={kaneza || "/placeholder.svg"}
                    alt="Author avatar"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      marginRight: "12px",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        fontFamily: '"Poppins", sans-serif',
                      }}
                    >
                      {card.author}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#9CA3AF",
                        fontFamily: '"Poppins", sans-serif',
                      }}
                    >
                      {card.date}
                    </div>
                  </div>
                </div>

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 9.84066C7.54305 9.32015 6.80891 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C6.80891 15 7.54305 14.6798 8.08261 14.1593L15.0227 18.6294C15.0077 18.7508 15 18.8745 15 19C15 20.6569 16.3431 22 18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C17.1911 16 16.457 16.3202 15.9174 16.8407L8.97733 12.3706C8.99229 12.2492 9 12.1255 9 12C9 11.8745 8.99229 11.7508 8.97733 11.6294L15.9174 7.15934C16.457 7.67985 17.1911 8 18 8Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div style={sideBoxStyle}></div>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          justifyContent: "center",
          marginTop: "40px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            ...buttonBaseStyle,
            height: "50px",
            width: "150px",
            borderRadius: "20px",
            color: "#1E88E5",
            opacity: currentPage === 1 ? 0.5 : 1,
          }}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            style={{
              ...buttonBaseStyle,
              height: "60px",
              width: "60px",
              borderRadius: "50%",
              color: currentPage === num ? "#1E88E5" : "#6B7280",
              fontWeight: currentPage === num ? "bold" : "normal",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            ...buttonBaseStyle,
            height: "50px",
            width: "100px",
            borderRadius: "20px",
            color: "#1E88E5",
            opacity: currentPage === totalPages ? 0.5 : 1,
          }}
        >
          Next
        </button>
      </div>
      <section style={{marginTop:"130px", backgroundColor:"white", height:"590px"}}> <NewsletterFooter /></section>
      
    </div>
  )
}

export default Duplicates
