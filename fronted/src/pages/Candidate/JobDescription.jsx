import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";

import useDataFetch from "@/hooks/useDataFetch";

const JobDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobId } = location.state || {};
  // console.log(jobId);
  // const user = window.sessionStorage.getItem("user");
  // console.log("userId hit");
  // console.log(user);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    //  console.log("came in useEffect");
    const candidateId = window.sessionStorage.getItem("userId");
    setUserId(candidateId);

    console.log(userId);
    // console.log("Hit")
  }, []);

  // if (userId) {
  //   console.log("cc id is set");
  // } else {
  //   console.log("cc id is not set");
  // }

  // console.log(userId);
  const job = useDataFetch(`http://localhost:8080/jobs/${jobId}`);

  console.log("job is ", job);

  const handleApply = async () => {
    // console.log(userId);
    // console.log(job);
    try {
      let token = sessionStorage.getItem("token");
      console.log("token is,", token);
      const response = await axios.post("http://localhost:8080/jobs/apply", {
        jobId,
        token: token,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error Applying for the job", error.response.data);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  // const timestamp = job.createdAt;
  // const date = new Date(timestamp);
  // const formattedDate = date.toISOString().split("T")[0];
  // console.log(formattedDate);
  // const formattedDate = timeStamp.slice(0, 10);
  // console.log(formattedDate);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">RecruiteEz</span>
            </div>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
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
                  onClick={() => navigate("/dashboard")}
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
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* //table */}
          <main className="grid flex-1 items-start ">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.company}</CardDescription>
              </CardHeader>

              <div className="p-4">
                <div>
                  <div>
                    <span className="font-medium">Location</span>
                    <span className="mx-4">{job.location}</span>
                  </div>
                  <div>
                    <span className="font-medium">Date Created:</span>
                    <span className="mx-4">{job.createdAt}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-center font-medium">Job Description:</p>
                  <div className="p-6 text-xs overflow-y-scroll h-[45vh]">
                    {job.description}
                  </div>
                </div>
              </div>

              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => navigate("/search-jobs")}
                  variant="outline"
                >
                  Back
                </Button>
                <Button onClick={handleApply}>Apply</Button>
              </CardFooter>
            </Card>
          </main>
        </main>
      </div>
    </div>
  );
};

export default JobDescription;
