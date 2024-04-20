import { useLocation } from 'react-router-dom';
import {
  Bell,
  File,
  CircleUser,
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


} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import useDataFetch from '@/hooks/useDataFetch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export function InterviewList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobId } = location.state || {};
  console.log(jobId);

  const job = useDataFetch(`http://localhost:8080/jobs/${jobId}`);
  console.log(job);

  const jobCandidates = useDataFetch(`http://localhost:8080/jobs/${jobId}/candidates`);
  console.log(jobCandidates);

  const jobInterviews = useDataFetch(`http://localhost:8080/jobs/${jobId}/interviews`);
  console.log(jobInterviews);

  const handleHired = async (userId, index) => {
    console.log(userId, index);
    try {
      const response = await axios.put(`http://localhost:8080/jobs/${jobId}/hire-candidate`, {
        candidateId : userId
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Failed to add interviewee:', error.response?.data?.error || error.message);
    }
  }

  const handleReject = async (userId, index) => {
    console.log(userId, index);
    try {
      const response = await axios.put(`http://localhost:8080/jobs/${jobId}/reject`, {
        userId
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Failed to add interviewee:', error.response?.data?.error || error.message);
    }
  }

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
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </div>
              <div
                onClick={() => navigate('/create-job')}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CirclePlus  className="h-4 w-4" />
                Create Job
              </div>
              <div
                onClick={() => navigate('/interviews-all')}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Headset className="h-4 w-4" />
                Interview Sceduled
              </div>
              <div
                onClick={() => navigate('/hired-all')}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Hired Candidates
              </div>
              <div
                onClick={() => navigate('/selected-all')}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <UserRoundCheck  className="h-4 w-4" />
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
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </div>
              <div
                onClick={() => navigate('/create-job')}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CirclePlus  className="h-4 w-4" />
                Create Job
              </div>
              <div
                onClick={() => navigate('/interviews-all')}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Headset className="h-4 w-4" />
                Interview Sceduled
              </div>
              <div
                onClick={() => navigate('/hired-all')}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Hired Candidates
              </div>
              <div
                onClick={() => navigate('/selected-all')}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <UserRoundCheck  className="h-4 w-4" />
                Selected Candidates
              </div>
            </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="">Interviews Pending - {job.title}</span>
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

          {/* //table */}



          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">

            <Tabs defaultValue="week">
              <TabsContent value="week">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Candidates Interviews Pending</CardTitle>
                    <CardDescription>
                      Interview pending candidates for the job.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Candidate</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Gender
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Interview Date
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>


                        {jobInterviews && jobInterviews.length > 0 ? (
                          jobInterviews.map((candidate, index) => (
                            <TableRow>
                              <TableCell>
                                <div className="font-medium">{candidate.name}</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                  {candidate.email}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {candidate.gender === 1 ? "Male" : "Female"}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="outline">
                                {job?.candidates[index]?.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {candidate.interviewDate ?? "Not Available"}
                              </TableCell>
                              <TableCell>
                                <Button variant="" size="sm" onClick={() => { handleHired(candidate._id, index) }}>
                                  Hire
                                </Button>
                                <Button variant="outline" className="ml-5" size="sm" onClick={() => { handleReject(candidate._id, index) }}>
                                  Reject
                                </Button>
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
  )
}
