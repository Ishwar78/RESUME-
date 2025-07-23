import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Globe,
  Code2,
  Database,
  GraduationCap
} from 'lucide-react';

export default function Skills() {
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

  const skills = [
    { name: 'HTML', category: 'Frontend', level: 90 },
    { name: 'CSS', category: 'Frontend', level: 85 },
    { name: 'Bootstrap', category: 'Frontend', level: 80 },
    { name: 'JavaScript', category: 'Frontend', level: 85 },
    { name: 'React.js', category: 'Frontend', level: 88 },
    { name: 'Java', category: 'Backend', level: 90 },
    { name: 'Spring Boot', category: 'Backend', level: 85 },
    { name: 'MySQL', category: 'Database', level: 80 }
  ];

  const tools = [
    'Eclipse IDE', 'VS Code', 'GitHub', 'Notepad', 'WordPress'
  ];

  const education = [
    { 
      degree: 'MCA', 
      institution: 'MDU', 
      year: '2024',
      description: 'Master of Computer Applications with focus on advanced programming and software development'
    },
    { 
      degree: 'BCA', 
      institution: 'MDU', 
      year: '2022',
      description: 'Bachelor of Computer Applications covering programming fundamentals and computer science concepts'
    },
    { 
      degree: 'DCA', 
      institution: 'Hartron Skill Center', 
      year: '2020',
      description: 'Diploma in Computer Applications focusing on basic computer skills and office applications'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Skills Section */}
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Skills & Tools
              </h1>
              <p className="text-xl text-muted-foreground">My technical expertise and qualifications</p>
            </div>
            
            {/* Technical Skills */}
            <div className="mb-16 animate-slide-up">
              <h2 className="text-3xl font-semibold mb-8 text-center">Technical Skills</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skills.map((skill, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        {skill.category === 'Frontend' && <Globe className="w-10 h-10 mx-auto text-tech-blue" />}
                        {skill.category === 'Backend' && <Code2 className="w-10 h-10 mx-auto text-tech-green" />}
                        {skill.category === 'Database' && <Database className="w-10 h-10 mx-auto text-tech-purple" />}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                      <Badge variant="secondary" className="mb-3">{skill.category}</Badge>
                      
                      {/* Skill Level Bar */}
                      <div className="w-full bg-muted rounded-full h-2 mb-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tools & Technologies */}
            <div className="mb-16 animate-slide-up">
              <h2 className="text-3xl font-semibold mb-8 text-center">Tools & Technologies</h2>
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex flex-wrap justify-center gap-4">
                    {tools.map((tool, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="px-6 py-3 text-base hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Education */}
            <div className="animate-slide-up">
              <h2 className="text-3xl font-semibold mb-8 text-center">Education</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {education.map((edu, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-8">
                      <GraduationCap className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <h3 className="font-bold text-xl mb-2">{edu.degree}</h3>
                      <h4 className="font-semibold text-lg text-muted-foreground mb-2">{edu.institution}</h4>
                      <Badge variant="secondary" className="mb-4">{edu.year}</Badge>
                      <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
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
