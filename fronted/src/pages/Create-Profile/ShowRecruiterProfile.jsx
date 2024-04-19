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

const ShowRecruiterProfile = () => {
  const [userId, setUserId] = useState("");
  const [currUser, setCurrUser] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

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

      const apiUrl = `http://localhost:8080/users/${candidateId}/${role}`;
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

  useEffect(() => {
    if (userId) {
      // Check if userId is truthy
      const fetchImg = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/users/profileimg?userId=${userId}`,
            {
              responseType: "arraybuffer",
            }
          );

          // Convert ArrayBuffer to Base64
          const base64Data = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );

          // Set PDF data URL
          setImageSrc(`data:image/png;base64,${base64Data}`);
        } catch (error) {
          console.error("Error fetching PDF data:", error);
          // setError("Error fetching PDF data. Please try again later.");
        }
      };

      fetchImg();
    }
  }, [userId]);

  console.log(currUser);

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">RecruiteEz</span>
            </div>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 cursor-pointer">
              <div
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </div>
              <div
                onClick={() => navigate("/create-job")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CirclePlus className="h-4 w-4" />
                Create Job
              </div>
              <div
                onClick={() => navigate("/interviews-all")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Headset className="h-4 w-4" />
                Interview Sceduled
              </div>
              <div
                onClick={() => navigate("/hired-all")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Hired Candidates
              </div>
              <div
                onClick={() => navigate("/selected-all")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <UserRoundCheck className="h-4 w-4" />
                Selected Candidates
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
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </div>
                <div
                  onClick={() => navigate("/create-job")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <CirclePlus className="h-4 w-4" />
                  Create Job
                </div>
                <div
                  onClick={() => navigate("/interviews-all")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Headset className="h-4 w-4" />
                  Interview Sceduled
                </div>
                <div
                  onClick={() => navigate("/hired-all")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  Hired Candidates
                </div>
                <div
                  onClick={() => navigate("/selected-all")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <UserRoundCheck className="h-4 w-4" />
                  Selected Candidates
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
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex gap-4 p-4 lg:gap-6 lg:p-6 h-4/5 justify-center ">
          <div className="flex justify-center w-2/5">
            <Card className="w-full">
              <CardHeader className="p-4">
                <CardTitle className="text-center">Profile </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 p-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-10 h-10 relative rounded-full overflow-hidden">
                    <Avatar>
                      <AvatarImage src={imageSrc} alt="@shadcn" />
                      <AvatarFallback>
                        <CircleUser className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <div className="grid gap-0.5 text-lg px-6 mx-2 pt-2 mt-1">
                  <div className="font-semibold my-2">
                    Name:
                    <span className="text-gray-600 mx-4">{currUser.name}</span>
                  </div>

                  <div className="font-semibold my-2">
                    Email:
                    <span className="text-gray-600 mx-4">{currUser.email}</span>
                  </div>

                  <div className="font-semibold my-2">
                    Company Name:
                    <span className="text-gray-600 mx-4">
                      {currUser.company}
                    </span>
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

export default ShowRecruiterProfile;
