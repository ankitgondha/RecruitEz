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
import React from "react";
// import TimePicker from 'react-time-picker';
import dayjs from "dayjs";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { set } from "mongoose";

export function JobDashboard() {
  const location = useLocation();
  const { jobId } = location.state || {};
  console.log(jobId);

  const job = useDataFetch(`http://localhost:8080/jobs/${jobId}`);
  console.log(job);

  const jobCandidates = useDataFetch(
    `http://localhost:8080/jobs/${jobId}/candidates`
  );
  console.log("Candidates found:", jobCandidates);

  const navigate = useNavigate();

  const handleJobClick = (id) => {
    navigate("/candidateslist", { state: { jobId: id } });
  };

  const handleJobClick2 = (id) => {
    navigate("/interviewlist", { state: { jobId: id } });
  };

  const handleSelected = async (index) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/jobs/toggle-selected/${jobId}`,
        {
          index,
        }
      );

      console.log("Toggle Success:", response.data);
    } catch (error) {
      console.error("Error toggling selected:", error);
    }
  };

  const handleInterview = async (index) => {
    const userId = jobCandidates[index]._id;
    console.log("Interview:", index, userId);
    const formattedDateTime = `${format(dateTime.date, "dd/MM/yyyy")} ${
      dateTime.time.$H
    }:${dateTime.time.$m}`;
    console.log(formattedDateTime);

    try {
      const response = await axios.put(
        `http://localhost:8080/jobs/${jobId}/add-interviewee`,
        {
          userId: userId,
          interviewDate: formattedDateTime,
        }
      );

      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Failed to add interviewee:",
        error.response?.data?.error || error.message
      );
    }
  };

  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = React.useState({
    date: new Date(),
    time: "10:00",
  });

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
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <div
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </div>
              <div
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                Jobs
              </div>
              <div
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Interview
              </div>
              <div
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Candidates
              </div>
              <div
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </div>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button size="sm" className="w-full">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="">Dashboard - {job.title}</span>
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
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Candidates Applied for this Role
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {job?.candidates?.length ?? 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Candidates Hired for this Role
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {job?.hired?.length ?? 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Interview Pending
                </CardTitle>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6"
                  onClick={() => handleJobClick2(job._id)}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {job?.interviews?.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* //table */}

          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All Candidates</TabsTrigger>
                  <TabsTrigger value="top">Top Candidates</TabsTrigger>
                  <TabsTrigger value="selected">
                    Selected Candidates
                  </TabsTrigger>
                </TabsList>

                <div className="ml-auto flex items-center gap-2">
                  <Button
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => handleJobClick(job._id)}
                  >
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      View All
                    </span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <TabsContent value="all">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>All Candidates</CardTitle>
                    <CardDescription>
                      Recently applied for this role.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Candidates</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Gender
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Resume
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Select
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {jobCandidates && jobCandidates.length > 0 ? (
                          jobCandidates.map((candidate, index) => (
                            <TableRow>
                              <TableCell>
                                <div className="font-medium">
                                  {candidate.name}
                                </div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                  {candidate.email}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {candidate.gender === 1 ? "Male" : "Female"}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="outline">
                                  {job.candidates[index].status ?? "Pending"}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {job.candidates[index].appliedDate?.slice(
                                  0,
                                  10
                                ) ?? "Not Available"}
                              </TableCell>
                              <TableCell className="text-right">
                                <Eye className="h-5 w-5" color="#313944" />
                              </TableCell>
                              <TableCell className="text-right">
                                {job.candidates[index].status === "selected" ??
                                "selected" ? (
                                  <Star
                                    className="h-5 w-5"
                                    color="#313944"
                                    fill="#313944"
                                    onClick={() => handleSelected(index)}
                                  />
                                ) : (
                                  <Star
                                    className="h-5 w-5"
                                    color="#313944"
                                    onClick={() => handleSelected(index)}
                                  />
                                )}
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

              <TabsContent value="selected">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Selected Candidates</CardTitle>
                    <CardDescription>
                      Candidates selected for this role.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Candidates</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Gender
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Resume
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Select
                          </TableHead>
                          <TableHead className="text-left">
                            Schedule Interview
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {jobCandidates && jobCandidates.length > 0 ? (
                          jobCandidates
                            .map((candidate, index) => ({ candidate, index }))
                            .filter(
                              ({ candidate, index }) =>
                                job.candidates[index].status === "selected"
                            )
                            .map(({ candidate, index }) => (
                              <TableRow>
                                <TableCell>
                                  <div className="font-medium">
                                    {candidate.name}
                                  </div>
                                  <div className="hidden text-sm text-muted-foreground md:inline">
                                    {candidate.email}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  {candidate.gender === 1 ? "Male" : "Female"}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  <Badge className="text-xs" variant="outline">
                                    {job.candidates[index].status ?? "Pending"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {job.candidates[index].appliedDate?.slice(
                                    0,
                                    10
                                  ) ?? "Not Available"}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Eye className="h-5 w-5" color="#313944" />
                                </TableCell>
                                <TableCell className="text-right">
                                  {job.candidates[index].status ===
                                  "selected" ? (
                                    <Star
                                      className="h-5 w-5"
                                      color="#313944"
                                      fill="#313944"
                                      onClick={() => handleSelected(index)}
                                    />
                                  ) : (
                                    <Star
                                      className="h-5 w-5"
                                      color="#313944"
                                      onClick={() => handleSelected(index)}
                                    />
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <CalendarCheck
                                        className="h-5 w-5"
                                        color="#313944"
                                      />
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                      <DialogHeader>
                                        <DialogTitle>
                                          Schedule Interview
                                        </DialogTitle>
                                        <DialogDescription>
                                          Select Date and Time to Schedule an
                                          interview with the candidate.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="flex items-center  gap-4">
                                          <Label
                                            htmlFor="name"
                                            className="text-right"
                                          >
                                            Date
                                          </Label>
                                          <Popover>
                                            <PopoverTrigger asChild>
                                              <Button
                                                variant={"outline"}
                                                className={cn(
                                                  "w-[244px] h-[56px] justify-start text-left font-normal",
                                                  !dateTime.date &&
                                                    "text-muted-foreground"
                                                )}
                                              >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {dateTime.date ? (
                                                  format(dateTime.date, "PPP")
                                                ) : (
                                                  <span>Pick a date</span>
                                                )}
                                              </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                              <Calendar
                                                mode="single"
                                                selected={dateTime.date}
                                                onSelect={(newDate) =>
                                                  setDateTime({
                                                    ...dateTime,
                                                    date: newDate,
                                                  })
                                                }
                                                initialFocus
                                              />
                                            </PopoverContent>
                                          </Popover>
                                        </div>
                                        <div className="flex items-center  gap-4">
                                          <Label
                                            htmlFor="time"
                                            className="text-right"
                                          >
                                            Time
                                          </Label>
                                          <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                          >
                                            <DemoContainer
                                              components={["TimePicker"]}
                                            >
                                              <TimePicker
                                                label="Select a time"
                                                onChange={(newValue) =>
                                                  setDateTime({
                                                    ...dateTime,
                                                    time: newValue,
                                                  })
                                                }
                                              />
                                            </DemoContainer>
                                          </LocalizationProvider>
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button
                                          type="submit"
                                          onClick={() => handleInterview(index)}
                                        >
                                          Send Email
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
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
          <div></div>
        </main>
      </div>
    </div>
  );
}
