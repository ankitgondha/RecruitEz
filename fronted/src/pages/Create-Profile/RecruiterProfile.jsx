import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RecruiterProfile = () => {
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const res = await axios.post(
    //     `${process.env.REACT_APP_API}/api/v1/auth/login`,
    //     { email, password }
    //   );

    //   if (res && res.data.success) {
    //     toast.success(res.data && res.data.message);
    //     // console.log(res.data.message);
    //     setAuth({
    //       ...auth,
    //       user: res.data.user,
    //       token: res.data.token,
    //     });
    //     localStorage.setItem("auth", JSON.stringify(res.data));

    //     navigate(location.state || "/");
    //   } else {
    //     toast.error(res.data.message);
    //   }
    // } catch (error) {
    //   // console.log(error);
    //   toast.error("Something went wrong");
    // }
  };

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold mb-4">Create Profile</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                // type="email"
                value={"email"}
                // registered email
                placeholder="m@example.com"
                disable
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="name">Name</Label>
              </div>
              <Input
                id="name"
                type="text"
                required
                placeholder="Enter Your Name"
              />
            </div>

            <div>
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
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="company-name">Company Name</Label>
              </div>
              <Input
                id="company-name"
                type="text"
                required
                placeholder="Enter Company Name"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Upload Profile Pic</Label>
              <Input id="picture" type="file" />
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

export default RecruiterProfile;
