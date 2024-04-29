import React from "react";
import NoDataFound from "@/images/no-data-found.png";
import Image from "next/image";

const Announcements = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <Image
          src={NoDataFound}
          alt="No Data Available"
          margin="auto"
          width={300}
          height={300}
        />
        <p className="text-gray-400">No Data Available</p>
      </div>
    </div>
  );
};

export default Announcements;
