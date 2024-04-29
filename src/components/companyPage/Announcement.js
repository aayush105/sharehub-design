import React from "react";
import NoDataFound from "@/images/no_data_found.png";
import Image from "next/image";

const Announcements = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full min-h-[345px]">
      <h1 className="text-3xl font-bold mb-4">Announcement</h1>
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center mt-8">
          <Image
            src={NoDataFound}
            alt="No Data Available"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Announcements;
