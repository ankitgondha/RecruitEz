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
  Eye,
  Star,
  CalendarCheck



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

export function CandidatesList() {
  const location = useLocation();
  const { jobId } = location.state || {};
  console.log(jobId);

  const job = useDataFetch(`http://localhost:8080/jobs/${jobId}`);
  console.log(job);

  const jobCandidates = useDataFetch(`http://localhost:8080/jobs/${jobId}/candidates`);
  console.log(jobCandidates);

  const handleSelected = async (index) => {
    try {
      const response = await axios.put(`http://localhost:8080/jobs/toggle-selected/${jobId}`, {
        index
      });

      console.log('Toggle Success:', response.data);
    } catch (error) {
      console.error('Error toggling selected:', error);
    }
  };

  const handleInterview = async (index) => {
    const userId = jobCandidates[index]._id;
    console.log('Interview:', index, userId);
    try {
      const response = await axios.put(`http://localhost:8080/jobs/${jobId}/add-interviewee`, {
        userId
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Failed to add interviewee:', error.response?.data?.error || error.message);
    }
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
                  <span className="">All Candidates - {job.title}</span>
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

            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All Candidates</TabsTrigger>
                  <TabsTrigger value="top">Top Candidates</TabsTrigger>
                  <TabsTrigger value="selected">Selected Candidates</TabsTrigger>
                </TabsList>

                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        All
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>ATS</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>College</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>CGPA</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Degree</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Location
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                </div>

              </div>


              <TabsContent value="all">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Candidates</CardTitle>
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
                          <TableHead className="hidden md:table-cell">Select</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>


                        {jobCandidates && jobCandidates.length > 0 ? (
                          jobCandidates.map((candidate, index) => (
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
                                  {job.status[index] ?? "Pending"}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {job.appliedDate[index]?.slice(0, 10) ?? "Not Available"}
                              </TableCell>
                              <TableCell className="text-right">
                                <Eye className="h-5 w-5" color='#313944' />
                              </TableCell>
                              <TableCell className="text-right">
                                {job.selected && job.selected[index] ? (
                                  <Star className="h-5 w-5" color="#313944" fill="#313944" onClick={() => handleSelected(index)} />
                                ) : (
                                  <Star className="h-5 w-5" color="#313944" onClick={() => handleSelected(index)} />
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
                          <TableHead className="hidden md:table-cell">Select</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>


                        {jobCandidates && jobCandidates.length > 0 ? (
                          jobCandidates
                            .map((candidate, index) => ({ candidate, index }))
                            .filter(({ _, index }) => job.selected[index])
                            .map(({ candidate, index }) => (
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
                                    {job.status[index] ?? "Pending"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {job.appliedDate[index]?.slice(0, 10) ?? "Not Available"}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Eye className="h-5 w-5" color='#313944' />
                                </TableCell>
                                <TableCell className="text-right">
                                  {job.selected && job.selected[index] ? (
                                    <Star className="h-5 w-5" color="#313944" fill="#313944" onClick={() => handleSelected(index)} />
                                  ) : (
                                    <Star className="h-5 w-5" color="#313944" onClick={() => handleSelected(index)} />
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <CalendarCheck className="h-5 w-5" color="#313944" onClick={() => handleInterview(index)} />
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
          <div>

          </div>



        </main>

      </div>
    </div>
  )
}
