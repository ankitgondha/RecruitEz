import { useLocation } from "react-router-dom";
import {
  Bell,
  File,
  CircleUser,
  PlusCircle,
  ChevronRight,
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
  Eye,
  Star,
  CalendarCheck,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import useDataFetch from "@/hooks/useDataFetch";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { set } from "mongoose";

export function AllHired() {
  const navigate = useNavigate();
  const [recruiterId, setRecruiterid] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = window.sessionStorage.getItem("userId");
    console.log("recruiter Id : ", userId);
    setRecruiterid(userId);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInterviewCandidates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/jobs/hired/${recruiterId}`
        );
        setCandidates(response.data);
      } catch (err) {
        setError("Failed to fetch candidates: " + err.message);
      }
    };

    if (recruiterId) {
      fetchInterviewCandidates();
    }
  }, [recruiterId]);
  console.log("candidates : ", candidates);

  async function fetchCandidateDetails(candidateId) {
    try {
      const response = await fetch(
        `http://localhost:8080/jobs/candidate/${candidateId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch candidate details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      return null;
    }
  }

  async function enhanceCandidates() {
    for (let i = 0; i < candidates.length; i++) {
      const candidateDetails = await fetchCandidateDetails(
        candidates[i].candidateId
      );
      if (candidateDetails) {
        candidates[i].candidateName = candidateDetails.name;
        candidates[i].candidateEmail = candidateDetails.email;
      }
    }
    console.log("Enhanced candidates:", candidates);
    setLoading(false);
    return candidates;
  }

  useEffect(() => {
    if (candidates.length > 0) {
      enhanceCandidates();
    }
  }, [candidates]);

  if (loading) {
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
                  className="flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
                  className="flex items-center gap-3 rounded-lg  px-3 py-2 text-primary bg-muted transition-all hover:text-primary"
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
                    className="flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
                    className="flex items-center gap-3 rounded-lg  px-3 py-2 text-primary bg-muted transition-all hover:text-primary"
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
                    <span className="">Hired Candidates</span>
                  </div>
                </div>
              </form>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
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
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div>Not Found</div>
          </main>
        </div>
      </div>
    );
  }

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
                className="flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
                className="flex items-center gap-3 rounded-lg  px-3 py-2 text-primary bg-muted transition-all hover:text-primary"
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
                  className="flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
                  className="flex items-center gap-3 rounded-lg  px-3 py-2 text-primary bg-muted transition-all hover:text-primary"
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
                  <span className="">Hired Candidates</span>
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* //form */}

          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Tabs defaultValue="week">
              <TabsContent value="week">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Candidates Hired</CardTitle>
                    <CardDescription>
                      hired candidates for all the job posted yet.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Candidate</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Job
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Applied Date
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {candidates && candidates.length > 0 ? (
                          candidates.map((candidate, index) => (
                            <TableRow>
                              <TableCell>
                                <div className="font-medium">
                                  {candidate.candidateName
                                    ? candidate.candidateName
                                    : "Unknown"}
                                </div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                  {candidate.candidateEmail ?? "Not Available"}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {candidate.jobTitle ?? "Not Available"}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="outline">
                                  Hired
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {candidate.applyDate.slice(0, 10) ??
                                  "Not Available"}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan="number_of_columns">
                              No candidates found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
