import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle
} from 'lucide-react';

export default function Experience() {
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

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Satya Web Technology',
      location: 'Rohtak, India',
      period: '2024 - Present',
      type: 'Full-time',
      current: true,
      description: 'Working on real-world projects using Node.js, React, and MongoDB. Developing scalable web applications and collaborating with cross-functional teams to deliver high-quality software solutions.',
      responsibilities: [
        'Developing full-stack web applications using Node.js,  and React.js',
        'Designing and implementing RESTful APIs for frontend-backend communication',
        'Database design and optimization using MongoDB',
        'Collaborating with UI/UX designers to implement responsive designs',
        'Code review and mentoring junior developers',
        'Participating in agile development processes'
      ],
      technologies: ['Node.js','React.js', 'MongoDB', 'JavaScript', 'HTML', 'CSS']
    },
    {
      title: 'Full Stack Developer Intern',
      company: 'AAM Infotech Pvt. Ltd',
      location: 'Gurugram, India',
      period: '6 Months (2023)',
      type: 'Internship',
      current: false,
      description: 'Gained hands-on experience in REST API development, Agile team collaboration, Git version control, and working with Oracle & MySQL databases. Contributed to multiple client projects and learned industry best practices.',
      responsibilities: [
        'Developed REST APIs using Java and Spring Boot',
        'Worked with Oracle and MySQL databases',
        'Participated in Agile development methodology',
        'Version control using Git and GitHub',
        'Collaborated with senior developers on client projects',
        'Learned software development best practices'
      ],
      technologies: ['Java', 'Spring Boot', 'Oracle', 'MySQL', 'Git', 'REST APIs']
    }
  ];

  const achievements = [
    'Successfully delivered 5+ client projects at Satya Web Technology',
    'Improved application performance by 30% through database optimization',
    'Mentored 2 junior developers and conducted code reviews',
    'Implemented automated testing reducing bugs by 40%',
    'Led frontend development for company\'s flagship product'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Experience Section */}
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Work Experience
              </h1>
              <p className="text-xl text-muted-foreground">My professional journey and career highlights</p>
            </div>
            
            {/* Experience Timeline */}
            <div className="mb-16 animate-slide-up">
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${exp.current ? 'bg-primary/10' : 'bg-muted'}`}>
                            <Briefcase className={`w-6 h-6 ${exp.current ? 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-primary">{exp.title}</CardTitle>
                            <CardDescription className="text-lg font-semibold">{exp.company}</CardDescription>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant={exp.current ? "default" : "secondary"}>
                                {exp.current ? 'Current' : exp.type}
                              </Badge>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {exp.period}
                              </Badge>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {exp.location}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                      
                      {/* Responsibilities */}
                      <div>
                        <h4 className="font-semibold mb-3">Key Responsibilities</h4>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="flex items-start gap-2 text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="animate-slide-up">
              <h2 className="text-3xl font-semibold mb-8 text-center">Key Achievements</h2>
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
