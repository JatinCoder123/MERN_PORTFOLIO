import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card.jsx";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs.jsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table.jsx";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  clearAllApplicationErrors,
  deleteApplication,
  getAllApplication,
  resestApplication,
} from "../../store/slices/applicationSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "../sub-components/SpecialLoadingButton";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.projects);
  const { skills } = useSelector((state) => state.skills);
  const { applications } = useSelector((state) => state.applications);
  const { timeline } = useSelector((state) => state.timeline);
  const [applicationId, setApplicationId] = useState("");
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.applications
  );

  const handleDeleteApplication = (id) => {
    setApplicationId(id);
    dispatch(deleteApplication(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resestApplication());
      dispatch(getAllApplication());
    }
  }, [loading, error, dispatch, message]);
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {user.aboutMe}
                </CardDescription>
              </CardHeader>
              <CardFooter className="px-7 flex items-center justify-between flex-row">
                <Link
                  to={user.portfolioURL && user.portfolioURL}
                  target="_blank"
                >
                  <Button >Visit Portfolio</Button>
                </Link>
                <Link
                  to={"/manage/certificate"}
                >
                  <Button >Manage Certificates</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-center ">
              <CardHeader className="pb-2">
                <CardTitle>Projects Completed</CardTitle>
                <CardTitle className="text-6xl">
                  {projects && projects.length}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={"/manage/projects"}>
                  <Button>Manage Projects</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-center ">
              <CardHeader className="pb-2">
                <CardTitle>Skills</CardTitle>
                <CardTitle className="text-6xl">
                  {skills && skills.length}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={"/manage/skills"}>
                  <Button>Manage Skills</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <Tabs value="projects">
            <TabsContent value="projects">
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Stack
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Deployed
                        </TableHead>
                        <TableHead>Update</TableHead>
                        <TableHead className="text-right">Visit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects && projects.length > 0 ? (
                        projects.map((element) => {
                          return (
                            <TableRow className="bg-accent" key={element._id}>
                              <TableCell>
                                <div className="font-semibold">
                                  {element.title}
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {element.stack}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {element.deployed}
                              </TableCell>
                              <TableCell>
                                <Link to={`/update/project/${element._id}`}>
                                  <Button>Update</Button>
                                </Link>
                              </TableCell>
                              <TableCell className="text-right">
                                <Link
                                  to={
                                    element.projectLink
                                      ? `${element.projectLink}`
                                      : ""
                                  }
                                  target="_blank"
                                >
                                  <Button>Visit</Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell className="text-3xl overflow-hidden">
                            You have not added any project.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          

          {/* Managing Skills */}
          <Tabs value="skills">
            <TabsContent value="skills">
              <Card>
                <CardHeader className="px-7 gap-3">
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  {skills && skills.length > 0 ? (
                    skills.map((element) => {
                      return (
                        <Card key={element._id}>
                          <CardHeader>{element.title}</CardHeader>
                          <CardFooter>
                            <p className="p-5">{element.proficiency}</p>
                            <Progress value={element.proficiency} />
                          </CardFooter>
                        </Card>
                      );
                    })
                  ) : (
                    <p className="text-3xl overflow-hidden">
                      You have not added any skill.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* View And Manage Applications and Timelines */}
          <Tabs value="application">
            <TabsContent
              value="application"
              className="grid min-[1050px]:grid-cols-2 gap-4"
            >
              {/* Manage SoftwareApplication */}
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Software Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="md:table-cell">Icon</TableHead>
                        <TableHead className="md:table-cell">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications && applications.length > 0 ? (
                        applications.map((element) => {
                          return (
                            <TableRow className="bg-accent" key={element._id}>
                              <TableCell>{element.name}</TableCell>
                              <TableCell>
                                <img
                                  src={element.icon && ` ${element.icon.url}`}
                                  alt={element.name}
                                  className="w-7 h-7"
                                />
                              </TableCell>

                              <TableCell>
                                {loading && applicationId === element._id ? (
                                  <SpecialLoadingButton content={"Deleting"} />
                                ) : (
                                  <Button
                                    onClick={() =>
                                      handleDeleteApplication(element._id)
                                    }
                                  >
                                    Delete
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell className="text-3xl overflow-hidden">
                            You have not added any application.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Manage Timelines */}
              <Card>
                <CardHeader className="px-7 flex items-center justify-between flex-row">
                  <CardTitle>Timeline</CardTitle>
                  <Link to={"/manage/timeline"}>
                    <Button>Manage Timeline</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="md:table-cell">From</TableHead>
                        <TableHead className="md:table-cell text-right">
                          To
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeline && timeline.length > 0 ? (
                        timeline.map((element) => {
                          return (
                            <TableRow className="bg-accent" key={element._id}>
                              <TableCell className="font-medium">
                                {element.title}
                              </TableCell>
                              <TableCell className="md:table-cell">
                                {element.timeline.from}
                              </TableCell>
                              <TableCell className="md:table-cell text-right">
                                {element.timeline.to
                                  ? element.timeline.to
                                  : "Present"}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell className="text-3xl overflow-hidden">
                            You have not added any timeline.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
