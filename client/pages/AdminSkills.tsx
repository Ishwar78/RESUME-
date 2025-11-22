import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useApi } from '../hooks/useApi';
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle, Trash2, Plus, Edit2 } from 'lucide-react';
import { ISkillCategory, ISkill } from '../../server/models/SkillCategory';

export default function AdminSkills() {
  const { request } = useApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<ISkillCategory[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState<{ [key: string]: ISkill }>({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const data = await request<ISkillCategory[]>('/api/admin/skills');
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setIsSaving(true);
    try {
      await request('/api/admin/skills-category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory, order: categories.length }),
      });
      setNewCategory('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add category');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    setIsSaving(true);
    try {
      await request(`/api/admin/skills-category/${id}`, { method: 'DELETE' });
      setSuccess(true);
      loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSkill = async (categoryId: string) => {
    const skill = newSkill[categoryId];
    if (!skill?.label) return;
    setIsSaving(true);
    try {
      await request(`/api/admin/skills-category/${categoryId}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill),
      });
      setNewSkill((prev) => ({ ...prev, [categoryId]: { label: '', level: 'Intermediate', showInHighlights: false } }));
      setSuccess(true);
      loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add skill');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSkill = async (categoryId: string, skillId: string) => {
    if (!confirm('Delete this skill?')) return;
    setIsSaving(true);
    try {
      await request(`/api/admin/skills-category/${categoryId}/skills/${skillId}`, { method: 'DELETE' });
      setSuccess(true);
      loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete skill');
    } finally {
      setIsSaving(false);
    }
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
      <div className="max-w-3xl mx-auto">
        <Link to="/admin/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Skills Management</CardTitle>
            <CardDescription>Organize your skills by category and proficiency</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-800">{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-green-800">Changes saved!</span>
              </div>
            )}

            {/* Add New Category */}
            <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
              <Label>Add New Category</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Frontend, Backend, Tools"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button onClick={handleAddCategory} disabled={isSaving || !newCategory.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Categories List */}
            <div className="space-y-4">
              {categories.map((category) => (
                <Card key={category._id as string} className="border">
                  <CardHeader
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setExpandedCategory(expandedCategory === (category._id as string) ? null : (category._id as string))}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription>{category.skills?.length || 0} skills</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category._id as string);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  {expandedCategory === (category._id as string) && (
                    <CardContent className="space-y-4 border-t pt-4">
                      {/* Skills in Category */}
                      <div className="space-y-2">
                        {category.skills?.map((skill) => (
                          <div key={skill._id as string} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium">{skill.label}</div>
                              <div className="text-xs text-muted-foreground">{skill.level}</div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSkill(category._id as string, skill._id as string)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      {/* Add Skill to Category */}
                      <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                        <Label className="text-sm">Add Skill</Label>
                        <Input
                          placeholder="Skill name"
                          value={newSkill[category._id as string]?.label || ''}
                          onChange={(e) =>
                            setNewSkill((prev) => ({
                              ...prev,
                              [category._id as string]: {
                                label: e.target.value,
                                level: 'Intermediate',
                                showInHighlights: false,
                              },
                            }))
                          }
                        />
                        <select
                          value={newSkill[category._id as string]?.level || 'Intermediate'}
                          onChange={(e) =>
                            setNewSkill((prev) => ({
                              ...prev,
                              [category._id as string]: {
                                ...prev[category._id as string],
                                level: e.target.value as ISkill['level'],
                              },
                            }))
                          }
                          className="w-full px-3 py-2 border border-input rounded-md text-sm"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                        <Button
                          className="w-full"
                          onClick={() => handleAddSkill(category._id as string)}
                          disabled={isSaving || !newSkill[category._id as string]?.label}
                        >
                          Add Skill
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
