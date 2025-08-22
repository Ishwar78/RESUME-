import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
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

  const projects = [
    {
      name: 'Vikson International Medisys',
      description: 'A modern, responsive pharmaceutical company website built with React.js and powered by MongoDB Atlas. Features include product showcase, contact management, admin dashboard, and real-time inventory tracking.',
      tech: ['React.js', 'MongoDB Atlas', 'Node.js', 'Express.js', 'JavaScript', 'CSS3'],
      liveUrl: 'http://viksoninternationalmedisys.com/',
      featured: true,
      image: '/placeholder.svg'
    },
    {
      name: 'Shopping-Web',
      description: 'E-commerce platform built with Spring Boot and modern web technologies.',
      tech: ['Spring Boot', 'Java', 'MySQL', 'React'],
      githubUrl: '#',
      image: '/placeholder.svg'
    },
    {
      name: 'Hotel Management System',
      description: 'Full-featured hotel management system with booking and administration capabilities.',
      tech: ['Java', 'Spring Boot', 'MySQL'],
      githubUrl: '#',
      image: '/placeholder.svg'
    },
    {
      name: 'Expense Tracker',
      description: 'Personal finance tracking application with data visualization.',
      tech: ['Spring Boot', 'JavaScript', 'MySQL'],
      githubUrl: '#',
      image: '/placeholder.svg'
    },
    {
      name: 'Bank Management System',
      description: 'Comprehensive banking solution with account management and transactions.',
      tech: ['Java', 'MySQL', 'Spring Boot'],
      githubUrl: '#',
      image: '/placeholder.svg'
    },
    {
      name: 'Myntra React Clone',
      description: 'E-commerce fashion website clone built with React.',
      tech: ['React', 'JavaScript', 'CSS'],
      githubUrl: '#',
      image: '/placeholder.svg'
    },
    {
      name: 'ShopEase',
      description: 'Modern e-commerce platform with clean UI and smooth user experience.',
      tech: ['React', 'JavaScript', 'CSS'],
      liveUrl: 'https://salestore.netlify.app/',
      image: '/placeholder.svg'
    },
    {
      name: 'Skincare Store',
      description: 'E-commerce platform specialized for skincare products.',
      tech: ['React', 'JavaScript', 'CSS'],
      liveUrl: 'https://skincare-store.netlify.app/',
      image: '/placeholder.svg'
    },
    {
      name: 'Laptop Store',
      description: 'Electronics e-commerce platform focused on laptops and accessories.',
      tech: ['React', 'JavaScript', 'CSS'],
      liveUrl: 'https://storelaptop.netlify.app/',
      image: '/placeholder.svg'
    },
    {
      name: 'Premium Car Sale',
      description: 'Luxury car marketplace with advanced filtering and search.',
      tech: ['React', 'JavaScript', 'CSS'],
      liveUrl: 'https://salecar.netlify.app/',
      image: '/placeholder.svg'
    },
    {
      name: 'Auction Platform',
      description: 'Online auction platform with real-time bidding capabilities.',
      tech: ['React', 'JavaScript', 'CSS'],
      liveUrl: 'https://auctionplat.netlify.app/',
      image: '/placeholder.svg'
    },
    {
      name: 'JB Industries',
      description: 'Modern industrial website showcasing company services and products with professional design and user-friendly interface.',
      tech: ['React', 'JavaScript', '"Tailwind CSS"','MongoDB', 'Node.js'],
      liveUrl: 'https://jbinds.com',
      githubUrl: 'https://github.com/Ishwar78/Jbindus',
      featured: true,
      image: '/placeholder.svg'
    },
    {
      name: 'Intelligate Solution',
      description: 'Professional consultancy website for job hiring and recruitment services. Features job postings, candidate management, and hiring solutions.',
      tech: ['React', 'Node.js',"Tailwind CSS", 'MongoDB', 'Express.js'],
      liveUrl: 'https://intelligatesolution.com/',
      githubUrl: 'https://github.com/Ishwar78/Intelligate',
      featured: true,
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Projects Section */}
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                My Projects
              </h1>
              <p className="text-xl text-muted-foreground">A showcase of my work and achievements</p>
            </div>
            
            {/* Live Projects */}
            <div className="mb-16 animate-slide-up">
              <h2 className="text-3xl font-semibold mb-8 text-center">Live Projects</h2>
              {projects.filter(p => p.featured).map((project, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/20">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Project Image */}
                    <div className="bg-muted flex items-center justify-center p-8">
                      <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <ExternalLink className="w-16 h-16 text-primary" />
                      </div>
                    </div>
                    
                    {/* Project Details */}
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <CardTitle className="text-2xl text-primary mb-2">{project.name}</CardTitle>
                          <Badge variant="default" className="mb-4">Live Project</Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                      <Button 
                        onClick={() => window.open(project.liveUrl, '_blank')}
                        className="bg-primary hover:bg-primary/90 w-fit"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live Site
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Other Projects */}
            <div className="animate-slide-up">
              <h2 className="text-3xl font-semibold mb-8 text-center">Other Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.filter(p => !p.featured).map((project, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                    {/* Project Image */}
                    <div className="h-48 bg-muted flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <ExternalLink className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-6">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <Button 
                            size="sm" 
                            onClick={() => window.open(project.liveUrl, '_blank')}
                            className="flex-1"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Live
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.open(project.githubUrl, '_blank')}
                            className="flex-1"
                          >
                            <Github className="w-3 h-3 mr-1" />
                            Code
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
