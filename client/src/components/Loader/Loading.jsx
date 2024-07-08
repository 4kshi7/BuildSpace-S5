import React from "react";

export const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-customGreen to-customBlack text-white">
      <div class="rounded-full h-20 w-20 bg-[#062719] animate-ping"></div>
    </div>
  );
};
