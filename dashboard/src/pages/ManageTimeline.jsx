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
import { Trash2 } from "lucide-react";

const ManageTimeline = () => {
  const { loading, message, error, timeline } = useSelector(
    (state) => state.timeline
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resestTimeline());
      dispatch(getAllTimeline());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [loading, error, dispatch, message]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs value="timeline">
        <TabsContent value="timeline">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Timeline</CardTitle>
              <Link to={"/"}>
                <Button>Return to Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="hidden md:table-cell">From</TableHead>
                    <TableHead className="hidden md:table-cell">To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
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
                          <TableCell className="hidden md:table-cell">
                            {element.description}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {element.timeline.from}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {element.timeline.to
                              ? element.timeline.to
                              : "Present"}
                          </TableCell>
                          <TableCell className="flex justify-end">
                            <button
                              onClick={() => handleDeleteTimeline(element._id)}
                              className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
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
  );
};

export default ManageTimeline;
