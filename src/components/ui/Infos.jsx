import React from "react";

function Infos({ info }) {
  if (!info) return null;

  return (
    <div className="relative bg-black w-full h-[60px] overflow-hidden mb-4 flex items-center rounded-md">
      <div className="absolute whitespace-nowrap animate-marquee text-white  font-bold px-6 text-2xl md:text-3xl">
        {info}
      </div>

      {/* Inline animation style (only needed once in the app) */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Infos;
