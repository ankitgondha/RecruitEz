import React from "react";
import useDataFetch from "../hooks/useDataFetch.jsx";
import axios from "axios";

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

export function EditJobStatus() {
  const [recruiterId, setRecruiterId] = useState("");
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const userId = window.sessionStorage.getItem("userId");
    if (userId) {
      setRecruiterId(userId);
    } else {
      console.error("No recruiter ID found");
    }
  }, []);

  // Effect to fetch jobs only when recruiterId is set
  useEffect(() => {
    const fetchJobs = async () => {
      if (!recruiterId) return;

      try {
        const response = await axios.get(
          `http://localhost:8080/jobs/all/recruiter?recruiterId=${recruiterId}`
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, [recruiterId]); // This effect runs when recruiterId changes

  const handleToggle = async (jobId, currentStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/jobs/${jobId}/status`,
        {
          active: !currentStatus,
        }
      );

      // Update the local state with the new job data
      setJobs(jobs.map((job) => (job._id === jobId ? response.data : job)));
    } catch (error) {
      console.error("Failed to update job status", error);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="fixed flex h-full max-h-screen flex-col gap-2">
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
                onClick={() => navigate("/edit-job-status")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-muted  transition-all hover:text-primary"
              >
                <CirclePlus className="h-4 w-4" />
                Edit Job Status
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
                  onClick={() => navigate("/edit-job-status")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <CirclePlus className="h-4 w-4" />
                  Edit Job Status
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
                  <span className="">Edit Job Status</span>
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
                onClick={() => navigate("/edit-recruiter-profile")}
              >
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/view-recruiter-profile")}
              >
                View Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {/* <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
         */}

        {/* //table */}
        <main className="grid flex-1 items-start ">
          <Card>
            <CardHeader>
              <CardTitle>Recent Posted Jobs</CardTitle>
              <CardDescription>
                Manage your jobs and view all candidates who applied.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    {/* <TableHead>Status</TableHead> */}
                    <TableHead className="hidden md:table-cell">
                      Applied
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Hired
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {jobs.map((job, index) => (
                    <TableRow key={job._id}>
                      <TableCell className="font-medium">{job.title}</TableCell>

                      <TableCell className="hidden md:table-cell">
                        {job?.candidates?.length ?? 0}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {job.hired.length}/{job.seats}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {job.createdAt.slice(0, 10)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Button
                          variant="secondary"
                          onClick={() => handleToggle(job._id, job.active)}
                        >
                          {job.active ? "Disable" : "Enable"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        {/* </main> */}
      </div>
    </div>
  );
}
