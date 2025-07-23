import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Code2 } from 'lucide-react';

export default function About() {
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

  return (
    <div className="min-h-screen bg-background">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* About Section */}
      <section className="pt-24 pb-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                About Me
              </h1>
              <p className="text-xl text-muted-foreground">Get to know me better</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center animate-slide-up">
              {/* Profile Image */}
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
                  <div className="relative">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F87eb002ee03c43d6b1644e21c19740f3%2F317b3845920143548dd342b58c56c24d?format=webp&width=800"
                      alt="Ishwar Sharma"
                      className="w-80 h-96 object-cover rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* About Text */}
              <div className="text-center md:text-left space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Full Stack Developer</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I am a well-qualified Full Stack Developer experienced with both frontend and backend stacks.
                    {/* I specialize in Node.js, React.js, and MongoDB. */}
                    Currently working at{' '}
                    <span className="text-primary font-semibold">Satya Web Technology</span> as a Full Stack Developer.
                  </p>
                </div>
                
                <div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I enjoy building fast, scalable, and modern web applications that solve real-world problems 
                    and provide excellent user experiences. My passion lies in creating clean, efficient code 
                    and staying up-to-date with the latest technologies.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">What I Do</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-primary" />
                      Full Stack Web Development
                    </li>
                    <li className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-primary" />
                      REST API Development
                    </li>
                    <li className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-primary" />
                      Database Design & Management
                    </li>
                    <li className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-primary" />
                      Modern UI/UX Implementation
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">My Journey</h3>
                  <p className="text-muted-foreground">
                    Started my journey with a DCA from Hartron Skill Center, followed by BCA and MCA from MDU. 
                    Gained practical experience through a 6-month internship at AAM Infotech Pvt. Ltd, Gurugram, 
                    and now working full-time as a Full Stack Developer at Satya Web Technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
