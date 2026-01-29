"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Crown,
  TrendingUp,
  Headphones,
  Wrench,
  Radio,
  Plus,
  Check,
  X,
  Settings,
  type LucideIcon
} from "lucide-react";

/*
 * SUPABASE SCHEMA:
 * 
 * Table: roles
 * Columns:
 * - id: uuid (PRIMARY KEY)
 * - name: text (UNIQUE)
 * - description: text
 * - level: integer (hierarchy level)
 * - created_at: timestamptz
 * 
 * Table: permissions
 * Columns:
 * - id: uuid (PRIMARY KEY)
 * - resource: text (users, jobs, quotes, products, inventory, customers)
 * - action: text (view, create, edit, delete, export)
 * - description: text
 * 
 * Table: role_permissions
 * Columns:
 * - role_id: uuid (FOREIGN KEY)
 * - permission_id: uuid (FOREIGN KEY)
 * - granted: boolean
 */

interface Permission {
  resource: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: LucideIcon;
  userCount: number;
  level: number;
  permissions: Permission[];
}

const rolesData: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access with all permissions",
    color: "yellow",
    icon: Crown,
    userCount: 1,
    level: 1,
    permissions: [
      { resource: "Users", view: true, create: true, edit: true, delete: true, export: true },
      { resource: "Jobs", view: true, create: true, edit: true, delete: true, export: true },
      { resource: "Quotes", view: true, create: true, edit: true, delete: true, export: true },
      { resource: "Products", view: true, create: true, edit: true, delete: true, export: true },
      { resource: "Inventory", view: true, create: true, edit: true, delete: true, export: true },
      { resource: "Customers", view: true, create: true, edit: true, delete: true, export: true },
      { resource: "Settings", view: true, create: true, edit: true, delete: true, export: true },
    ],
  },
  {
    id: "2",
    name: "Manager",
    description: "Team management and oversight capabilities",
    color: "blue",
    icon: Shield,
    userCount: 1,
    level: 2,
    permissions: [
      { resource: "Users", view: true, create: false, edit: true, delete: false, export: true },
      { resource: "Jobs", view: true, create: true, edit: true, delete: false, export: true },
      { resource: "Quotes", view: true, create: true, edit: true, delete: false, export: true },
      { resource: "Products", view: true, create: false, edit: true, delete: false, export: true },
      { resource: "Inventory", view: true, create: false, edit: true, delete: false, export: true },
      { resource: "Customers", view: true, create: true, edit: true, delete: false, export: true },
      { resource: "Settings", view: true, create: false, edit: false, delete: false, export: false },
    ],
  },
  {
    id: "3",
    name: "Sales",
    description: "Customer and deal management",
    color: "green",
    icon: TrendingUp,
    userCount: 3,
    level: 3,
    permissions: [
      { resource: "Users", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Jobs", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Quotes", view: true, create: true, edit: true, delete: false, export: true },
      { resource: "Products", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Inventory", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Customers", view: true, create: true, edit: true, delete: false, export: true },
      { resource: "Settings", view: false, create: false, edit: false, delete: false, export: false },
    ],
  },
  {
    id: "4",
    name: "Technician",
    description: "Field service and job execution",
    color: "orange",
    icon: Wrench,
    userCount: 2,
    level: 4,
    permissions: [
      { resource: "Users", view: false, create: false, edit: false, delete: false, export: false },
      { resource: "Jobs", view: true, create: false, edit: true, delete: false, export: false },
      { resource: "Quotes", view: false, create: false, edit: false, delete: false, export: false },
      { resource: "Products", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Inventory", view: true, create: false, edit: true, delete: false, export: false },
      { resource: "Customers", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Settings", view: false, create: false, edit: false, delete: false, export: false },
    ],
  },
  {
    id: "5",
    name: "Dispatcher",
    description: "Job scheduling and technician assignment",
    color: "cyan",
    icon: Radio,
    userCount: 1,
    level: 3,
    permissions: [
      { resource: "Users", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Jobs", view: true, create: true, edit: true, delete: false, export: true },
      { resource: "Quotes", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Products", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Inventory", view: true, create: false, edit: false, delete: false, export: true },
      { resource: "Customers", view: true, create: false, edit: true, delete: false, export: false },
      { resource: "Settings", view: false, create: false, edit: false, delete: false, export: false },
    ],
  },
  {
    id: "6",
    name: "Support",
    description: "Customer support and ticket management",
    color: "purple",
    icon: Headphones,
    userCount: 2,
    level: 4,
    permissions: [
      { resource: "Users", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Jobs", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Quotes", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Products", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Inventory", view: true, create: false, edit: false, delete: false, export: false },
      { resource: "Customers", view: true, create: false, edit: true, delete: false, export: true },
      { resource: "Settings", view: false, create: false, edit: false, delete: false, export: false },
    ],
  },
];

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<Role>(rolesData[0]);

  const getRoleCardColor = (color: string) => {
    switch (color) {
      case "yellow": return "border-yellow-500/20 bg-yellow-500/5";
      case "blue": return "border-blue-500/20 bg-blue-500/5";
      case "green": return "border-green-500/20 bg-green-500/5";
      case "orange": return "border-orange-500/20 bg-orange-500/5";
      case "cyan": return "border-cyan-500/20 bg-cyan-500/5";
      case "purple": return "border-purple-500/20 bg-purple-500/5";
      default: return "border-gray-500/20 bg-gray-500/5";
    }
  };

  const getRoleIconColor = (color: string) => {
    switch (color) {
      case "yellow": return "text-yellow-500";
      case "blue": return "text-blue-500";
      case "green": return "text-green-500";
      case "orange": return "text-orange-500";
      case "cyan": return "text-cyan-500";
      case "purple": return "text-purple-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="flex flex-col gap-6 layout-padding py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="text-muted-foreground mt-1">
            Manage user roles and access control
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Role
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Roles List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Roles</CardTitle>
              <CardDescription>
                {rolesData.length} roles configured
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {rolesData.map((role) => {
                const Icon = role.icon;
                return (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedRole.id === role.id
                      ? getRoleCardColor(role.color)
                      : "border-transparent hover:border-border"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${getRoleIconColor(role.color)}`} />
                        <div>
                          <div className="font-medium">{role.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {role.userCount} user{role.userCount !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                      {selectedRole.id === role.id && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {(() => {
                      const Icon = selectedRole.icon;
                      return <Icon className={`h-5 w-5 ${getRoleIconColor(selectedRole.color)}`} />;
                    })()}
                    {selectedRole.name} Permissions
                  </CardTitle>
                  <CardDescription>{selectedRole.description}</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Resource</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">View</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Create</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Edit</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Delete</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Export</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRole.permissions.map((perm, index) => (
                      <tr key={index} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 font-medium">{perm.resource}</td>
                        <td className="px-4 py-3 text-center">
                          {perm.view ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {perm.create ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {perm.edit ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {perm.delete ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {perm.export ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Role Hierarchy Info */}
              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Role Hierarchy</h3>
                <p className="text-sm text-muted-foreground">
                  This role is at <strong>Level {selectedRole.level}</strong> in the hierarchy.
                  Lower numbers have higher authority. Roles can only manage users with higher level numbers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Supabase Integration Note */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Role-Based Access Control (RBAC)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p className="mb-2">Supabase implementation uses:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>roles</strong> table: Role definitions and hierarchy levels</li>
            <li><strong>permissions</strong> table: Granular permission definitions</li>
            <li><strong>role_permissions</strong> table: Many-to-many relationship</li>
            <li><strong>RLS Policies:</strong> Automatic enforcement at database level</li>
            <li><strong>Functions:</strong> Check user permissions before actions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
