import { React, useState, useEffect } from "react";
// import useDataFetch from ".../hooks/useDataFetch.jsx";
import useDataFetch from "@/hooks/useDataFetch";

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
import { useSelector } from "react-redux";
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
// import * as jwt_decode from "jwt-decode";

export function CandidateDashboard() {
  const jobs = useDataFetch("http://localhost:8080/jobs/all");
  console.log(jobs);
  const navigate = useNavigate();
  // const candidateData = useSelector((state)=>state.userData)
  // console.log("candidate data is", candidateData);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    //  console.log("came in useEffect");

    const candidateId = window.sessionStorage.getItem("userId");
    setUserId(candidateId);

    console.log(userId);
    // console.log("Hit")
  }, []);

  const matchedJobs = [];

  jobs.forEach((job) => {
    const candidateArray = job.candidates;

    for (let i = 0; i < candidateArray.length; i++) {
      if (candidateArray[i].candidateId === userId) {
        matchedJobs.push({
          jobId: job._id,
          role: job.title,
          companyName: job.company,
          location: job.location,
          appliedDate: candidateArray[i].applyDate,
          status: candidateArray[i].status,
        });

        break;
      }
    }
  });

  matchedJobs.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
  console.log(matchedJobs);

  let jobsApplied = matchedJobs.length;
  let interviewCount = 0;
  let hiredCount = 0;

  matchedJobs.forEach((job) => {
    if (job.status === "Interview") {
      interviewCount++;
    } else if (job.status === "Hired") {
      hiredCount++;
    }
  });

  // const [user, setUser] = useState({});
  // const [userId, setUserId] = useState("");

  // useEffect(() => {
  //   const userData = window.sessionStorage.getItem("userData");
  //   const userDataObject = JSON.parse(userData);

  //   if (userDataObject) {
  //     setUser(userDataObject);
  //     const candidate = userDataObject.candidate;
  //     if (candidate) {
  //       setUserId(candidate._id);

  //       // console.log("User id");
  //       console.log(userId);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   let authToken = JSON.parse(sessionStorage.getItem("userData"));

  //   // if (authToken) {
  //   //   const decodedToken = JWT.decode(authToken.token);
  //   //   const userId = decodedToken._id;

  //   //   console.log(userId);
  //   // }
  // }, []);

  console.log("Number of jobs with status 'interview':", interviewCount);
  console.log("Number of jobs with status 'hired':", hiredCount);

  const recentJobs = matchedJobs.slice(0, 10);
  console.log(recentJobs);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleJobClick = (id) => {
    navigate("/jobdashboard", { state: { jobId: id } });
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
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid cursor-pointer items-start px-2 text-sm font-medium lg:px-4">
              <div className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
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
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Jobs Applied
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobsApplied} </div>
                {/* <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Interview Pending
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{interviewCount} </div>
                {/* <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Offers Received
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{hiredCount}</div>
                {/* <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p> */}
              </CardContent>
            </Card>
          </div>

          {/* //table */}
          <main className="grid flex-1 items-start ">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Recent Applied Jobs</CardTitle>
                    <CardDescription>
                      Here are all the jobs you have applied recently
                    </CardDescription>
                  </div>

                  <div>
                    <Button onClick={() => navigate("/jobs-applied")}>
                      View All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Company Name</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Location
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Applied at
                      </TableHead>

                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {recentJobs && recentJobs.length > 0 ? (
                      recentJobs.map((job) => {
                        return (
                          <TableRow>
                            <TableCell className="font-medium">
                              {job.role}
                            </TableCell>
                            <TableCell className="font-medium">
                              {job.companyName}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              {job.location}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {job.appliedDate}
                            </TableCell>

                            <TableCell>
                              <Badge variant="outline">{job.status}</Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan="number_of_columns">
                          No Jobs found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </main>
      </div>
    </div>
  );
}
