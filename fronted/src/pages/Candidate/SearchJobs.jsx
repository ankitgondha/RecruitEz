import React from "react";

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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const SearchJobs = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  //   const isDesktop = useMediaQuery("(min-width: 768px)");

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
                          />
                        </div>

                        <Button
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          Apply
                        </Button>
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
                    <TableRow>
                      <TableCell className="font-medium">
                        Software Engineer
                      </TableCell>
                      <TableCell className="font-medium">Google</TableCell>

                      <TableCell className="hidden md:table-cell">
                        Bangalore
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-07-12 10:42 AM
                      </TableCell>

                      <TableCell className="hidden md:table-cell text-sky-400">
                        <p
                          className="cursor-pointer"
                          onClick={() => navigate("/job-description")}
                        >
                          See More...
                        </p>
                      </TableCell>
                    </TableRow>
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
