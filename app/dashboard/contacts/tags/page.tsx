"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tag,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  Hash,
  Search
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/*
 * SUPABASE SCHEMA:
 * 
 * Table: tags
 * Columns:
 * - id: uuid (PRIMARY KEY)
 * - name: text (UNIQUE)
 * - color: text
 * - description: text
 * - usage_count: integer
 * - created_by: uuid (FOREIGN KEY to profiles)
 * - created_at: timestamptz
 * - category: text (industry, status, priority, custom)
 * 
 * Table: contact_tags (junction table)
 * Columns:
 * - contact_id: uuid (FOREIGN KEY to contacts)
 * - tag_id: uuid (FOREIGN KEY to tags)
 * - created_at: timestamptz
 * PRIMARY KEY (contact_id, tag_id)
 */

interface Tag {
  id: string;
  name: string;
  color: string;
  description: string;
  usage_count: number;
  category: string;
  created_by: string;
  created_at: string;
}

const tagsData: Tag[] = [
  {
    id: "1",
    name: "VIP",
    color: "bg-yellow-500 text-yellow-500",
    description: "High-value customers requiring special attention",
    usage_count: 47,
    category: "Priority",
    created_by: "Emily Rodriguez",
    created_at: "2024-01-15",
  },
  {
    id: "2",
    name: "Real Estate",
    color: "bg-blue-500 text-blue-500",
    description: "Contacts in the real estate industry",
    usage_count: 89,
    category: "Industry",
    created_by: "Michael Chen",
    created_at: "2024-01-10",
  },
  {
    id: "3",
    name: "Technology",
    color: "bg-purple-500 text-purple-500",
    description: "Tech companies and startups",
    usage_count: 65,
    category: "Industry",
    created_by: "James Wilson",
    created_at: "2024-01-12",
  },
  {
    id: "4",
    name: "Healthcare",
    color: "bg-green-500 text-green-500",
    description: "Healthcare and wellness sector contacts",
    usage_count: 43,
    category: "Industry",
    created_by: "Emily Rodriguez",
    created_at: "2024-01-08",
  },
  {
    id: "5",
    name: "Hot Lead",
    color: "bg-red-500 text-red-500",
    description: "High-priority leads with immediate potential",
    usage_count: 28,
    category: "Status",
    created_by: "Michael Chen",
    created_at: "2024-01-20",
  },
  {
    id: "6",
    name: "Partner",
    color: "bg-indigo-500 text-indigo-500",
    description: "Strategic business partners",
    usage_count: 12,
    category: "Status",
    created_by: "James Wilson",
    created_at: "2024-01-05",
  },
  {
    id: "7",
    name: "Automotive",
    color: "bg-orange-500 text-orange-500",
    description: "Auto dealerships and related services",
    usage_count: 34,
    category: "Industry",
    created_by: "Emily Rodriguez",
    created_at: "2024-01-18",
  },
  {
    id: "8",
    name: "Food & Beverage",
    color: "bg-pink-500 text-pink-500",
    description: "Restaurants, distributors, and F&B businesses",
    usage_count: 56,
    category: "Industry",
    created_by: "Michael Chen",
    created_at: "2024-01-14",
  },
  {
    id: "9",
    name: "High Value",
    color: "bg-emerald-500 text-emerald-500",
    description: "Accounts with significant revenue potential",
    usage_count: 38,
    category: "Priority",
    created_by: "James Wilson",
    created_at: "2024-01-22",
  },
  {
    id: "10",
    name: "Legal",
    color: "bg-slate-500 text-slate-500",
    description: "Law firms and legal service providers",
    usage_count: 15,
    category: "Industry",
    created_by: "Emily Rodriguez",
    created_at: "2024-01-25",
  },
];

const colorOptions = [
  { value: "bg-red-500 text-red-500", label: "Red", preview: "bg-red-500" },
  { value: "bg-orange-500 text-orange-500", label: "Orange", preview: "bg-orange-500" },
  { value: "bg-yellow-500 text-yellow-500", label: "Yellow", preview: "bg-yellow-500" },
  { value: "bg-green-500 text-green-500", label: "Green", preview: "bg-green-500" },
  { value: "bg-emerald-500 text-emerald-500", label: "Emerald", preview: "bg-emerald-500" },
  { value: "bg-blue-500 text-blue-500", label: "Blue", preview: "bg-blue-500" },
  { value: "bg-indigo-500 text-indigo-500", label: "Indigo", preview: "bg-indigo-500" },
  { value: "bg-purple-500 text-purple-500", label: "Purple", preview: "bg-purple-500" },
  { value: "bg-pink-500 text-pink-500", label: "Pink", preview: "bg-pink-500" },
  { value: "bg-slate-500 text-slate-500", label: "Slate", preview: "bg-slate-500" },
];

