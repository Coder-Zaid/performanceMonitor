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
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="space-y-1">
        <h1 className="text-3xl font-display tracking-wider text-white">Settings</h1>
        <p className="text-text-secondary text-sm">
          Manage your personal preferences and organization-wide configurations.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="bg-[#181818] border border-[#202020] p-1 h-auto flex flex-wrap gap-1 rounded-xl w-fit">
          <TabsTrigger 
            value="profile" 
            className="data-[state=active]:bg-[#202020] data-[state=active]:text-[#FFC000] text-[#7D7D7D] px-6 py-2.5 rounded-lg transition-all duration-300"
          >
            <User className="h-4 w-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger 
            value="organization" 
            className="data-[state=active]:bg-[#202020] data-[state=active]:text-[#FFC000] text-[#7D7D7D] px-6 py-2.5 rounded-lg transition-all duration-300"
          >
            <Building2 className="h-4 w-4 mr-2" /> Organization
          </TabsTrigger>
          <TabsTrigger 
            value="appearance" 
            className="data-[state=active]:bg-[#202020] data-[state=active]:text-[#FFC000] text-[#7D7D7D] px-6 py-2.5 rounded-lg transition-all duration-300"
          >
            <Palette className="h-4 w-4 mr-2" /> Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="animate-in fade-in zoom-in-[0.98] duration-300">
          <Card className="border-[#202020] bg-[#101010] shadow-2xl overflow-hidden rounded-2xl group">
            <CardHeader className="border-b border-[#202020] bg-[#141414] transition-colors group-hover:bg-[#181818]">
              <CardTitle className="text-white text-lg tracking-wider">Personal Profile</CardTitle>
              <CardDescription className="text-[#7D7D7D]">Update your personal information and public profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group/input">
                  <Label htmlFor="firstName" className="text-xs font-bold text-[#7D7D7D] uppercase tracking-wider group-focus-within/input:text-[#FFC000] transition-colors">First Name</Label>
                  <Input id="firstName" placeholder="John" className="bg-[#000000] border-[#202020] text-white focus-visible:ring-[#FFC000] h-12 rounded-xl transition-all hover:border-[#333]" />
                </div>
                <div className="space-y-2 group/input">
                  <Label htmlFor="lastName" className="text-xs font-bold text-[#7D7D7D] uppercase tracking-wider group-focus-within/input:text-[#FFC000] transition-colors">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="bg-[#000000] border-[#202020] text-white focus-visible:ring-[#FFC000] h-12 rounded-xl transition-all hover:border-[#333]" />
                </div>
              </div>
              <div className="space-y-2 group/input">
                <Label htmlFor="email" className="text-xs font-bold text-[#7D7D7D] uppercase tracking-wider group-focus-within/input:text-[#FFC000] transition-colors">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-[#000000] border-[#202020] text-white focus-visible:ring-[#FFC000] h-12 rounded-xl transition-all hover:border-[#333]" />
              </div>
              <div className="space-y-2 group/input">
                <Label htmlFor="bio" className="text-xs font-bold text-[#7D7D7D] uppercase tracking-wider group-focus-within/input:text-[#FFC000] transition-colors">Bio</Label>
                <textarea 
                  id="bio" 
                  className="w-full min-h-[120px] rounded-xl border border-[#202020] bg-[#000000] px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC000] transition-all hover:border-[#333]"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="pt-2">
                <Button className="bg-[#FFC000] text-black hover:bg-[#FFE066] font-bold uppercase tracking-widest rounded-xl px-8 h-12 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="animate-in fade-in zoom-in-[0.98] duration-300">
          <Card className="border-[#202020] bg-[#101010] shadow-2xl overflow-hidden rounded-2xl group">
            <CardHeader className="border-b border-[#202020] bg-[#141414] transition-colors group-hover:bg-[#181818]">
              <CardTitle className="text-white text-lg tracking-wider">Organization Settings</CardTitle>
              <CardDescription className="text-[#7D7D7D]">Configure organization-wide defaults and branding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2 group/input">
                <Label htmlFor="orgName" className="text-xs font-bold text-[#7D7D7D] uppercase tracking-wider group-focus-within/input:text-[#FFC000] transition-colors">Organization Name</Label>
                <Input id="orgName" placeholder="ITSPRELUDE Inc." className="bg-[#000000] border-[#202020] text-white focus-visible:ring-[#FFC000] h-12 rounded-xl transition-all hover:border-[#333]" />
              </div>
              <div className="space-y-2 group/input">
                <Label htmlFor="orgWebsite" className="text-xs font-bold text-[#7D7D7D] uppercase tracking-wider group-focus-within/input:text-[#FFC000] transition-colors">Website</Label>
                <div className="flex group-hover/input:shadow-lg transition-all">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-[#202020] bg-[#181818] text-[#7D7D7D] text-sm font-medium">
                    https://
                  </span>
                  <Input id="orgWebsite" className="rounded-l-none bg-[#000000] border-[#202020] text-white focus-visible:ring-[#FFC000] h-12 rounded-r-xl transition-all hover:border-[#333]" placeholder="itsprelude.com" />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-xs font-bold text-[#7D7D7D] uppercase tracking-wider">Organization Logo</Label>
                <div className="flex items-center gap-6 p-4 rounded-xl border border-[#202020] bg-[#141414]">
                  <div className="h-24 w-24 rounded-2xl bg-[#000000] border border-[#333] flex items-center justify-center text-[#555] shadow-inner transition-transform hover:scale-105 cursor-pointer">
                    <Building2 className="h-10 w-10" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-white font-medium">Upload new logo</p>
                    <p className="text-xs text-[#7D7D7D]">PNG, JPG or SVG. Max 2MB.</p>
                    <Button variant="outline" size="sm" className="bg-[#202020] border-[#333] text-white hover:bg-[#333] hover:text-[#FFC000] rounded-lg mt-2 transition-all">
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Button className="bg-[#FFC000] text-black hover:bg-[#FFE066] font-bold uppercase tracking-widest rounded-xl px-8 h-12 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Save className="h-4 w-4 mr-2" /> Update Organization
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="animate-in fade-in zoom-in-[0.98] duration-300">
          <Card className="border-[#202020] bg-[#101010] shadow-2xl overflow-hidden rounded-2xl group">
            <CardHeader className="border-b border-[#202020] bg-[#141414] transition-colors group-hover:bg-[#181818]">
              <CardTitle className="text-white text-lg tracking-wider">Appearance Settings</CardTitle>
              <CardDescription className="text-[#7D7D7D]">Customize how the platform looks for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="space-y-4">
                <Label className="text-xs font-bold text-[#7D7D7D] uppercase tracking-wider">Theme Preference</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Light Theme */}
                  <div className="p-1 rounded-2xl bg-gradient-to-b from-[#222] to-transparent cursor-pointer group/theme transition-transform hover:-translate-y-1">
                    <div className="p-4 rounded-xl bg-[#000000] border border-[#202020] h-full transition-colors group-hover/theme:border-[#FFC000]/50">
                      <div className="h-24 rounded-lg bg-white p-2 border border-slate-200 shadow-sm flex flex-col gap-2">
                        <div className="h-2 w-full bg-slate-200 rounded-sm" />
                        <div className="h-2 w-2/3 bg-slate-200 rounded-sm" />
                        <div className="mt-auto h-4 w-full bg-slate-100 rounded-sm" />
                      </div>
                      <p className="text-[10px] font-bold mt-4 text-center tracking-widest text-[#7D7D7D] group-hover/theme:text-white transition-colors">LIGHT</p>
                    </div>
                  </div>
                  
                  {/* Dark Theme - Active */}
                  <div className="p-1 rounded-2xl bg-gradient-to-b from-[#FFC000] to-[#FFC000]/10 cursor-pointer shadow-[0_0_20px_rgba(255,192,0,0.15)] group/theme transition-transform hover:-translate-y-1">
                    <div className="p-4 rounded-xl bg-[#141414] border border-[#FFC000] h-full">
                      <div className="h-24 rounded-lg bg-[#000000] p-2 border border-[#333] shadow-inner flex flex-col gap-2">
                        <div className="h-2 w-full bg-[#202020] rounded-sm" />
                        <div className="h-2 w-2/3 bg-[#202020] rounded-sm" />
                        <div className="mt-auto h-4 w-full bg-[#181818] rounded-sm flex items-center px-1"><div className="h-1 w-4 bg-[#FFC000] rounded-full"></div></div>
                      </div>
                      <p className="text-[10px] font-bold mt-4 text-center tracking-widest text-[#FFC000]">DARK (ACTIVE)</p>
                    </div>
                  </div>

                  {/* System Theme */}
                  <div className="p-1 rounded-2xl bg-gradient-to-b from-[#222] to-transparent cursor-pointer group/theme transition-transform hover:-translate-y-1">
                    <div className="p-4 rounded-xl bg-[#000000] border border-[#202020] h-full transition-colors group-hover/theme:border-[#FFC000]/50">
                      <div className="h-24 rounded-lg overflow-hidden flex shadow-inner">
                        <div className="w-1/2 bg-white p-2 border-r border-slate-200 flex flex-col gap-2">
                          <div className="h-2 w-full bg-slate-200 rounded-sm" />
                        </div>
                        <div className="w-1/2 bg-[#000000] p-2 border-l border-[#333] flex flex-col gap-2">
                          <div className="h-2 w-full bg-[#202020] rounded-sm" />
                        </div>
                      </div>
                      <p className="text-[10px] font-bold mt-4 text-center tracking-widest text-[#7D7D7D] group-hover/theme:text-white transition-colors">SYSTEM DEFAULT</p>
                    </div>
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
