import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ThemeSelector } from "@/components/theme/ThemeSelector";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  User,
  Settings,
  Trash2,
  Palette,
  Download,
} from "lucide-react";

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "theme" | "settings">(
    "profile"
  );

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      toast({
        title: "Account deleted",
        description: "Your account and all data have been permanently deleted.",
      });
      logout();
      navigate("/");
    }
  };

  const handleExportData = () => {
    toast({
      title: "Data exported!",
      description: "Your mood data has been downloaded to your device.",
    });
  };

  return (
    <div className={`min-h-screen ${currentTheme.background} p-4`}>
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => navigate("/dashboard")}
          className={`mb-6 bg-gradient-to-r ${currentTheme.primary} text-white hover:opacity-90`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-8">
          <div
            className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${currentTheme.primary} rounded-full flex items-center justify-center`}
          >
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-4xl font-bold ${currentTheme.text} mb-2`}>
            Profile Settings
          </h1>
          <p className={`${currentTheme.textSecondary} text-lg`}>
            Manage your account and preferences
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div
            className={`${currentTheme.surface} ${currentTheme.border} rounded-lg p-1 flex space-x-1`}
          >
            <Button
              size="sm"
              onClick={() => setActiveTab("profile")}
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-200
                ${
                  activeTab === "profile"
                    ? `bg-gradient-to-r ${currentTheme.primary} text-white`
                    : `${currentTheme.surface} ${currentTheme.textSecondary} hover:${currentTheme.border}`
                }`}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>

            <Button
              size="sm"
              onClick={() => setActiveTab("theme")}
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-200
                ${
                  activeTab === "theme"
                    ? `bg-gradient-to-r ${currentTheme.primary} text-white`
                    : `${currentTheme.surface} ${currentTheme.textSecondary} hover:${currentTheme.border}`
                }`}
            >
              <Palette className="w-4 h-4 mr-2" />
              Themes
            </Button>

            <Button
              size="sm"
              onClick={() => setActiveTab("settings")}
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-200
                ${
                  activeTab === "settings"
                    ? `bg-gradient-to-r ${currentTheme.primary} text-white`
                    : `${currentTheme.surface} ${currentTheme.textSecondary} hover:${currentTheme.border}`
                }`}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card
              className={`p-6 ${currentTheme.surface} ${currentTheme.border}`}
            >
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-purple-600" />
                <h2 className={`text-xl font-semibold ${currentTheme.text}`}>
                  Profile Information
                </h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    defaultValue={user?.name}
                    className="bg-white/80"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    className="bg-white/80"
                  />
                </div>

                <Button
                  onClick={handleSaveProfile}
                  className={`w-full bg-gradient-to-r ${currentTheme.primary} hover:opacity-90 text-white`}
                >
                  Save Changes
                </Button>
              </div>
            </Card>
          )}

          {/* Theme Tab */}
          {activeTab === "theme" && <ThemeSelector />}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <Card
                className={`p-6 ${currentTheme.surface} ${currentTheme.border}`}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <h2 className={`text-xl font-semibold ${currentTheme.text}`}>
                    App Settings
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${currentTheme.text}`}>
                        Daily Reminders
                      </p>
                      <p className={`text-sm ${currentTheme.textSecondary}`}>
                        Get notified to track your mood
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${currentTheme.text}`}>
                        Weekly Reports
                      </p>
                      <p className={`text-sm ${currentTheme.textSecondary}`}>
                        Receive mood insights via email
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${currentTheme.text}`}>
                        Sound Effects
                      </p>
                      <p className={`text-sm ${currentTheme.textSecondary}`}>
                        Play sounds when recording moods
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </Card>

              {/* Data & Privacy */}
              <Card
                className={`p-6 ${currentTheme.surface} ${currentTheme.border}`}
              >
                <h2
                  className={`text-xl font-semibold ${currentTheme.text} mb-4`}
                >
                  Data & Privacy
                </h2>

                <div className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    onClick={handleExportData}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export My Data
                  </Button>

                  <Button className="w-full justify-start" onClick={logout}>
                    Sign Out
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
