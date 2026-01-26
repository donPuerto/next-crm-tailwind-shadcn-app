"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  List,
  ListFilter,
  Plus,
  MoreVertical,
  Users,
  Filter,
  Star,
  Briefcase,
  TrendingUp,
  Clock,
  Edit,
  Trash2,
  Share2
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/*
 * SUPABASE SCHEMA:
 * 
 * Table: smart_lists
 * Columns:
 * - id: uuid (PRIMARY KEY)
 * - name: text
 * - description: text
 * - criteria: jsonb (filter criteria)
 * - contact_count: integer
 * - color: text
 * - icon: text
 * - created_by: uuid (FOREIGN KEY to profiles)
 * - created_at: timestamptz
 * - updated_at: timestamptz
 * - is_favorite: boolean
 * - shared_with: uuid[] (array of user ids)
 */

interface SmartList {
  id: string;
  name: string;
  description: string;
  contact_count: number;
  color: string;
  icon: any;
  created_by: string;
  last_updated: string;
  is_favorite: boolean;
  criteria: string;
}

const smartListsData: SmartList[] = [
  {
    id: "1",
    name: "VIP Customers",
    description: "High-value customers with lifetime value > $100k",
    contact_count: 47,
    color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    icon: Star,
    created_by: "Emily Rodriguez",
    last_updated: "2 hours ago",
    is_favorite: true,
    criteria: "LTV > $100,000 AND Status = Active",
  },
  {
    id: "2",
    name: "Hot Leads",
    description: "Leads marked as hot and contacted within last 7 days",
    contact_count: 23,
    color: "text-red-500 bg-red-500/10 border-red-500/20",
    icon: TrendingUp,
    created_by: "Michael Chen",
    last_updated: "5 hours ago",
    is_favorite: true,
    criteria: "Status = Hot AND Last Contact < 7 days",
  },
  {
    id: "3",
    name: "Austin Area Contacts",
    description: "All contacts located in Austin, TX area",
    contact_count: 156,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    icon: Users,
    created_by: "Emily Rodriguez",
    last_updated: "1 day ago",
    is_favorite: false,
    criteria: "City = Austin AND State = TX",
  },
  {
    id: "4",
    name: "Tech Industry",
    description: "Contacts from technology companies",
    contact_count: 89,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    icon: Briefcase,
    created_by: "James Wilson",
    last_updated: "1 day ago",
    is_favorite: false,
    criteria: "Tags CONTAINS Technology",
  },
  {
    id: "5",
    name: "No Recent Activity",
    description: "Contacts not contacted in over 30 days",
    contact_count: 34,
    color: "text-gray-500 bg-gray-500/10 border-gray-500/20",
    icon: Clock,
    created_by: "Michael Chen",
    last_updated: "3 days ago",
    is_favorite: false,
    criteria: "Last Contact > 30 days",
  },
  {
    id: "6",
    name: "Partners & Referrals",
    description: "All partner contacts and referral sources",
    contact_count: 12,
    color: "text-green-500 bg-green-500/10 border-green-500/20",
    icon: Share2,
    created_by: "Emily Rodriguez",
    last_updated: "1 week ago",
    is_favorite: true,
    criteria: "Type = Partner",
  },
];

export default function SmartListsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredLists = smartListsData.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         list.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorite = !showFavoritesOnly || list.is_favorite;
    return matchesSearch && matchesFavorite;
  });

  const stats = {
    total: smartListsData.length,
    favorites: smartListsData.filter(l => l.is_favorite).length,
    totalContacts: smartListsData.reduce((sum, l) => sum + l.contact_count, 0),
  };

  return (
    <div className="flex flex-col gap-6 layout-padding py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Lists</h1>
          <p className="text-muted-foreground mt-1">
            Dynamic contact lists based on custom criteria
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Smart List
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lists</CardTitle>
            <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">All smart lists</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favorites}</div>
            <p className="text-xs text-muted-foreground mt-1">Starred lists</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all lists</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search lists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button 
          variant={showFavoritesOnly ? "default" : "outline"}
          className="gap-2"
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          <Star className="h-4 w-4" />
          Favorites Only
        </Button>
      </div>

      {/* Smart Lists Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLists.map((list) => {
          const IconComponent = list.icon;
          return (
            <Card key={list.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg border ${list.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Star 
                              className={`h-4 w-4 ${list.is_favorite ? 'fill-yellow-500 text-yellow-500' : ''}`} 
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{list.is_favorite ? 'Remove from favorites' : 'Add to favorites'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>More options</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="mt-4">
                  <CardTitle className="text-lg">{list.name}</CardTitle>
                  <CardDescription className="mt-1">{list.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Contacts</span>
                    <span className="font-semibold">{list.contact_count}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Created by</span>
                    <span className="font-medium">{list.created_by}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Updated</span>
                    <span className="font-medium">{list.last_updated}</span>
                  </div>
                  <div className="pt-2 mt-3 border-t">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Filter className="h-3 w-3" />
                      <span>Criteria:</span>
                    </div>
                    <p className="text-xs font-mono bg-muted px-2 py-1 rounded">{list.criteria}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Users className="h-3 w-3" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredLists.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ListFilter className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No smart lists found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or create a new smart list
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
