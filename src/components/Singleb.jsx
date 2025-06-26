import React from "react";
import { Link } from "react-router-dom";
import img from "./img.png";
import NewsletterFooter from "./Footer";

export default function FamilyReunion() {
  return (
    <>
    <div className="w-screen h-6xxl bg-[#f5f6fa] flex justify-center items-start overflow-y-auto py-6 px-4">
      <div className="bg-white w-full max-w-5xxl rounded-2xl shadow-md p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Link to="/all">
              <div className="h-7 w-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow hover:bg-blue-700 transition cursor-pointer">
                &lt;
              </div>
            </Link>
            <span className="text-sm font-medium text-gray-600">ACTIVITY</span>
          </div>
          <img
            src={img}
            alt="Family Reunion"
            className="w-full h-96 object-cover rounded-xl shadow-sm"
          />

          <h1 className="text-xl font-bold text-gray-800 uppercase leading-snug">
            A HEART-WARMING FAMILY REUNION: EMBRACING TOGETHERNESS !<br />
            EMBARKING CHERISHED MOMENTS TOGETHER
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
            exercitationem alias! Minima mollitia soluta totam, numquam
            explicabo fugit officiis, qui voluptatibus laudantium perferendis
            excepturi fuga? Quaerat animi recusandae itaque. Molestias. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Ipsa, quas!
            Magnam fugiat inventore sunt exercitationem sed, distinctio expedita
            aperiam culpa, quia animi neque sit omnis ipsam. Adipisci ab
            blanditiis molestias. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Expedita, quae eligendi. Exercitationem id neque
            rerum. Consectetur cumque distinctio saepe delectus excepturi ipsum.
            Aperiam perferendis quis tenetur fugiat facere, eligendi ea. Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Est cum
            voluptatem id libero quasi. Itaque, voluptatibus perspiciatis!
            Commodi animi, quam, reiciendis voluptatem consectetur neque id
            voluptates excepturi, cum quasi placeat. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Accusamus aliquid distinctio esse vel
            quasi maiores ipsa deserunt assumenda impedit atque quisquam soluta
            consectetur facilis perferendis amet perspiciatis fugit, ullam
            necessitatibus? Amidst The Hustle And Bustle Of Our Daily Lives,
            This Family Reunion Serves As A Reminder Of The Importance Of Taking
            A Pause And Embracing The Company Of Those Who Matter Most. <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
            beatae, quisquam voluptatum! Nostrum eos, nullam dolorem aut fugiat
            est fugit. Suscipit accusamus vel atque libero, provident suscipit
            itaque! A nobis expedita dolore iusto natus fugit facilis
            reprehenderit. Aliquam nostrum suscipit est amet eos.
          </p>

          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet. Felisensagna elota felisferrosad in
            Promora a ultricies in diam. Sed posuere dapibus neque. Et cursus
            faucibus tortor neque egestas augue eu vulputate magna. Enut eros et
            erat posuere dapibus.
          </p>

          <img
            src={img}
            alt="Family Celebration"
            className="w-full h-96 object-cover rounded-l shadow-sm"
          />

          <p className="text-gray-600 text-sm leading-relaxed">
            Amidst The Hustle And Bustle Of Our Daily Lives, This Family Reunion
            Serves As A Reminder Of The Importance Of Taking A Pause And
            Embracing The Company Of Those Who Matter Most. Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Nemo beatae, quisquam
            voluptatum! Nostrum eos, nullam dolorem aut fugiat est fugit.
            Suscipit accusamus vel atque libero, provident suscipit itaque! A
            nobis expedita dolore iusto natus fugit facilis reprehenderit.
          </p>

          <div className="flex items-center pt-4">
            <img
              src={img}
              alt="Devon Lane"
              className="w-10 h-10 rounded-full object-cover mr-4"
            />
            <p className="text-sm font-medium text-gray-700">BERWA S.</p>
          </div>
        </div>
      </div>
    </div>
    <div style={{ flexShrink: 0 }}>
    <NewsletterFooter/>
    </div>
 
    </>
  );
}
