import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs.jsx";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card.jsx";
import { Button } from "../../components/ui/button";

import SpecialLoadingButton from "./SpecialLoadingButton";
import {
  clearAllMessagesErrors,
  deleteMessage,
  getAllMessages,
  resestMessages,
} from "../../store/slices/messagesSlice";
import { toast } from "react-toastify";

const Messages = () => {
  const dispatch = useDispatch();
  const { messages, error, message, loading } = useSelector(
    (state) => state.messages
  );
  const [messageId, setMessageId] = useState("");

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessagesErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resestMessages());
      dispatch(getAllMessages());
    }
  }, [error, dispatch, message, loading]);
  return (
    <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
      <Tabs value="messages">
        <TabsContent value="messages">
          <Card>
            <CardHeader className="flex  justify-between items-center  ">
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {messages && messages.length > 0 ? (
                messages.map((element) => {
                  return (
                    <Card key={element._id} className="grid gap-2">
                      <CardDescription className="text-slate-950">
                        <span className="font-bold mr-2">Sender Name: </span>
                        {element.senderName}
                      </CardDescription>
                      <CardDescription className="text-slate-950">
                        <span className="font-bold mr-2">Email: </span>
                        {element.email}
                      </CardDescription>
                      <CardDescription className="text-slate-950">
                        <span className="font-bold mr-2">Message: </span>
                        {element.message}
                      </CardDescription>
                      <CardFooter className="justify-end">
                        {loading && messageId === element._id ? (
                          <SpecialLoadingButton
                            width={"w-32"}
                            content={"Deleting"}
                          />
                        ) : (
                          <Button
                            className="w-32"
                            onClick={() => handleMessageDelete(element._id)}
                          >
                            Delete
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <CardHeader>No Message Found!</CardHeader>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
