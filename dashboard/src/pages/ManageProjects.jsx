import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllProjectsErrors,
  deleteProject,
  getAllProjects,
  resestProjects,
} from "../store/slices/projectSlice";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
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
import { Eye, Pen, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip.jsx";

const ManageProjects = () => {
  const { projects, message, loading, error } = useSelector(
    (state) => state.projects
  );
  const {isAuthenticated} = useSelector(state=>state.user);
  const navigateTo=useNavigate()
  const dispatch = useDispatch();
  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectsErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resestProjects());
      dispatch(getAllProjects());
    }
     if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [loading, error, dispatch, message]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs value="project">
        <TabsContent value="project">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Projects</CardTitle>
              <Link to={"/"}>
                <Button>Return to Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">Banner</TableHead>
                    <TableHead className="font-medium">Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Stack
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Deployed
                    </TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects && projects.length > 0 ? (
                    projects.map((element) => {
                      return (
                        <TableRow className="bg-accent" key={element._id}>
                          <TableCell>
                            <div>
                              <img
                                src={
                                  element.projectBanner &&
                                  element.projectBanner.url
                                }
                                alt={element.title}
                                className="h-20"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {element.title}
                          </TableCell>
                          <TableCell className="hidden md:table-cell max-w-[200px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis ">
                            {element.description}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {element.stack}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {element.deployed}
                          </TableCell>
                          <TableCell className="flex flex-row items-center gap-3 h-24 justify-end">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link to={`/view/project/${element._id}`}>
                                    <button className="border-green-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-green-600 hover:text-slate-950 hover:bg-green-600">
                                      <Eye className="h-5 w-5" />
                                    </button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  View
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link to={`/update/project/${element._id}`}>
                                    <button className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400 hover:text-slate-950 hover:bg-yellow-400">
                                      <Pen className="h-5 w-5" />
                                    </button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  Edit
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() =>
                                      handleDeleteProject(element._id)
                                    }
                                    className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  Delete
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell className="text-3xl overflow-hidden">
                        You have not added any Project.
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
  );
};

export default ManageProjects;
