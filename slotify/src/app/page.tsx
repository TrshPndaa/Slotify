"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const togglePopup = (id: string) => {
    setActivePopup(activePopup === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Pink circular accents */}
      <div className="absolute top-[100px] right-[120px] w-[80px] h-[80px] rounded-full bg-pink-300/80" />
      <div className="absolute bottom-[150px] left-[80px] w-[100px] h-[100px] rounded-full bg-pink-300/80" />
      <div className="absolute bottom-[50px] right-[180px] w-[90px] h-[90px] rounded-full bg-pink-300/80" />
      <div className="absolute top-[180px] left-[140px] w-[70px] h-[70px] rounded-full bg-pink-300/80" />
      {/* Navigation */}
      <nav className="p-6 flex justify-between">
        <div className="flex gap-8">
          <Link href="/register" className="text-gray-600 hover:text-gray-900 transition-colors">
            REGISTER WITH US
          </Link>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">BOOK WITH A BUSINESS</button>
        </div>
        <div>
          <Link href="/dev" className="text-gray-600 hover:text-gray-900 transition-colors">
            DEVELOPMENT ROADMAP
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center px-4 pt-16 pb-32 relative z-10">
        <h1 className="text-6xl tracking-tight text-gray-900 mb-6">
          <span className="font-light">S</span>
          <span className="font-bold">LO</span>
          <span className="font-light">TIFY</span>
        </h1>
        <p className="text-lg text-gray-600 tracking-wider font-light mb-12">
          THE BEST BOOKING TOOL OUT THERE
        </p>
        <div className="relative">
          <div className="flex gap-12 text-gray-600">
            <button 
              onClick={() => togglePopup('whyUs')}
              className="hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              WHY GO US?
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center">?</span>
            </button>
            <button 
              onClick={() => togglePopup('features')}
              className="hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              FEATURES
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center">?</span>
            </button>
            <button 
              onClick={() => togglePopup('whoWeAre')}
              className="hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              WHO WE ARE
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center">?</span>
            </button>
          </div>

          <div id="whyUs" className={`${activePopup === 'whyUs' ? '' : 'hidden'} absolute top-12 left-1/2 -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-96 text-base text-gray-700`}>
            Slotify is a cost-effective booking solution built with businesses in mind. We prioritize providing value to our users over maximizing profits, making professional booking tools accessible to everyone.
          </div>

          <div id="features" className={`${activePopup === 'features' ? '' : 'hidden'} absolute top-12 left-1/2 -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-96 text-base text-gray-700`}>
            Multiple pricing plans including a free tier, intuitive booking management, customizable scheduling options, and business-focused features developed by someone who understands your needs.
          </div>

          <div id="whoWeAre" className={`${activePopup === 'whoWeAre' ? '' : 'hidden'} absolute top-12 left-1/2 -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-96 text-base text-gray-700`}>
            We&apos;re a startup founded by a single developer with a mission to make professional booking tools accessible to businesses of all sizes. Our business-first approach means we focus on your success.
          </div>
        </div>
      </main>
    </div>
  );
}
