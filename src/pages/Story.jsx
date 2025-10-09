import React, { useMemo, useState } from "react"
import story1 from "../assets/storyPhotos/story1.jpeg";
import story2 from "../assets/storyPhotos/story2.jpeg";
import story3 from "../assets/storyPhotos/story3.jpg";
import story4 from "../assets/storyPhotos/story4.jpg";
import story5 from "../assets/storyPhotos/story5.jpg";
import story6 from "../assets/storyPhotos/story6.jpg";
import Ange from "../assets/storyPhotos/Ange2.jpg";
import Nziza from "../assets/storyPhotos/Nziza.jpg";

const pagesData = [
  {
    id: 1,
    title: "2020",
    description:
      "Our Imena family gathered together, the room glowing with laughter and joy.After weeks of hard work, we finally took a moment to celebrate each other, sharing stories and playful teasing. Gifts were exchanged with eager hands and sparkling eyes, each present carrying love and thoughtfulness. The air was filled with smiles that seemed to stretch from ear to ear, and every hug felt like a warm reminder of how much we care. In that simple, shining moment, it felt like time itself paused just for us, wrapped in happiness, love, and togetherness.",
    image: story1,
    testimonials: [
      { name: "Mutako", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: Ange},
      { name: "Muheto", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: Ange},
      { name: "Mfura", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar:Nziza},
      { name: "Tunga", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: Nziza}
    ]
  },
  {
    id: 2,
    title: "2021",
    description:
      "Back in 2021, our little Year One girls (Isheja, Muhorakeye, Inkindi, Ikuzwe,Karabo, gwiza, Shami) were just tiny sparks of curiosity and joy when they first stepped into the Imena family. Their shy smiles and eager eyes marked the beginning of a beautiful journey among us. Today, looking at them, it’s incredible to see how much they’ve grown—blossoming into our lively, confident “maimiess,” full of energy, laughter, and warmth. From those first timid steps to the cheerful presence they bring now, their journey has been a testament to growth, friendship, and the loving embrace of our Imena family.",
    image:
      story2,
      testimonials: [
      { name: "Mutako", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%231d4ed8'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Muheto", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23634db7'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Mfura", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23065f46'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Tunga", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23065f46'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" }
    ]
  },
  {
    id: 3,
    title: "2022",
    description:
      "After our family gathering in 2022, the air was buzzing with happiness and laughter. Everyone was glowing with joy from the time spent together, sharing stories, smiles, and little moments of fun. To capture the memory, we all huddled close for a group photo, grinning from ear to ear, each face radiating warmth and love. That snapshot wasn’t just a picture—it was a frozen piece of our happiness, a reminder of the laughter we shared and the bond that keeps our family so wonderfully connected.",
    image:
      story3,
      testimonials: [
      { name: "Mutako", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%231d4ed8'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Muheto", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23634db7'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Mfura", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23065f46'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Tunga", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23065f46'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" }
    ]
  },
   {
    id: 4,
    title: "2023",
    description:
      "The morning stretched wide across the valley, spilling sunlight over the hills like liquid gold, catching on the dew that clung stubbornly to blades of grass and leaves, each drop trembling as though it held the memory of the night’s chill, and the breeze carried with it a faint murmur of unseen lives stirring, insects whispering in the underbrush, birds flashing quick between branches, while far away, a river twisted lazily, its surface shimmering in broken fragments of light, a ribbon that both divided and united the land as it rolled past meadows and scattered cottages with smoke curling from their chimneys; the path along the ridge was worn with countless footsteps.",
    image: story4,
    testimonials: [
      { name: "Mutako", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%231d4ed8'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Muheto", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23634db7'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Mfura", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23065f46'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Tunga", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23065f46'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" }
    ]
  },
  {
    id: 4,
    title: "2024",
    description:
      "The morning stretched wide across the valley, spilling sunlight over the hills like liquid gold, catching on the dew that clung stubbornly to blades of grass and leaves, each drop trembling as though it held the memory of the night’s chill, and the breeze carried with it a faint murmur of unseen lives stirring, insects whispering in the underbrush, birds flashing quick between branches, while far away, a river twisted lazily, its surface shimmering in broken fragments of light, a ribbon that both divided and united the land as it rolled past meadows and scattered cottages with smoke curling from their chimneys; the path along the ridge was worn with countless footsteps.",
    image: story5,
    testimonials: [
      { name: "Mutako", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%231d4ed8'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Muheto", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23634db7'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Mfura", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23065f46'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Tunga", quote: "I had an incredible  experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23065f46'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" }
    ]
  },
  {
    id: 4,
    title: "2025",
    description:
      "The morning stretched wide across the valley, spilling sunlight over the hills like liquid gold, catching on the dew that clung stubbornly to blades of grass and leaves, each drop trembling as though it held the memory of the night’s chill, and the breeze carried with it a faint murmur of unseen lives stirring, insects whispering in the underbrush, birds flashing quick between branches, while far away, a river twisted lazily, its surface shimmering in broken fragments of light, a ribbon that both divided and united the land as it rolled past meadows and scattered cottages with smoke curling from their chimneys; the path along the ridge was worn with countless footsteps.",
    image: story6,
    testimonials: [
      { name: "Mutako", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%231d4ed8'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Muheto", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23634db7'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Mfura", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23065f46'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" },
      { name: "Tunga", quote: "I had an amazing experience working with this team. They were professional, attentive, and always ready to listen to my needs. The project was delivered on time, with high quality, and far exceeded my expectations. I truly appreciate their dedication and would highly recommend them to anyone looking for reliable and outstanding service.", avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='%23065f46'/><circle cx='48' cy='36' r='16' fill='white' fill-opacity='0.85'/><rect x='20' y='56' width='56' height='24' rx='12' fill='white' fill-opacity='0.85'/></svg>" }
    ]
  },
]

export default function PaginatedShowcase() {
  const [pageIndex, setPageIndex] = useState(0)

  const current = useMemo(() => pagesData[pageIndex], [pageIndex])
  const isFirst = pageIndex === 0
  const isLast = pageIndex === pagesData.length - 1

  const goPrev = () => !isFirst && setPageIndex((i) => Math.max(0, i - 1))
  const goNext = () => !isLast && setPageIndex((i) => Math.min(pagesData.length - 1, i + 1))
  const goTo = (i) => setPageIndex(i)

  return (
    <main className="w-full min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center text-gray-900">
            Our stories
          </h1>
          <div className="inline-flex items-center gap-2">
            <span className="text-xs text-gray-500">Page</span>
            <span className="text-sm font-medium text-blue-700">
              {pageIndex + 1} / {pagesData.length}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <img
              key={current.id}
              src={current.image}
              alt={current.title}
              className="h-[900px] sm:h-[500px] w-full object-cover transition-all duration-500 ease-out opacity-0 [animation:fade-in_.6s_ease-out_forwards]"
            />
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
            <div>
              <h2
                key={`title-${current.id}`}
                className="text-xl sm:text-2xl font-semibold text-gray-900 transition-all duration-500 ease-out opacity-0 [animation:slide-up_.5s_ease-out_forwards]"
              >
                {current.title}
              </h2>
              <p
                key={`desc-${current.id}`}
                className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed transition-all duration-500 ease-out opacity-0 [animation:slide-up_.6s_.1s_ease-out_forwards]"
              >
                {current.description}
              </p>
            </div>

            <nav className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                disabled={isFirst}
                aria-label="Previous page"
                className="inline-flex items-center gap-2 rounded-lg border border-[#1A74ED] bg-[#1A74ED] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1A74ED]/30 disabled:cursor-not-allowed disabled:border-blue-200 disabled:bg-blue-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Previous
              </button>

              <div className="flex items-center gap-2" aria-label="Pagination">
                {pagesData.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => goTo(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className={
                      "h-8 min-w-8 rounded-md border px-2 text-xs font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 " +
                      (i === pageIndex
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-blue-200 bg-white text-blue-700 hover:bg-blue-50")
                    }
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                disabled={isLast}
                aria-label="Next page"
                className="inline-flex items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-200 disabled:bg-blue-200"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </nav>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {current.testimonials.map((t, idx) => (
              <div key={idx} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <img src={t.avatar} alt={`${t.name} avatar`} className="h-12 w-12 aspect-square shrink-0 rounded-full object-cover ring-2 ring-blue-100" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{`"${t.quote}"`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slide-up { from { transform: translateY(8px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </main>
  )
}


