import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useApi } from '../hooks/useApi';
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle, Trash2, Plus, Edit3 } from 'lucide-react';
import { IExperienceEntry } from '../../server/models/ExperienceEntry';

export default function AdminExperience() {
  const { request } = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [experience, setExperience] = useState<IExperienceEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<IExperienceEntry>>({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadExperience();
  }, []);

  const loadExperience = async () => {
    try {
      setIsLoading(true);
      const data = await request<IExperienceEntry[]>('/api/admin/experience');
      setExperience(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load experience');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewEntry = () => {
    setEditingId(null);
    setFormData({
      companyName: '',
      roleTitle: '',
      employmentType: 'full-time',
      location: '',
      startDate: new Date(),
      isCurrent: false,
      descriptionBullets: [],
      techUsed: [],
      order: 0,
    });
    setShowForm(true);
  };

  const handleEditEntry = (entry: IExperienceEntry) => {
    setEditingId(entry._id?.toString() || null);
    setFormData(entry);
    setShowForm(true);
  };

  const handleSaveEntry = async () => {
    if (!formData.companyName || !formData.roleTitle) {
      setError('Company name and role are required');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        await request(`/api/admin/experience/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await request('/api/admin/experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      setShowForm(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      loadExperience();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (!confirm('Delete this experience entry?')) return;
    setIsSaving(true);
    try {
      await request(`/api/admin/experience/${id}`, { method: 'DELETE' });
      setSuccess(true);
      loadExperience();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
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

  const handleAddBullet = () => {
    setFormData((prev) => ({
      ...prev,
      descriptionBullets: [...(prev.descriptionBullets || []), ''],
    }));
  };

  const handleBulletChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      descriptionBullets: prev.descriptionBullets?.map((b, i) => (i === index ? value : b)),
    }));
  };

  const handleRemoveBullet = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      descriptionBullets: prev.descriptionBullets?.filter((_, i) => i !== index),
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
                <CardTitle>Experience Management</CardTitle>
                <CardDescription>Manage your work experience</CardDescription>
              </div>
              <Button onClick={handleNewEntry} disabled={showForm}>
                <Plus className="h-4 w-4 mr-2" />
                New Entry
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
                <h3 className="font-semibold">{editingId ? 'Edit Experience' : 'New Experience'}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Company Name</Label>
                    <Input
                      name="companyName"
                      value={formData.companyName || ''}
                      onChange={handleInputChange}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <Label>Role Title</Label>
                    <Input
                      name="roleTitle"
                      value={formData.roleTitle || ''}
                      onChange={handleInputChange}
                      placeholder="Job title"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Employment Type</Label>
                    <select
                      name="employmentType"
                      value={formData.employmentType || 'full-time'}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="internship">Internship</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      name="location"
                      value={formData.location || ''}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      name="startDate"
                      type="date"
                      value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          startDate: new Date(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>End Date (if not current)</Label>
                    <Input
                      name="endDate"
                      type="date"
                      value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          endDate: e.target.value ? new Date(e.target.value) : undefined,
                        }))
                      }
                      disabled={formData.isCurrent}
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isCurrent"
                    checked={formData.isCurrent || false}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm">Currently working here</span>
                </label>

                <div>
                  <Label>Description Bullets</Label>
                  <div className="space-y-2">
                    {formData.descriptionBullets?.map((bullet, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={bullet}
                          onChange={(e) => handleBulletChange(index, e.target.value)}
                          placeholder={`• Bullet point ${index + 1}`}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveBullet(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleAddBullet}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Bullet
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Tech Used (comma separated)</Label>
                  <Input
                    value={(formData.techUsed as string[])?.join(', ') || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        techUsed: e.target.value.split(',').map((s) => s.trim()),
                      }))
                    }
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveEntry} disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setShowForm(false)} disabled={isSaving}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Experience List */}
            <div className="space-y-3">
              {experience.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No experience entries yet</p>
              ) : (
                experience.map((entry) => (
                  <div
                    key={entry._id?.toString()}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm">{entry.roleTitle}</h4>
                      <p className="text-xs text-muted-foreground">
                        {entry.companyName} • {entry.employmentType}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => handleEditEntry(entry)}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEntry(entry._id?.toString() || '')}
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
