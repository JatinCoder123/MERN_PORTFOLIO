import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Loading from "./Loading";

const Hero = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "  https://mern-portfolio-fawn.vercel.app/api/v1/user/me/portfolio",
        { withCredentials: true }
      );

      setUser(data.user[0]);
    };

    getMyProfile();
  }, []);
  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-400 rounded-full h-2 w-2"></span>
          <p>Online</p>
        </div>
        {user ? (
          <>
            {" "}
            <h1
              className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
      md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4"
            >
              Hey, I'm {user.fullName}
            </h1>
            <h1
              className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
      sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]"
            >
              <Typewriter
                words={["FULL STACK DEVELOPER", "FREELANCER"]}
                loop={50}
                cursor
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
            <div
              className="w-fit px-5 py-2 hover:bg-slate-50 bg-slate-300 rounded-[20px] flex gap-5 
      items-center mt-4 md:mt-8 lg:mt-10"
            >
              <Link to={user.leetcodeURL} target="_blank">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-color-tal-revivo.png"
                />
              </Link>
              <Link to={user.instagramURL} target="_blank">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/fluency/48/instagram-new.png"
                  alt="instagram-new"
                />
              </Link>
              <Link to={user.facebookURL} target="_blank">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/color/48/facebook-new.png"
                  alt="facebook-new"
                />
              </Link>
              <Link to={user.linkedInURL} target="_blank">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/color/48/linkedin.png"
                  alt="linkedin"
                />
              </Link>
              <Link to={user.twitterURL} target="_blank">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios-filled/50/twitterx--v1.png"
                  alt="twitterx--v1"
                />
              </Link>
            </div>
            <div className="mt-4 md:mt-8 lg:mt-10  flex gap-3">
              <Link to={user.githubURL} target="_blank">
                <Button className="rounded-[30px] flex items-center gap-2 flex-row">
                  <span>
                    <img
                      width="40"
                      height="40"
                      src="https://img.icons8.com/clouds/100/github.png"
                      alt="github"
                    />
                  </span>
                  <span>Github</span>
                </Button>
              </Link>
              <Link to={user.resume && user.resume.url} target="_blank">
                <Button className="rounded-[30px] flex items-center gap-2 flex-row">
                  <span>
                    <img
                      width="40"
                      height="40"
                      src="https://img.icons8.com/clouds/100/resume.png"
                      alt="resume"
                    />
                  </span>
                  <span>Resume </span>
                </Button>
              </Link>
              <Link to={"/certificates"}>
                <Button className="rounded-[30px] flex items-center gap-2 flex-row">
                  <span>
                    <img
                      width="40"
                      height="40"
                      src="https://img.icons8.com/clouds/100/certificate.png"
                      alt="certificate"
                    />
                  </span>
                  <span>Certificates </span>
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-xl tracking-[2px]">
              Hi, I'm Jatin Verma — a passionate Full Stack Developer and
              Freelancer with hands-on experience in building responsive,
              scalable, and user-friendly web applications.
            </p>
          </>
        ) : (
          <Loading />
        )}

        <hr className="my-8 md::my-10 " />
      </div>
    </>
  );
};

export default Hero;
