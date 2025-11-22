import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useApi } from '../hooks/useApi';
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle, Trash2, Plus, Edit3 } from 'lucide-react';
import { IProject } from '@shared/types';

export default function AdminProjects() {
  const { request } = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<IProject>>({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await request<IProject[]>('/api/admin/projects');
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewProject = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      techStack: [],
      role: '',
      projectType: 'personal',
      startDate: new Date(),
      isOngoing: false,
      isFeatured: false,
      order: 0,
    });
    setShowForm(true);
  };

  const handleEditProject = (project: IProject) => {
    setEditingId(project._id?.toString() || null);
    setFormData(project);
    setShowForm(true);
  };

  const handleSaveProject = async () => {
    if (!formData.title || !formData.slug) {
      setError('Title and slug are required');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        await request(`/api/admin/projects/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await request('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      setShowForm(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    setIsSaving(true);
    try {
      await request(`/api/admin/projects/${id}`, { method: 'DELETE' });
      setSuccess(true);
      loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/admin/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card className="border-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Projects Management</CardTitle>
                <CardDescription>Manage your portfolio projects</CardDescription>
              </div>
              <Button onClick={handleNewProject} disabled={showForm}>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                <span className="text-sm text-red-800">{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm text-green-800">Changes saved!</span>
              </div>
            )}

            {/* Form */}
            {showForm && (
              <div className="p-6 bg-muted/50 rounded-lg space-y-4 border-2 border-dashed">
                <h3 className="font-semibold">{editingId ? 'Edit Project' : 'New Project'}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      name="title"
                      value={formData.title || ''}
                      onChange={handleInputChange}
                      placeholder="Project name"
                    />
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <Input
                      name="slug"
                      value={formData.slug || ''}
                      onChange={handleInputChange}
                      placeholder="project-name"
                    />
                  </div>
                </div>
                <div>
                  <Label>Short Description</Label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription || ''}
                    onChange={handleInputChange}
                    placeholder="Brief description"
                    className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    rows={2}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Role</Label>
                    <Input
                      name="role"
                      value={formData.role || ''}
                      onChange={handleInputChange}
                      placeholder="e.g., Full Stack Developer"
                    />
                  </div>
                  <div>
                    <Label>Project Type</Label>
                    <select
                      name="projectType"
                      value={formData.projectType || 'personal'}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    >
                      <option value="personal">Personal</option>
                      <option value="freelance">Freelance</option>
                      <option value="internship">Internship</option>
                      <option value="client work">Client Work</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Tech Stack (comma separated)</Label>
                    <Input
                      name="techStack"
                      value={(formData.techStack as string[])?.join(', ') || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          techStack: e.target.value.split(',').map((s) => s.trim()),
                        }))
                      }
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div>
                    <Label>Live URL</Label>
                    <Input
                      name="liveUrl"
                      value={formData.liveUrl || ''}
                      onChange={handleInputChange}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label>GitHub URL</Label>
                    <Input
                      name="githubUrl"
                      value={formData.githubUrl || ''}
                      onChange={handleInputChange}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured || false}
                      onChange={handleInputChange}
                    />
                    <span className="text-sm">Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isOngoing"
                      checked={formData.isOngoing || false}
                      onChange={handleInputChange}
                    />
                    <span className="text-sm">Ongoing</span>
                  </label>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveProject} disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Projects List */}
            <div className="space-y-3">
              {projects.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No projects yet</p>
              ) : (
                projects.map((project) => (
                  <div key={project._id?.toString()} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm">{project.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{project.shortDescription}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProject(project._id?.toString() || '')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
