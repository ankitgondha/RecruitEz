import React, { useEffect, useState } from "react";

// import useDataFetch from ".../hooks/useDataFetch.jsx";
import useDataFetch from "@/hooks/useDataFetch";

import { Label } from "@/components/ui/label";
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

import { cn } from "@/lib/utils";
// import { useMediaQuery } from "@/hooks/use-media-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SearchJobs = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [filteredJobs, setFilteredJobs] = useState({});

  const jobs = useDataFetch("http://localhost:8080/jobs/all");

  const activeJobs = jobs.filter((job) => job.active);

  useEffect(() => {
    setFilteredJobs(activeJobs); // Initialize filteredJobs with fetched jobs
  }, [activeJobs]);

  useEffect(() => {
    filterJobs();
  }, [role, company, activeJobs]);

  const filterJobs = () => {
    let filtered = activeJobs;

    if (role) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(role.toLowerCase())
      );
    }

    if (company) {
      filtered = filtered.filter((job) =>
        job.company.toLowerCase().includes(company.toLowerCase())
      );
    }
    setFilteredJobs(filtered);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleApplyFilter = () => {
    setOpen(false);
  };

  const handleNavigation = (id) => {
    navigate("/job-description", { state: { jobId: id } });
  };

  return (
    <div className="grid min-h-screen w-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="fixed flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">RecruiteEz</span>
            </div>
          </div>
          <div className="flex-1">
            <nav className="grid cursor-pointer items-start px-2 text-sm font-medium lg:px-4">
              <div
                onClick={() => navigate("/candidate-dashboard")}
                className="flex items-center gap-3 rounded-lg  px-3 py-2 transition-all text-muted-foreground  hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </div>
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary  transition-all hover:text-primary">
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
              <DropdownMenuItem
                onClick={() => navigate("/edit-candidate-profile")}
              >
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/view-candidate-profile")}
              >
                View Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* //table */}
          <main className="grid flex-1 items-start ">
            <Card>
              <div className="p-4 flex justify-between">
                <div className="text-xl font-medium">Active Jobs</div>

                <div className="">
                  <Dialog
                    open={open}
                    onOpenChange={setOpen}
                    className="bg-slate-900"
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-gray-800">
                        Filters
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <Label htmlFor="role"> Search By Role</Label>
                          </div>
                          <Input
                            id="role"
                            type="text"
                            required
                            placeholder="Search"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          />
                        </div>

                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <Label htmlFor="company">Search By Company</Label>
                          </div>
                          <Input
                            id="company"
                            type="text"
                            required
                            placeholder="Search"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                          />
                        </div>

                        <Button onClick={handleApplyFilter}>Apply</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

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
                        Created at
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredJobs && filteredJobs.length > 0 ? (
                      filteredJobs.map((job) => {
                        return (
                          <TableRow>
                            <TableCell className="font-medium">
                              {job.title}
                            </TableCell>
                            <TableCell className="font-medium">
                              {job.company}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              {job.location}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {job.createdAt.slice(0, 10) ?? "Not Available"}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleNavigation(job._id)}
                              >
                                {/* View Details */}
                                <ChevronRight className="h-4 w-4" />
                              </Button>
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
};

export default SearchJobs;
