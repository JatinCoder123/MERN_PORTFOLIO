import React from "react";
import Hero from "./subComponents/Hero";
import MyApps from "./subComponents/MyApps";
import Timeline from "./subComponents/Timeline";
import Portfolio from "./subComponents/Portfolio";
import Skills from "./subComponents/Skills";
import About from "./subComponents/About";
import Contact from "./subComponents/Contact";

const Home = () => {
  return (
    <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
      <Hero />
      <Timeline />
      <About />
      <Skills />
      <Portfolio />
      <MyApps />
      <Contact />
    </article>
  );
};

export default Home;