export default function TagsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [tags, setTags] = useState<Tag[]>(tagsData);

  // Form state
  const [newTagName, setNewTagName] = useState("");
  const [newTagDescription, setNewTagDescription] = useState("");
  const [newTagColor, setNewTagColor] = useState("bg-blue-500 text-blue-500");
  const [newTagCategory, setNewTagCategory] = useState("Custom");

  const handleCreateTag = () => {
    const newTag: Tag = {
      id: (tags.length + 1).toString(),
      name: newTagName,
      color: newTagColor,
      description: newTagDescription,
      usage_count: 0,
      category: newTagCategory,
      created_by: "Don Puerto", // In production, get from auth context
      created_at: new Date().toISOString().split('T')[0],
    };

    setTags([...tags, newTag]);

    // Reset form
    setNewTagName("");
    setNewTagDescription("");
    setNewTagColor("bg-blue-500 text-blue-500");
    setNewTagCategory("Custom");
    setIsCreateDialogOpen(false);
  };

  const handleEditTag = (tag: Tag) => {
    setEditingTag(tag);
    setNewTagName(tag.name);
    setNewTagDescription(tag.description);
    setNewTagColor(tag.color);
    setNewTagCategory(tag.category);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTag = () => {
    if (!editingTag) return;

    setTags(tags.map(tag =>
      tag.id === editingTag.id
        ? {
          ...tag,
          name: newTagName,
          description: newTagDescription,
          color: newTagColor,
          category: newTagCategory,
        }
        : tag
    ));

    // Reset form
    setNewTagName("");
    setNewTagDescription("");
    setNewTagColor("bg-blue-500 text-blue-500");
    setNewTagCategory("Custom");
    setEditingTag(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteTag = (tagId: string) => {
    if (confirm("Are you sure you want to delete this tag?")) {
      setTags(tags.filter(tag => tag.id !== tagId));
    }
  };

  const filteredTags = tags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tag.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(tags.map(t => t.category)));
  const stats = {
    total: tags.length,
    totalUsage: tags.reduce((sum, t) => sum + t.usage_count, 0),
    avgUsage: tags.length > 0 ? Math.round(tags.reduce((sum, t) => sum + t.usage_count, 0) / tags.length) : 0,
  };

  return (
    <div className="flex flex-col gap-6 layout-padding py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
          <p className="text-muted-foreground mt-1">
            Organize and categorize your contacts with tags
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Tag
        </Button>
      </div>

      {/* Create Tag Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Create New Tag
            </DialogTitle>
            <DialogDescription>
              Add a new tag to organize your contacts. Tags help you categorize and filter contacts efficiently.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tag-name">Tag Name *</Label>
              <Input
                id="tag-name"
                placeholder="e.g., Premium Customer"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tag-description">Description</Label>
              <Textarea
                id="tag-description"
                placeholder="Describe what this tag represents..."
                value={newTagDescription}
                onChange={(e) => setNewTagDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tag-category">Category *</Label>
                <Select value={newTagCategory} onValueChange={setNewTagCategory}>
                  <SelectTrigger id="tag-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Industry">Industry</SelectItem>
                    <SelectItem value="Status">Status</SelectItem>
                    <SelectItem value="Priority">Priority</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tag-color">Color *</Label>
                <Select value={newTagColor} onValueChange={setNewTagColor}>
                  <SelectTrigger id="tag-color">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${color.preview}`} />
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg border bg-muted/50">
              <div className={`p-2 rounded-lg bg-opacity-10 ${newTagColor.split(' ')[0]}/10`}>
                <Tag className={`h-4 w-4 ${newTagColor.split(' ')[1]}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{newTagName || "Tag Name"}</p>
                <p className="text-xs text-muted-foreground">{newTagDescription || "Tag description..."}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${newTagColor.split(' ')[0]}/10 ${newTagColor.split(' ')[1]}`}>
                {newTagCategory}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateTag}
              disabled={!newTagName.trim() || !newTagCategory}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Tag Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Tag
            </DialogTitle>
            <DialogDescription>
              Update the tag information. Changes will be reflected across all contacts using this tag.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-tag-name">Tag Name *</Label>
              <Input
                id="edit-tag-name"
                placeholder="e.g., Premium Customer"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-tag-description">Description</Label>
              <Textarea
                id="edit-tag-description"
                placeholder="Describe what this tag represents..."
                value={newTagDescription}
                onChange={(e) => setNewTagDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-tag-category">Category *</Label>
                <Select value={newTagCategory} onValueChange={setNewTagCategory}>
                  <SelectTrigger id="edit-tag-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Industry">Industry</SelectItem>
                    <SelectItem value="Status">Status</SelectItem>
                    <SelectItem value="Priority">Priority</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-tag-color">Color *</Label>
                <Select value={newTagColor} onValueChange={setNewTagColor}>
                  <SelectTrigger id="edit-tag-color">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${color.preview}`} />
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg border bg-muted/50">
              <div className={`p-2 rounded-lg bg-opacity-10 ${newTagColor.split(' ')[0]}/10`}>
                <Tag className={`h-4 w-4 ${newTagColor.split(' ')[1]}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{newTagName || "Tag Name"}</p>
                <p className="text-xs text-muted-foreground">{newTagDescription || "Tag description..."}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${newTagColor.split(' ')[0]}/10 ${newTagColor.split(' ')[1]}`}>
                {newTagCategory}
              </span>
            </div>

            {editingTag && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                Currently used by {editingTag.usage_count} contact{editingTag.usage_count !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setEditingTag(null);
              setNewTagName("");
              setNewTagDescription("");
              setNewTagColor("bg-blue-500 text-blue-500");
              setNewTagCategory("Custom");
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateTag}
              disabled={!newTagName.trim() || !newTagCategory}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              Update Tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Active tags</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsage}</div>
            <p className="text-xs text-muted-foreground mt-1">Tag applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgUsage}</div>
            <p className="text-xs text-muted-foreground mt-1">Per tag</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Tags Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTags.map((tag) => (
          <Card key={tag.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg bg-opacity-10 ${tag.color.split(' ')[0]}/10`}>
                  <Tag className={`h-5 w-5 ${tag.color.split(' ')[1]}`} />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tag options</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{tag.name}</CardTitle>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${tag.color.split(' ')[0]}/10 ${tag.color.split(' ')[1]}`}>
                    {tag.category}
                  </span>
                </div>
                <CardDescription className="mt-1">{tag.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Used by</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {tag.usage_count} contacts
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Created by</span>
                  <span className="font-medium">{tag.created_by}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">{new Date(tag.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleEditTag(tag)}
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTag(tag.id)}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTags.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Tag className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No tags found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or create a new tag
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
