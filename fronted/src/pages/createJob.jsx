import { useLocation } from 'react-router-dom';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { set } from 'mongoose';



export function CreateJob() {

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [requirements, setRequirements] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [seats, setSeats] = useState();

  const handleCreateJob = async () => {
    console.log(title, requirements, location, salary, description, seats, recruiterId);
    try {
      const response = await axios.post(`http://localhost:8080/jobs/`, {
        title,
        requirements,
        location,
        salaryRange: salary,
        description,
        seats,
        recruiterId
      });

      console.log("success", response.data.message);
    } catch (error) {
      console.error('Failed to add interviewee:', error.response?.data?.error || error.message);
    }
  }
  const [recruiterId, setRecruiterid] = useState("");

  useEffect(() => {
    const userId = window.sessionStorage.getItem("userId");
  console.log("recruiter Id : ", userId);
  setRecruiterid(userId);
  }, []);

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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </div>
              <div
                onClick={() => navigate('/create-job')}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-muted  transition-all hover:text-primary"
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </div>
              <div
                onClick={() => navigate('/create-job')}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-muted  transition-all hover:text-primary"
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
                  <span className="">Create a New Job</span>
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

          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                add the details about the job
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Title</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Desciption</Label>
                  <Textarea
                    id="description"
                    className="min-h-32"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name">Location</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Requirements</Label>
                  <Textarea
                    id="description"
                    className="min-h-32"
                    onChange={(e) => setRequirements(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name">Salary-Range</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name">Vacancy</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    onChange={(e) => setSeats(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="w-10">
            <Button type="submit" className='flex items center' onClick={()=>{handleCreateJob()}}>Create Job</Button>
          </div>






          <div>

          </div>



        </main>

      </div>
    </div>
  )
}
