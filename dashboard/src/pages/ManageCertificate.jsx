import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllCertificateErrors,
  deleteCertificate,
  getAllCertificate,
  resestCertificate,
} from "../store/slices/ceritficateSlice.js";
import { Tabs } from "@/components/ui/tabs.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table.jsx";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip.jsx";

const ManageCertificate = () => {
  const { certificates, message, loading, error } = useSelector(
    (state) => state.certificates
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteCertificate = (id) => {
    dispatch(deleteCertificate(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllCertificateErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resestCertificate());
      dispatch(getAllCertificate());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [loading, error, dispatch, message]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs value="certificate">
        <TabsContent value="certificate">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Certificate</CardTitle>
              <Link to={"/"}>
                <Button>Return to Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">Image</TableHead>
                    <TableHead className="font-medium">Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates && certificates.length > 0 ? (
                    certificates.map((element) => {
                      return (
                        <TableRow className="bg-accent" key={element._id}>
                          <TableCell>
                            <div>
                              <img
                                src={element.image && element.image.url}
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
                          <TableCell className="flex flex-row items-center gap-3 h-24 justify-end">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() =>
                                      handleDeleteCertificate(element._id)
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
                        You have not added any Certificate.
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

export default ManageCertificate;
