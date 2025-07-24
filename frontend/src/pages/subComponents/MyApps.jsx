import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const MyApps = () => {
  const [apps, setApps] = useState(null);
  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        " http://localhost:4000/api/v1/softwareApplication/getall",
        { withCredentials: true }
      );
      setApps(data.softwareApplications);
    };
    getMyApps();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        MY TOOLS
      </h1>
      {apps ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {apps &&
            apps.map((element) => {
              return (
                <Card
                  className=" h-fit p-5 flex flex-col justify-center items-center gap-2"
                  key={element._id}
                >
                  <div className="flex flex-col items-center w-1/2">
                    <img
                      src={element.icon && element.icon.url}
                      alt="skill"
                      className="mb-2 "
                    />
                    <p className="text-muted-foreground text-center">
                      {element.name}
                    </p>
                  </div>
                </Card>
              );
            })}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MyApps;
