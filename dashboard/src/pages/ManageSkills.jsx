import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resestTimeline,
} from "../store/slices/timelineSlice.js";
import { toast } from "react-toastify";
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
import { Car, CarFront, Trash2 } from "lucide-react";
import {
  clearAllSkillsErrors,
  deleteSkill,
  getAllSkills,
  resestSkills,
  updateSkill,
} from "../store/slices/skillSlice.js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip.jsx";
import { Label } from "../components/ui/label.jsx";
import { Input } from "../components/ui/input.jsx";

const ManageSkills = () => {
  const { loading, message, error, skills } = useSelector(
    (state) => state.skills
  );
  const {isAuthenticated} = useSelector(state=>state.user);
  const navigateTo=useNavigate()
  const dispatch = useDispatch();
  const [newProficiency, setNewProficiency] = useState(1);

  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };
  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
  };
  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillsErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resestSkills());
      dispatch(getAllSkills());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [loading, error, dispatch, message]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs value="skill">
        <TabsContent value="skill">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:ite">
              <CardTitle>Manage Your Skills</CardTitle>
              <Link to={"/"}>
                <Button className={"w-fit"}>Return to Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {skills && skills.length > 0 ? (
                skills.map((element) => {
                  return (
                    <Card key={element._id}>
                      <CardHeader className="text-3xl font-bold items-center justify-between flex-row">
                        {element.title}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Trash2
                                className="h-5 w-5 hover:text-red-600"
                                onClick={() => handleDeleteSkill(element._id)}
                              />
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              style={{ color: "red" }}
                            >
                              Delete
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardHeader>
                      <CardFooter>
                        <Label className="text-2xl mr-2">Proficiency</Label>
                        <Input
                          type="number"
                          defaultValue={element.proficiency}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onBlur={() => handleUpdateSkill(element._id)}
                        />
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <CardTitle className="text-3xl overflow-y-hidden">
                  You have not added any skill.
                </CardTitle>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
