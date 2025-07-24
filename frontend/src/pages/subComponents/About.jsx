import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
const About = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        " http://localhost:4000/api/v1/user/me/portfolio",
        { withCredentials: true }
      );
      setUser(data.user[0]);
    };
    getMyProfile();
  }, []);
  return (
    <>
      <div className="w-full flex flex-col overflow-x-hidden">
        <div className="relative">
          <h1
            className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
            style={{
              background: "hsl(222.2 84% 4.9%)",
            }}
          >
            ABOUT{" "}
            <span className="text-tubeLight-effect font-extrabold">ME</span>
          </h1>
          <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
        </div>
        {user ? (
          <div>
            <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
              <div className="flex justify-center items-center">
                <img
                  src={user.avatar ? user.avatar.url : "./vite.svg"}
                  alt="avatar"
                  className="bg-white p-2 sm:p-4  h-[240px] sm:h-[320px]"
                />
              </div>
              <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
                <p>
                  Hello, my name is Jatin Verma. I am a final-year B.Tech
                  student with a strong focus on full stack web development. As
                  a Freelancer and Developer, I have gained practical experience
                  building modern, scalable web applications using technologies
                  like the MERN stack.
                </p>
                <p>
                  My dedication and perseverance in timely delivery of work are
                  integral to me. I maintain the courage to face any challenges
                  for extended periods.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default About;
