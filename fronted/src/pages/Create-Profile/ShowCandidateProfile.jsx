import React from "react";

import {
  Bell,
  File,
  CircleUser,
  ChevronRight,
  PlusCircle,
  Home,
  LineChart,
  Menu,
  Package,
  DollarSign,
  CreditCard,
  ListFilter,
  Activity,
  Package2,
  Search,
  ShoppingCart,
  Users,
  MoreHorizontal,
  CirclePlus,
  UserRoundCheck,
  Headset,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { ViewResume } from "../viewResume";

const ShowCandidateProfile = () => {
  const [userId, setUserId] = useState("");
  const [currUser, setCurrUser] = useState([]);
  const [userRole, setUserRole] = useState("");

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

  //   useEffect(() => {
  //     if (userId) {
  //       // Check if userId is truthy
  //       const fetchImg = async () => {
  //         try {
  //           const response = await axios.get(
  //             `http://localhost:8080/users/profileimg?userId=${userId}`,
  //             {
  //               responseType: "arraybuffer",
  //             }
  //           );

  //           // Convert ArrayBuffer to Base64
  //           const base64Data = btoa(
  //             new Uint8Array(response.data).reduce(
  //               (data, byte) => data + String.fromCharCode(byte),
  //               ""
  //             )
  //           );

  //           // Set PDF data URL
  //           setImageSrc(`data:image/png;base64,${base64Data}`);
  //         } catch (error) {
  //           console.error("Error fetching PDF data:", error);
  //           // setError("Error fetching PDF data. Please try again later.");
  //         }
  //       };

  //       fetchImg();
  //     }
  //   }, [userId]);

  console.log(currUser);

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleResumeOpen = (candidateId) => {
    const url = `/resume/${candidateId}`;
    window.open(url, "_blank");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 fixed">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">RecruiteEz</span>
            </div>
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
          </div>
          <div className="flex-1">
            <nav className="grid cursor-pointer items-start px-2 text-sm font-medium lg:px-4">
              <div
                onClick={() => navigate("/candidate-dashboard")}
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </div>
              <div
                onClick={() => navigate("/search-jobs")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Search className="h-4 w-4" />
                Search Jobs
              </div>
              <div
                onClick={() => navigate("/jobs-applied")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Jobs Applied
              </div>
              <div
                onClick={() => navigate("/scheduled-interviews")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Interview Scheduled
              </div>
              <div
                onClick={() => navigate("/offered-jobs")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Offers
              </div>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button size="sm" className="w-full" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4 cursor-pointer">
                <div
                  onClick={() => navigate("/candidate-dashboard")}
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </div>
                <div
                  onClick={() => navigate("/search-jobs")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Search className="h-4 w-4" />
                  Search Jobs
                </div>
                <div
                  onClick={() => navigate("/jobs-applied")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Package className="h-4 w-4" />
                  Jobs Applied
                </div>
                <div
                  onClick={() => navigate("/scheduled-interviews")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  Interview Scheduled
                </div>
                <div
                  onClick={() => navigate("/offered-jobs")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LineChart className="h-4 w-4" />
                  Offers
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="">Dashboard</span>
                </div>
              </div>
            </form>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                {/* <span className="sr-only">Toggle user menu</span> */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/edit-candidate-profile")}
              >
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex gap-4 p-4 lg:gap-6 lg:p-6 h-4/5 justify-center ">
          <div className="flex justify-center  w-2/5">
            <Card className="w-full">
              <CardHeader className="p-4">
                <CardTitle className="text-center">Profile </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 p-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-10 h-10 relative rounded-full overflow-hidden">
                    <Avatar>
                      <AvatarImage alt="@shadcn" />
                      <AvatarFallback>
                        <CircleUser className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <div className="grid gap-3 text-md px-1 mx-auto py-2 my-2 font-medium">
                  <div className="my-2">
                    Name:
                    <span className="text-gray-600 mx-4">{currUser.name}</span>
                  </div>

                  <div className="">
                    Email:
                    <span className="text-gray-600 mx-4">{currUser.email}</span>
                  </div>

                  <div className="">
                    Gender:
                    <span className="text-gray-600 mx-4">
                      {currUser.gender === 0
                        ? "Male"
                        : currUser.gender === 1
                        ? "Female"
                        : "Other"}
                    </span>
                  </div>

                  <div className="">
                    Favourite Sport:
                    <span className="text-gray-600 mx-2">
                      {currUser.answer}
                    </span>
                  </div>

                  <div className="mt-6">
                    <Button
                      onClick={() => handleResumeOpen(currUser._id)}
                      className="h-10 w-full"
                      type="submit"
                    >
                      View Resume
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShowCandidateProfile;
