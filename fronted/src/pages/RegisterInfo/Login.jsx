// import Image from "next/image";
// import Link from "next/link"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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
        toast.success(res.data && res.data.message);
        console.log(res.data.message);
        // setAuth({
        //   ...auth,
        //   user: res.data.user,
        //   token: res.data.token,
        // });
        // localStorage.setItem("auth", JSON.stringify(res.data));

        navigate("/");
      } else {
        toast.error(res.data.message);
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
}
