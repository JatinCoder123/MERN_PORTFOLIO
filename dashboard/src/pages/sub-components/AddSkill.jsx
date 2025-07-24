import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSkill,
  clearAllSkillsErrors,
  getAllSkills,
  resestSkills,
} from "../../store/slices/skillSlice";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label.jsx";

import SpecialLoadingButton from "./SpecialLoadingButton";
import { Button } from "../../components/ui/button";
import { Image } from "lucide-react";

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [icon, setIcon] = useState("");
  const [iconPreview, setIconPreview] = useState("");
  const handleIcon = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setIcon(file);
      setIconPreview(reader.result);
    };
  };
  const { loading, message, error } = useSelector((state) => state.skills);
  const dispatch = useDispatch();
  const handleAddSkill = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("icon", icon);
    dispatch(addSkill(formData));
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
  }, [error, dispatch, message, loading]);
  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form className="w-[100%] px-5 md:w-[650px]" onSubmit={handleAddSkill}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
              ADD A NEW SKILL
            </h2>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Skill
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Proficiency
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      placeholder="30"
                      value={proficiency}
                      onChange={(e) => setProficiency(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <Label className="block text-sm/6 font-medium text-gray-900">
                  Skill Icon
                </Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {iconPreview ? (
                      <img src={iconPreview &&` ${iconPreview}`} alt="icon" className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" />
                    ) : (
                      <Image
                        aria-hidden="true"
                        className="mx-auto size-12 text-gray-300"
                      />
                    )}

                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                        onChange={handleIcon}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">
                      PNG, JPG, GIF up to 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <SpecialLoadingButton content="Adding" />
          ) : (
            <Button type="submit" className="w-full">
              Add Skill
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
