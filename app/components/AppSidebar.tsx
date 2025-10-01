import {
  Home,
  Inbox,
  Search,
  Settings,
  User2Icon,
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Calendar,
  Book,
  Notebook,
  PenLine,
  Pencil,
  Library,
  User,
  School,
  FileText,
  Brain,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import Logo from "./logo";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "GPA Tracker",
    url: "/gpa",
    icon: GraduationCap,
  },
  {
    title: "Planner",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Semesters",
    url: "/semesters",
    icon: Library,
  },
  {
    title: "Study",
    url: "/study",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="dark:border-gray-900">
      <SidebarContent className="bg-gray-50 dark:bg-[#192c43] shadow-xl text-gray-800">
        <SidebarGroup>
          <SidebarGroupLabel className="text-black text-2xl font-semibold text-gradient mb-4 md:m-0 ">
            <Logo className="md:hidden block" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-1">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="group rounded-md px-2 py-3 bg-gray-100 hover:text-black hover:bg-gray-200 transition-colors duration-300 dark:bg-gray-900 border-1 dark:border-gray-600"
                >
                  <SidebarMenuButton
                    asChild
                    className="bg-gray-100 hover:text-black dark:bg-gray-900 hover:bg-gray-200 transition-colors duration-300 dark:text-white"
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="flex items-start gap-2 mt-auto">
          <Link
            to="#"
            className="flex gap-2 w-full p-3 rounded-md text-sm bg-gray-100 items-center dark:bg-gray-900 border-1 dark:border-gray-600 dark:text-white"
          >
            <User2Icon />
            <div>Profile</div>
          </Link>

          <Link
            to="#"
            className="flex gap-2 w-full p-3 rounded-md text-sm bg-gray-100 items-center dark:bg-gray-900 border-1 dark:border-gray-600 dark:text-white"
          >
            <Settings />
            <div>Settings</div>
          </Link>

          <Link
            to="#"
            className="flex gap-2 text-red-600 bg-red-100 w-full p-3 rounded-md text-sm items-center dark:bg-gray-900 border-1 dark:border-gray-600 dark:text-white"
          >
            <LogOut className="text-red-700" />
            <div>Logout</div>
          </Link>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
