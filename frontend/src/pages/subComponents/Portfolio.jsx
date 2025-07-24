import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "  https://mern-portfolio-fawn.vercel.app/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.project);
    };
    getMyProjects();
  }, []);
  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">PROJECTS</span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      {projects ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {viewAll
            ? projects &&
              projects.map((element) => {
                return (
                  <Card
                    className=" h-fit p-2 flex flex-col justify-center items-center gap-2"
                    key={element._id}
                  >
                    <div className=" relative w-full md:max-w-[350px] h-auto  rounded-md flex justify-center items-center">
                      <img
                        src={element.projectBanner && element.projectBanner.url}
                        alt={element.title}
                        className="w-full   md:h-45 object-cover rounded"
                      />
                      <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-md p-3 rounded-xl shadow-md hover:scale-105 transition cursor-pointer">
                        <Link to={element.projectLink} target="_blank">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-gray-700"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                          </svg>
                        </Link>
                      </div>

                      <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-md p-3 rounded-xl shadow-md hover:scale-105 transition cursor-pointer">
                        <Link to={`/project/${element._id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-gray-700"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })
            : projects &&
              projects.slice(0, 9).map((element) => {
                return (
                  <Card
                    className=" h-fit p-2 flex flex-col justify-center items-center gap-2"
                    key={element._id}
                  >
                    <div className=" relative w-full md:max-w-[350px] h-auto  rounded-md flex justify-center items-center">
                      <img
                        src={element.projectBanner && element.projectBanner.url}
                        alt={element.title}
                        className="w-full   md:h-45 object-cover rounded"
                      />
                      <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-md p-3 rounded-xl shadow-md hover:scale-105 transition cursor-pointer">
                        <Link to={element.projectLink} target="_blank">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-gray-700"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                          </svg>
                        </Link>
                      </div>

                      <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-md p-3 rounded-xl shadow-md hover:scale-105 transition cursor-pointer">
                        <Link to={`/project/${element._id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-gray-700"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
        </div>
      ) : (
        <Loading />
      )}

      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
