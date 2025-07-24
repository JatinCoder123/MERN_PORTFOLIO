import { cn } from "../lib/utils";
import { Button } from "../components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  clearAllForgotPasswordErrors,
  forgotPass,
} from "../store/slices/forgotPassword";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPass(email));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (message) {
      toast.success(message);
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, message, isAuthenticated]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>
                Enter your email below to send reset password request to your
                account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Link
                        to="/login"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Remember Password?
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {loading ? (
                      <SpecialLoadingButton content="Sending..." width="1" />
                    ) : (
                      <Button
                        type="submit"
                        className="w-full"
                        onClick={handleForgotPassword}
                      >
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
