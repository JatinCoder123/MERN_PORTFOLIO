import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SpecialLoadingButton from "../sub-components/SpecialLoadingButton.jsx";

import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updatePassword,
} from "../../store/slices/userSlice.js";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const { loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmPassword));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
     if (message) {
      toast.success(message);
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
   
  }, [dispatch, error, isUpdated, loading]);
  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="mb-5">Update Your Dashboard Password </p>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label>Current Password</Label>
              <Input
                type="text"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                placeholder="Confirm New Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              {loading ? (
                <SpecialLoadingButton content="Updating..." width={1} />
              ) : (
                <Button className="w-full" onClick={handleUpdatePassword}>
                  Update Password
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
