// import Image from "next/image";
// import Link from "next/link"
import { Candidate } from "../../../../backend/models/candidateModel.js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import axios from "axios";
// import {updateUser} from "../../redux/actions/actions"
// import { useDispatch,useSelector } from "react-redux";

export function Login() {
  const { toast } = useToast();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hiut");
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      console.log(loginEmail, loginPassword);

      if (res && res.data.success) {
        // toast.success(res.data && res.data.message);

        console.log(res.data.message);
        console.log("Response data is", res.data);
        // console.log(res.data);

        const candidate = res.data.candidate;
        const token = res.data.token;

        // dispatch(updateUser(candidate));
        // console.log(candidate._id);
        // console.log(res.data.candidate);
        // setAuth({
        //   ...auth,
        //   user: res.data.user,
        //   token: res.data.token,
        // });
        // localStorage.setItem("auth", JSON.stringify(res.data));

        // const candidate = await Candidate.findOne({ email });
        // console.log(candidate);
        // navigate("/");
        // if (candidate) {
        //   navigate("/candidate-dashboard");
        // } else {
        //   navigate("/recruiter-dashboard");
        // }

        // console.log(role);
        // window.sessionStorage.setItem("userData", JSON.stringify(res.data));
        // const userData = window.sessionStorage.getItem("userData");
        // const userDataObject = JSON.parse(userData);
        // console.log("Hit");
        // console.log(userDataObject);

        if (candidate) {
          const userId = candidate._id;
          const userRole = candidate.role;

          // console.log(window.sessionStorage.getItem("user"));
          window.sessionStorage.setItem("userId", userId);
          window.sessionStorage.setItem("userRole", userRole);
          window.sessionStorage.setItem("token", token);

          navigate("/candidate-dashboard");
        } else {
          console.log("Hi from login");
          console.log(res.data);

          const userId = res.data.recruiter._id;
          const userRole = res.data.recruiter.role;

          // console.log(window.sessionStorage.getItem("user"));
          window.sessionStorage.setItem("userId", userId);
          window.sessionStorage.setItem("userRole", userRole);
          window.sessionStorage.setItem("token", token);

          navigate("/dashboard");
        }

        // navigate("/");
      } else {
        // toast.error(res.data.message);
        // console.log(res.data.message);
        toast({
          title: res.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong");
      toast({
        title: "something went wrong",
      });
    }
  };

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

                {/* **************** */}
                <p
                  //   href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Forgot your password?
                </p>
              </div>

              <Input
                id="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <Button onClick={handleSubmit} type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account? {/* ************* */}
            <p
              className="underline"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </p>
          </div>
        </div>
      </div>
      <div className="hidden bg-bgCol lg:block">
        <div className="h-full w-full ">
          <img
            src="./images/Login4.jpg"
            alt="Image"
            width=""
            height=""
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
}
