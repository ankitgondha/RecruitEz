import React from "react";
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

const JobDescription = () => {
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
              <CardHeader className="text-center">
                <CardTitle>Role</CardTitle>
                <CardDescription>Company Name</CardDescription>
              </CardHeader>

              <div className="p-4">
                <div>
                  <div>
                    <span className="font-medium">Location:</span>
                    <span>Bangalore</span>
                  </div>
                  <div>
                    <span className="font-medium">Date Created:</span>
                    <span>10/04/2023</span>
                  </div>
                </div>

                <div>
                  <p className="text-center font-medium">Job Description:</p>
                  <div className="p-6 text-xs overflow-y-scroll h-[45vh]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi nam velit facere tenetur consectetur eveniet
                    architecto itaque delectus qui accusantium libero impedit,
                    quod perspiciatis fugit voluptate quo sit iste sunt
                    molestiae modi eligendi odit odio. Sint at tenetur odio ea
                    perferendis, maiores autem reiciendis quaerat laboriosam
                    temporibus enim atque cupiditate fugiat voluptatum eos fugit
                    tempore omnis. Nesciunt omnis explicabo est provident vel.
                    Quae dolore ipsum deleniti eveniet, vero nulla debitis
                    dolor. Aperiam quae voluptatem deserunt nesciunt aut? Nulla
                    quas totam aperiam tenetur repellat! Aliquam at iste fuga!
                    Porro perferendis est accusantium facere ea dignissimos,
                    error cum obcaecati quod molestias dolorem nulla sunt
                    placeat! Error, rem. Eos voluptatem earum corrupti
                    voluptates natus! Reiciendis nobis officiis libero provident
                    dignissimos nisi doloremque recusandae maiores quidem
                    distinctio, debitis consectetur temporibus minus laborum eum
                    quasi, excepturi veniam mollitia placeat suscipit ratione,
                    dolorum impedit accusantium. Unde, laudantium autem!
                    Dignissimos quae optio laboriosam eius saepe molestias, non,
                    maiores sequi ipsum quasi sapiente? Quae, ratione enim!
                    Reiciendis temporibus minus deserunt? Explicabo tenetur
                    aspernatur, magni eius doloribus ducimus est quis, error eum
                    voluptates fuga beatae saepe numquam reprehenderit
                    laboriosam odio obcaecati, consectetur tempore eveniet
                    deleniti? Ratione eveniet inventore quos recusandae
                    voluptas, suscipit ipsum laudantium ipsa accusamus nostrum
                    alias perspiciatis possimus, tempore pariatur, est fuga
                    voluptatem necessitatibus modi ea asperiores nemo? Obcaecati
                    ad nobis eaque deserunt dolorem reiciendis cum libero
                    laboriosam qui repellendus! Deserunt alias quibusdam error,
                    enim, blanditiis soluta hic nobis explicabo reiciendis id
                    eius sed quaerat, quos dicta ipsa. A delectus enim fugit hic
                    cupiditate repellendus, aliquid similique, rem provident
                    obcaecati doloribus autem velit vel natus aliquam
                    praesentium, vitae assumenda quas eveniet rerum. Reiciendis
                    aspernatur odio aliquid distinctio vero tenetur sunt? Illo
                    molestiae porro a voluptatum esse cum fugit sequi facilis
                    maxime. Doloremque ut at doloribus. Deserunt in rerum odio?
                    Reprehenderit libero sed magnam eos, aperiam dolores
                    sapiente eaque dolor, incidunt in mollitia ipsa culpa, et
                    cupiditate! Doloribus, molestias pariatur quisquam sapiente
                    reprehenderit tenetur esse expedita tempora nisi ipsa!
                    Minima, temporibus! Dignissimos vero dolorem delectus alias
 
                  </div>
                </div>
              </div>

              <CardFooter className="flex justify-between">
                <Button variant="outline">Back</Button>
                <Button>Apply</Button>
              </CardFooter>
            </Card>
          </main>
        </main>
      </div>
    </div>
  );
};

export default JobDescription;
