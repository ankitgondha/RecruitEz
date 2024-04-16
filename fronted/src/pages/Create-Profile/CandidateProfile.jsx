import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { pdfjs } from "react-pdf";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const CandidateProfile = () => {
  const [file, setFile] = useState("");
  const [pdfFile, setPdfFile] = useState(null);



  const getPdf = async () => {
    const result = await axios.get("http://localhost:8080/resumes/get-files");
    console.log(result.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);

    const result = await axios.post(
      "http://localhost:8080/resumes/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
      
    }
  };

  const [name, setName] = useState("");
  const [gender, setGender] = useState("0");
  const [resume, setResume] = useState("");

  // console.log(resume);

  const navigate = useNavigate();

  const handleGender = (event) => {
    const value = parseInt(event.target.value); // Convert value to integer
    setGender(value); // Update role state based on selected value
  };

  console.log(name);

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold mb-4">Create Profile</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="name">Name</Label>
              </div>
              <Input
                id="name"
                type="text"
                required
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex my-2">
              <div className="">
                <label htmlFor="selectGender" className="block mb-2">
                  Select Gender
                </label>

                {/* <div className="flex flex-row"> */}
                <div id="selectGender" className="flex space-x-4">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="0"
                    checked={gender === 0}
                    onChange={handleGender}
                    className="form-radio text-blue-500"
                  />
                  <label htmlFor="male" className="cursor-pointer">
                    Male
                  </label>

                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="1"
                    checked={gender === 1}
                    onChange={handleGender}
                    className="form-radio text-blue-500"
                  />
                  <label htmlFor="female" className="cursor-pointer">
                    Female
                  </label>

                  <input
                    type="radio"
                    id="notTobeDisclosed"
                    name="gender"
                    value="2"
                    checked={gender === 2}
                    onChange={handleGender}
                    className="form-radio text-blue-500"
                  />
                  <label htmlFor="notTobeDisclosed" className="cursor-pointer">
                    Not to be Disclosed
                  </label>
                </div>
              </div>
            </div>

            {/* </div> */}

            {/* <div>
              <Select>
                <div className="flex items-center mb-3">
                  <Label htmlFor="gender">Gender</Label>
                </div>
                <SelectTrigger className="w-[180px]">
                  <SelectValue id="gender" placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="noDisclose">
                    Not to be disclosed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="resume">Upload Resume</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf"
                encType="multipart/form-data"
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log(file)
                  setResume(file);
                  // console.log(resume);
                }}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Upload Profile Pic</Label>
              <Input id="picture" type="file" />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Intro</Label>
              <Textarea
                placeholder="Write something about yourself"
                id="message"
              />
            </div>

            <Button onClick={handleSubmit} type="submit" className="w-full">
              Create Profile
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block ">
        <img
          src="./images/illustration.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-4/5 w-4/5 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default CandidateProfile;
