import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label.jsx";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Image } from "lucide-react";
import {
  addProject,
  clearAllProjectsErrors,
  getAllProjects,
  resestProjects,
} from "../../store/slices/projectSlice";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBanner(file);
      setProjectBannerPreview(reader.result);
    };
  };
  const { loading, message, error } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const handleAddProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectBanner", projectBanner);
    dispatch(addProject(formData));
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
  }, [error, dispatch, message, loading]);
  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form className="w-[100%] px-5 md:w-[1000px]" onSubmit={handleAddProject}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
              ADD A NEW PROJECT
            </h2>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Project
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
                  Description
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Textarea
                      placeholder="Feature 1. Feature 2. Feature 3."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Technologies Used In This Project
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Textarea
                      placeholder="HTML,CSS,Javascript,Bootstrap"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Stack
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select
                      value={stack}
                      onValueChange={(selectedValue) => setStack(selectedValue)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Project Stack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Stack">Full Stack</SelectItem>
                        <SelectItem value="MERN">MERN</SelectItem>
                        <SelectItem value="MEAN">MEAN</SelectItem>
                        <SelectItem value="MEVN">MEVN</SelectItem>
                        <SelectItem value="NEXT.JS">NEXT.JS</SelectItem>
                        <SelectItem value="REACT.JS">REACT.JS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Deployed
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select
                      value={deployed}
                      onValueChange={(selectedValue) =>
                        setDeployed(selectedValue)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Is this project deployed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Github Repository Link
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      placeholder="Paste Your Github Repository Link Here"
                      value={gitRepoLink}
                      onChange={(e) => setGitRepoLink(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Project Link
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      placeholder="Paste Your Deployed Project  Link Here"
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <Label className="block text-sm/6 font-medium text-gray-900">
                  Project Banner
                </Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {projectBannerPreview ? (
                      <img
                        src={projectBannerPreview && ` ${projectBannerPreview}`}
                        alt="icon"
                        className="mx-auto h-70 text-gray-300"
                        viewBox="0 0 24 24"
                      />
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
                          onChange={handleProjectBanner}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <SpecialLoadingButton content="Adding" />
          ) : (
            <Button type="submit" className="w-56">
              Add Project
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProject;
