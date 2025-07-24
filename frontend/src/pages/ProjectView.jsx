import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star } from "lucide-react";
import Loading from "./subComponents/Loading";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(` http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setShow(true);
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(",");

  const navigateTo = useNavigate();
  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

  return (
    <>
      <div className=" mt-5 min-h-screen w-full flex justify-center items-center  p-6">
        {show ? (
          <Card className="w-full max-w-4xl shadow-2xl rounded-2xl  ">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold ">{title}</CardTitle>
              <Button onClick={handleReturnToPortfolio}>
                Return to Portfolio
              </Button>
            </CardHeader>
            <img
              src={projectBanner ? projectBanner : "/vite.svg"}
              alt="Project"
              className="w-full  object-cover"
            />

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold ">Description:</h4>
                <div className="mt-3 space-y-2">
                  {descriptionList.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Star
                        className="text-yellow-500 mt-1 fill-yellow-400"
                        size={18}
                      />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <h4 className="font-semibold">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2 mt-3">
                  {technologiesList.map((tech, index) => (
                    <li key={index}>
                      <Badge variant="outline" className={"text-15px"}>
                        {tech}
                      </Badge>
                    </li>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold ">Stack:</h4>
                <p className="text-sm text-gray-200">{stack}</p>
              </div>

              <div>
                <h4 className="font-semibold">Deployment:</h4>
                {deployed.toLowerCase() === "yes" ? (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    ✅ Deployed
                  </p>
                ) : (
                  <p className="text-sm text-red-400 font-medium mt-1">
                    ❌ Not Deployed
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  <a
                    href={gitRepoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                    GitHub Repo
                  </a>
                </Button>
                <Button
                  asChild
                  variant="default"
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  <a
                    href={projectLink && projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Live Project
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default ProjectView;
