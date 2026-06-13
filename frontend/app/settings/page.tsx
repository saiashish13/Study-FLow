"use client";

import { Download, Upload, User } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 md:px-8">
        <div>
          <h1 className="text-3xl font-semibold">Settings</h1>
          <p className="mt-2 text-sm text-muted-foreground">Profile, theme, notifications, import, and export controls.</p>
        </div>
        <Card>
          <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium">Name<Input className="mt-2" defaultValue="Sai Learner" /></label>
            <label className="text-sm font-medium">Email<Input className="mt-2" defaultValue="sai@example.com" /></label>
            <Button className="md:w-fit"><User size={17} /> Save profile</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {["Daily study reminder", "Weekly analytics report", "Celebrate streak milestones"].map((label) => (
              <label key={label} className="flex items-center justify-between rounded-lg bg-muted p-4 text-sm">
                {label}
                <input type="checkbox" className="h-5 w-5 accent-primary" defaultChecked />
              </label>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Data</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="secondary"><Download size={17} /> Export data</Button>
            <Button variant="secondary"><Upload size={17} /> Import data</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
