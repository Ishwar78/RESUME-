import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { ArrowLeft, Github, Globe, Loader2 } from 'lucide-react';
import { IProject } from '@shared/types';
import ReactMarkdown from 'react-markdown';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [darkMode, setDarkMode] = useState(false);
  const [project, setProject] = useState<IProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/projects/${slug}`);
        if (!response.ok) throw new Error('Project not found');
        const data = await response.json();
        setProject(data);

        // Update page title and meta
        document.title = `${data.title} | Portfolio`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', data.shortDescription);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadProject();
    }
  }, [slug]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">{error || 'The project you are looking for does not exist.'}</p>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/projects">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack?.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>

            <p className="text-xl text-muted-foreground mb-6">{project.shortDescription}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border">
              <div>
                <div className="text-sm text-muted-foreground">Role</div>
                <div className="font-semibold">{project.role}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="font-semibold capitalize">{project.projectType}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Duration</div>
                <div className="font-semibold">
                  {new Date(project.startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                  {project.isOngoing
                    ? ' - Present'
                    : ` - ${new Date(project.endDate || '').toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}`}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <Button onClick={() => window.open(project.liveUrl, '_blank')}>
                  <Globe className="h-4 w-4 mr-2" />
                  View Live
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" onClick={() => window.open(project.githubUrl, '_blank')}>
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </Button>
              )}
            </div>
          </div>

          {/* Thumbnail Image */}
          {project.thumbnailImageUrl && (
            <Card className="overflow-hidden mb-12 border-2">
              <img
                src={project.thumbnailImageUrl}
                alt={project.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </Card>
          )}

          {/* Content */}
          {project.detail?.markdownContent && (
            <div className="prose dark:prose-invert max-w-none mb-12">
              <ReactMarkdown>{project.detail.markdownContent}</ReactMarkdown>
            </div>
          )}

          {/* Sections */}
          {project.detail?.sections && project.detail.sections.length > 0 && (
            <div className="space-y-8 mb-12">
              {project.detail.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{section.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Gallery */}
          {project.detail?.galleryImages && project.detail.galleryImages.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.detail.galleryImages.map((image, index) => (
                  <Card key={index} className="overflow-hidden border-2 hover:shadow-lg transition-shadow">
                    <img
                      src={image.url}
                      alt={image.caption || `Gallery image ${index + 1}`}
                      className="w-full h-64 object-cover"
                    />
                    {image.caption && (
                      <div className="p-3 bg-muted">
                        <p className="text-sm text-muted-foreground">{image.caption}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Video */}
          {project.detail?.demoVideoUrl && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Demo</h2>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-border"
                  src={project.detail.demoVideoUrl}
                  title="Project Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Related Links */}
          {(project.liveUrl || project.githubUrl) && (
            <Card className="p-6 bg-muted/50 border-2 border-dashed">
              <h3 className="text-lg font-semibold mb-4">Project Links</h3>
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    → Live Website
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    → GitHub Repository
                  </a>
                )}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
