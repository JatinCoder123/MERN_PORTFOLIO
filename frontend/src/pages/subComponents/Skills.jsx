import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
const Skills = () => {
  const [skills, setSkills] = useState(null);
  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "  https://mern-portfolio-fawn.vercel.app/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1
        className="text-tubeLight-effect  text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
      lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit"
      >
        SKILLS
      </h1>
      {skills ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills &&
            skills.map((element) => {
              return (
                <Card
                  className="p-5  justify-center items-center gap-3"
                  key={element._id}
                >
                  <div className="flex flex-col items-center w-1/2">
                    <img
                      src={element.icon && element.icon.url}
                      alt="skill"
                      className="  mb-2"
                    />
                    <p className="text-muted-foreground text-center text-sm">
                      {element.title}
                    </p>
                  </div>
                  {/* <div className="flex flex-col w-3/4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">
                      {element.proficiency}%
                    </span>
                  </div>
                  <Progress value={element.proficiency} />
                </div> */}
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

export default Skills;
