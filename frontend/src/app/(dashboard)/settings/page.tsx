"use client";

import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  Building2, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">Settings</h1>
        <p className="text-text-secondary">
          Manage your personal preferences and organization-wide configurations.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-surface-secondary border border-border p-1">
          <TabsTrigger value="profile" className="data-[state=active]:bg-card">
            <User className="h-4 w-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="organization" className="data-[state=active]:bg-card">
            <Building2 className="h-4 w-4 mr-2" /> Organization
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-card">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-card">
            <Palette className="h-4 w-4 mr-2" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-card">
            <Shield className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Personal Profile</CardTitle>
              <CardDescription>Update your personal information and public profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea 
                  id="bio" 
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <Button className="bg-accent-action text-white hover:bg-accent-action/90">
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>Configure organization-wide defaults and branding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" placeholder="ITSPRELUDE Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgWebsite">Website</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-surface-tertiary text-text-muted text-sm">
                    https://
                  </span>
                  <Input id="orgWebsite" className="rounded-l-none" placeholder="itsprelude.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Organization Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-xl bg-surface-tertiary border-2 border-dashed border-border flex items-center justify-center text-text-muted">
                    <Building2 className="h-8 w-8" />
                  </div>
                  <Button variant="outline" size="sm">Change Logo</Button>
                </div>
              </div>
              <Button className="bg-accent-action text-white hover:bg-accent-action/90">
                <Save className="h-4 w-4 mr-2" /> Update Organization
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the platform looks for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Theme Preference</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 border rounded-xl bg-white cursor-pointer border-accent-action ring-2 ring-accent-action/20">
                    <div className="h-2 w-full bg-slate-200 rounded mb-2" />
                    <div className="h-2 w-2/3 bg-slate-200 rounded" />
                    <p className="text-[10px] font-bold mt-4 text-center">LIGHT</p>
                  </div>
                  <div className="p-4 border rounded-xl bg-slate-900 cursor-pointer border-border">
                    <div className="h-2 w-full bg-slate-700 rounded mb-2" />
                    <div className="h-2 w-2/3 bg-slate-700 rounded" />
                    <p className="text-[10px] font-bold mt-4 text-center text-white">DARK</p>
                  </div>
                  <div className="p-4 border rounded-xl bg-slate-100 cursor-pointer border-border flex flex-col justify-between">
                    <div className="flex gap-1">
                      <div className="h-8 w-1/2 bg-white rounded" />
                      <div className="h-8 w-1/2 bg-slate-900 rounded" />
                    </div>
                    <p className="text-[10px] font-bold mt-4 text-center">SYSTEM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
