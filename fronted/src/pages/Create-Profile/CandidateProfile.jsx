import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

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
import axios from "axios";

const CandidateProfile = () => {
  // const [customFileName, setCustomFileName] = useState("");
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [currUser, setCurrUser] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [gender, setGender] = useState("0");
  const [resumeFile, setResumeFile] = useState(null);

  const handleResumeFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleProfileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  // const [customFileName, setCustomFileName] = useState("");
  // const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const DataLoader = async () => {
      console.log("came in useEffect");
      const candidateId = window.sessionStorage.getItem("userId");
      setUserId(candidateId);
      console.log(userId);
      const role = window.sessionStorage.getItem("userRole");
      setUserRole(role);

      const requestData = {
        userId: candidateId,
        role: role,
      };

      const apiUrl = `http://localhost:8080/users/userInfo/${candidateId}/${role}`;
      await axios
        .get(apiUrl, requestData)
        .then((response) => {
          // Handle successful response
          // console.log("User data:", response);
          setCurrUser(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching user data:", error);
        });
      // console.log("user useeffect is", user);

      console.log("User role:", userRole);

      console.log("Hit");
    };

    DataLoader();
  }, []);

  console.log(currUser);

  const [name, setName] = useState(currUser.name == null ? "" : currUser.name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(name);
    // console.log(companyName);

    const requestData = {
      role: userRole,
      name: name,
    };

    const formData = new FormData();

    // formData.append("profilPic", selectedFile);
    formData.append("file", resumeFile);
    // formData.append("role", userRole);
    // formData.append("company", companyName);
    formData.append("name", name);

    // Include custom filename
    // Include custom filename
    console.log(formData);

    // const apiUrl = `http://localhost:8080/users/updateCandidate/${userId}`;
    const apiUrl = `http://localhost:8080/users/updateCandidate/${userId}`;
    await axios
      .post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Handle successful response
        console.log("User data:", response);
        // setCurrUser(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user data:", error);
      });
  };

  if (!currUser) {
    return <h1>Loading</h1>;
  }

  // const handleCustomFileNameChange = (e) => {
  //   setCustomFileName(e.target.value);
  // };

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold mb-4">Update Profile</h1>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
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

            {/* <div className="flex my-2">
              <div className="">
                <label htmlFor="selectGender" className="block mb-2">
                  Select Gender
                </label>

            
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
            </div> */}

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="resume">Upload Resume</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf"
                encType="multipart/form-data"
                onChange={handleResumeFileChange}
              />
            </div>
            {/* 
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Upload Profile Pic</Label>
              <Input id="picture" type="file" onChange={handleProfileChange} />
            </div> */}

            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </form>
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
