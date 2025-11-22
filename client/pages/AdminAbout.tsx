import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useApi } from '../hooks/useApi';
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle, X, Plus } from 'lucide-react';
import { IAboutSection, ISocialLink } from '../../server/models/AboutSection';

export default function AdminAbout() {
  const { request } = useApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [about, setAbout] = useState<Partial<IAboutSection>>({
    name: '',
    headline: '',
    shortSummary: '',
    longDescription: '',
    location: '',
    yearsOfExperience: 1,
    profilePhotoUrl: '',
    resumeFileUrl: '',
    socialLinks: [],
  });
  const [socialLink, setSocialLink] = useState({ type: 'github' as ISocialLink['type'], label: '', url: '' });

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const data = await request<Partial<IAboutSection>>('/api/admin/about');
        setAbout(data);
      } catch (err) {
        console.error('Error loading about:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAbout();
  }, [request]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAbout((prev) => ({
      ...prev,
      [name]: name === 'yearsOfExperience' ? parseInt(value, 10) : value,
    }));
  };

  const handleAddSocialLink = () => {
    if (!socialLink.label || !socialLink.url) {
      setError('Please fill in all social link fields');
      return;
    }
    setAbout((prev) => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), socialLink],
    }));
    setSocialLink({ type: 'github', label: '', url: '' });
    setError(null);
  };

  const handleRemoveSocialLink = (index: number) => {
    setAbout((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks?.filter((_, i) => i !== index),
    }));
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePhotoUrl' | 'resumeFileUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsSaving(true);
      const uploadEndpoint = field === 'profilePhotoUrl' ? '/api/admin/upload/image' : '/api/admin/upload/pdf';
      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setAbout((prev) => ({ ...prev, [field]: data.url }));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Upload failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      await request('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(about),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
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
            <CardTitle>About Section</CardTitle>
            <CardDescription>Manage your profile information and social links</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">Changes saved successfully!</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={about.name || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headline">Headline / Role</Label>
                    <Input
                      id="headline"
                      name="headline"
                      placeholder="Full Stack Developer"
                      value={about.headline || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, Country"
                      value={about.location || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                    <Input
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      type="number"
                      value={about.yearsOfExperience || 1}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortSummary">Short Summary (2-3 lines)</Label>
                  <Textarea
                    id="shortSummary"
                    name="shortSummary"
                    value={about.shortSummary || ''}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longDescription">Long Description / Bio</Label>
                  <Textarea
                    id="longDescription"
                    name="longDescription"
                    value={about.longDescription || ''}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Files</h3>

                <div className="space-y-2">
                  <Label htmlFor="profilePhoto">Profile Photo</Label>
                  <div className="flex gap-4">
                    <input
                      id="profilePhoto"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadImage(e, 'profilePhotoUrl')}
                      disabled={isSaving}
                      className="flex-1"
                    />
                    {about.profilePhotoUrl && <span className="text-sm text-green-600 self-center">✓ Uploaded</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resumeFile">Resume PDF</Label>
                  <div className="flex gap-4">
                    <input
                      id="resumeFile"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleUploadImage(e, 'resumeFileUrl')}
                      disabled={isSaving}
                      className="flex-1"
                    />
                    {about.resumeFileUrl && <span className="text-sm text-green-600 self-center">✓ Uploaded</span>}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Links</h3>

                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <div className="grid md:grid-cols-3 gap-2">
                    <div>
                      <Label className="text-xs">Type</Label>
                      <select
                        value={socialLink.type}
                        onChange={(e) =>
                          setSocialLink({
                            ...socialLink,
                            type: e.target.value as ISocialLink['type'],
                          })
                        }
                        className="w-full px-3 py-2 border border-input rounded-md text-sm"
                      >
                        <option value="github">GitHub</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="twitter">Twitter</option>
                        <option value="email">Email</option>
                        <option value="website">Website</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs">Label</Label>
                      <Input
                        placeholder="e.g., GitHub Profile"
                        value={socialLink.label}
                        onChange={(e) => setSocialLink({ ...socialLink, label: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">URL</Label>
                      <Input
                        placeholder="https://..."
                        value={socialLink.url}
                        onChange={(e) => setSocialLink({ ...socialLink, url: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddSocialLink}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Social Link
                  </Button>
                </div>

                {about.socialLinks && about.socialLinks.length > 0 && (
                  <div className="space-y-2">
                    {about.socialLinks.map((link, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <div className="flex-1 text-sm">
                          <div className="font-semibold">{link.label}</div>
                          <div className="text-muted-foreground text-xs">{link.type}</div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSocialLink(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-6 border-t">
                <Button type="submit" disabled={isSaving}>
                  {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Link to="/admin/dashboard">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
