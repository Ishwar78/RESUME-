import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Github,
  Linkedin,
  ChevronRight,
  User,
  Code,
  Briefcase,
  FolderOpen,
  Mail as MailIcon,
  Download,
  ArrowRight,
  Zap,
  Globe,
  Database,
  Smartphone,
  Coffee,
  Award,
  TrendingUp
} from 'lucide-react';

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const techStack = [
    { name: 'React.js', icon: '⚛️', color: 'bg-blue-500' },
    { name: 'Java', icon: '☕', color: 'bg-orange-500' },
    { name: 'Spring Boot', icon: '🍃', color: 'bg-green-500' },
    { name: 'Node.js', icon: '🟢', color: 'bg-green-500' },
    { name: 'MongoDB', icon: '🍃', color: 'bg-green-600' },
    { name: 'JavaScript', icon: '🟨', color: 'bg-yellow-500' },
    { name: 'My-Sql', icon: '🍃', color: 'bg-green-600' }
  ];

  const highlights = [
    {
      icon: TrendingUp,
      title: '5+ Projects',
      description: 'Successfully delivered',
      color: 'text-green-500'
    },
    {
      icon: Award,
      title: 'MCA Graduate',
      description: 'From MDU University',
      color: 'text-blue-500'
    },
    {
      icon: Coffee,
      title: 'Current Role',
      description: 'Full Stack Developer',
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8 animate-fade-in">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Zap className="w-4 h-4" />
                  Available for Full-time Opportunities
                </div>

                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                    Ishwar Sharma
                  </span>
                </h1>

                <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-muted-foreground mb-4">
                  Full Stack Developer
                </h2>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Crafting scalable web applications with modern technologies.
                  Specializing in <span className="text-primary font-semibold">Node.js</span>,
                  <span className="text-accent font-semibold"> React</span> &
                  <span className="text-primary font-semibold"> MongoDB</span>
                  to bring innovative ideas to life.
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-lg">{tech.icon}</span>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/projects">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    View My Work
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open('https://linkedin.com/in/ishwar-sharma-4671002a7', '_blank')}
                    className="px-6 py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open('https://github.com/Ishwar78', '_blank')}
                    className="px-6 py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {highlights.map((item, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted mb-3 ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="text-xl font-bold text-foreground">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image with Enhanced Design */}
            <div className="flex justify-center lg:justify-end animate-scale-in">
              <div className="relative">
                {/* Background Effects */}
                <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-3xl animate-pulse"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-transparent to-accent/30 rounded-2xl"></div>

                {/* Main Image Container */}
                <div className="relative bg-card border-4 border-white dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F87eb002ee03c43d6b1644e21c19740f3%2F317b3845920143548dd342b58c56c24d?format=webp&width=800"
                    alt="Ishwar Sharma - Full Stack Developer"
                    className="w-80 h-96 md:w-96 md:h-[28rem] object-cover"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold">Available</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-lg animate-float delay-1000">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span className="text-sm font-semibold">Full Stack</span>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-8 bg-accent text-accent-foreground px-3 py-1 rounded-lg shadow-lg animate-float delay-500">
                  <span className="text-xs font-semibold">1 Year</span>
                </div>
              </div>
            </div>
          </div>
        </div>

    
      
      </section>

      {/* Quick Navigation Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore My Portfolio</h2>
              <p className="text-xl text-muted-foreground">Discover my skills, experience, and projects</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/about" className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">About Me</h3>
                    <p className="text-muted-foreground text-sm">Learn about my journey and passion for development</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/skills" className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Skills</h3>
                    <p className="text-muted-foreground text-sm">Technical expertise and tools I work with</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/experience" className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Experience</h3>
                    <p className="text-muted-foreground text-sm">Professional journey and achievements</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/contact" className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MailIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Contact</h3>
                    <p className="text-muted-foreground text-sm">Let's discuss your next project</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Project</h2>
              <p className="text-xl text-muted-foreground">Showcasing my latest work</p>
            </div>

            <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Vikson International</h3>
                    <Badge variant="secondary" className="mb-4">Live Production</Badge>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="outline">React.js</Badge>
                      <Badge variant="outline">MongoDB Atlas</Badge>
                      <Badge variant="outline">Node.js</Badge>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <h4 className="text-xl font-semibold mb-4 text-primary">Pharmaceutical Company Website</h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    A modern, responsive website built with React.js and powered by MongoDB Atlas.
                    Features include product showcase, contact management, and admin dashboard
                    for content management.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => window.open('http://viksoninternationalmedisys.com/', '_blank')}
                      className="flex-1"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      View Live
                    </Button>
                    <Link to="/projects" className="flex-1">
                      <Button variant="outline" className="w-full">
                        All Projects
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => window.open('https://github.com/Ishwar78', '_blank')}
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => window.open('https://linkedin.com/in/ishwar-sharma-4671002a7', '_blank')}
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => window.open('/resume.pdf', '_blank')}
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-muted-foreground text-center">
              © 2025 Ishwar Sharma |
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
