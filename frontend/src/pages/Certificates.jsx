import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./subComponents/Loading";

const Certificates = () => {
  const [certificates, setCertificates] = useState(null);
  useEffect(() => {
    const getMyCertificates = async () => {
      const { data } = await axios.get(
        "  https://mern-portfolio-fawn.vercel.app/api/v1/certificate/getall",
        { withCredentials: true }
      );
      setCertificates(data.certificates);
    };
    getMyCertificates();
  }, []);
  return (
    <div>
      <div className="relative mb-12">
        <div className="flex items-center justify-center gap-2 sm:gap-4 w-full px-4 flex-wrap">
          <div className="flex-grow border-t border-gray-500"></div>
          <h1
            className="text-[1.5rem] sm:text-[2.25rem] md:text-[3rem] 
    lg:text-[3.8rem] font-extrabold tracking-[3px] sm:tracking-[8px] 
    text-center leading-tight"
            style={{
              background: "hsl(222.2 84% 4.9%)",
            }}
          >
            MY <span className="text-tubeLight-effect">CERTIFICATES</span>
          </h1>
          <div className="flex-grow border-t border-gray-500"></div>
        </div>

        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      {certificates ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {certificates &&
            certificates.map((element) => {
              return (
                <Card
                  className="w-full flex flex-col sm:flex-row p-4 sm:p-6rounded-2xl shadow-lg "
                  key={element._id}
                >
                  {/* Image Section */}
                  <div className="w-full  rounded-xl">
                    <Link to={element.image.url}>
                      <img
                        src={element.image.url}
                        alt="Certificate"
                        className="w-full h-full object-contain"
                      />
                    </Link>
                  </div>

                  {/* Content Section */}
                  <CardContent className="w-full flex flex-col justify-start text-left gap-2 p-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {element.title}
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {element.description}
                    </p>
                  </CardContent>
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

export default Certificates;
