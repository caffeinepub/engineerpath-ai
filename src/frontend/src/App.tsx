import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import { ChevronDown, Cpu, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useSeedData } from "./hooks/useQueries";

import AILearningPage from "./pages/AILearningPage";
import CollegesPage from "./pages/CollegesPage";
import ExamsPage from "./pages/ExamsPage";
import FinancePage from "./pages/FinancePage";
import HomePage from "./pages/HomePage";
import MentorsPage from "./pages/MentorsPage";
import ProfilePage from "./pages/ProfilePage";
import ResourcesPage from "./pages/ResourcesPage";
import RoadmapPage from "./pages/RoadmapPage";
import StartupHubPage from "./pages/StartupHubPage";

const navLinks = [
  { href: "/roadmap", label: "Roadmap" },
  { href: "/exams", label: "Exams" },
  { href: "/colleges", label: "Colleges" },
  { href: "/mentors", label: "Mentors" },
  { href: "/startup", label: "Startup Hub" },
  { href: "/ai-learning", label: "AI Learning" },
  { href: "/finance", label: "Finance" },
  { href: "/resources", label: "Resources" },
];

function NavBar() {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { login, clear, loginStatus, identity } = useAuth();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}...${principal.slice(-3)}`
    : "";

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          data-ocid="nav.link"
          className="flex items-center gap-2 font-display font-bold text-xl"
        >
          <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center glow-cyan">
            <Cpu className="w-5 h-5 text-primary" />
          </div>
          <span className="text-gradient-cyan">Careera</span>
          <Badge
            variant="outline"
            className="text-xs border-primary/40 text-primary hidden sm:flex"
          >
            AI
          </Badge>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              data-ocid="nav.link"
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                pathname === link.href
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 text-primary"
                  data-ocid="nav.dropdown_menu"
                >
                  <User className="w-4 h-4 mr-1" />
                  {shortPrincipal}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-card border-border"
              >
                <DropdownMenuItem asChild>
                  <Link to="/profile" data-ocid="nav.link">
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={clear} data-ocid="nav.button">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              onClick={() => login()}
              disabled={loginStatus === "logging-in"}
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan"
              data-ocid="nav.primary_button"
            >
              {loginStatus === "logging-in" ? "Connecting..." : "Sign In"}
            </Button>
          )}

          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            data-ocid="nav.toggle"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid="nav.link"
                className="px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function RootLayout() {
  useSeedData();

  return (
    <div className="min-h-screen bg-background noise-bg">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-border mt-16 py-8 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const roadmapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/roadmap",
  component: RoadmapPage,
});
const examsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exams",
  component: ExamsPage,
});
const collegesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/colleges",
  component: CollegesPage,
});
const mentorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mentors",
  component: MentorsPage,
});
const startupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/startup",
  component: StartupHubPage,
});
const aiLearningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-learning",
  component: AILearningPage,
});
const financeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/finance",
  component: FinancePage,
});
const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources",
  component: ResourcesPage,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  roadmapRoute,
  examsRoute,
  collegesRoute,
  mentorsRoute,
  startupRoute,
  aiLearningRoute,
  financeRoute,
  resourcesRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
