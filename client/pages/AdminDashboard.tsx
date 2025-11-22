import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router-dom";
import {
  FileText,
  Code2,
  FolderOpen,
  Briefcase,
  Settings,
  LogOut,
  User,
  Home,
} from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: "About Section",
      description: "Manage your profile, bio, and social links",
      href: "/admin/about",
      icon: User,
      color: "bg-blue-500",
    },
    {
      title: "Skills",
      description: "Organize skills by category and proficiency",
      href: "/admin/skills",
      icon: Code2,
      color: "bg-green-500",
    },
    {
      title: "Projects",
      description: "Manage your portfolio projects and details",
      href: "/admin/projects",
      icon: FolderOpen,
      color: "bg-purple-500",
    },
    {
      title: "Experience",
      description: "Add and edit your work experience",
      href: "/admin/experience",
      icon: Briefcase,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-bold text-primary">
              Ishwar
            </Link>
            <div className="text-sm text-muted-foreground">/ Admin Panel</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <div className="font-semibold">{user?.name}</div>
              <div className="text-muted-foreground text-xs">{user?.email}</div>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome to Admin Panel</h1>
            <p className="text-lg text-muted-foreground">
              Manage all your portfolio content without touching code
            </p>
          </div>

          {/* Admin Menu Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} to={item.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">
                            {item.title}
                          </CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </div>
                        <div
                          className={`${item.color} p-3 rounded-lg text-white`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card className="bg-muted/50 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/">
                  <Button variant="outline" className="w-full justify-start">
                    <Home className="h-4 w-4 mr-2" />
                    View Public Portfolio
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
