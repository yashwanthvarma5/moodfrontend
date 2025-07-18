import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMood } from "@/contexts/MoodContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoodChart } from "@/components/mood/MoodChart";
import { MoodCalendar } from "@/components/mood/MoodCalendar";
import { ArrowLeft, Calendar, BarChart3, Clock } from "lucide-react";
import { format, isToday, isYesterday, startOfDay } from "date-fns";

export const HistoryPage: React.FC = () => {
  const { moods, getMoodStats } = useMood();
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<
    "timeline" | "calendar" | "analytics"
  >("timeline");

  const stats = getMoodStats();

  const getMoodsByDay = () => {
    const moodsByDay = moods.reduce((acc, mood) => {
      const dayKey = startOfDay(new Date(mood.date)).toISOString();
      if (!acc[dayKey]) acc[dayKey] = [];
      acc[dayKey].push(mood);
      return acc;
    }, {} as Record<string, typeof moods>);

    return Object.entries(moodsByDay)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([date, dayMoods]) => ({
        date: new Date(date),
        moods: dayMoods.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
      }));
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "EEEE, MMMM d");
  };

  const moodsByDay = getMoodsByDay();

  return (
    <div className={`min-h-screen p-4 ${currentTheme.className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="deafult" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Mood History</h1>
              <p className="text-gray-600 text-lg">
                Explore your emotional journey over time
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "timeline" ? "default" : "outline"}
              onClick={() => setViewMode("timeline")}
              size="sm"
            >
              <Clock className="w-4 h-4 mr-2" />
              Timeline
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              onClick={() => setViewMode("calendar")}
              size="sm"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calendar
            </Button>
            <Button
              variant={viewMode === "analytics" ? "default" : "outline"}
              onClick={() => setViewMode("analytics")}
              size="sm"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        {moods.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-12 h-12 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No mood data yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start tracking your moods to see beautiful visualizations and
              patterns!
            </p>
            <Button
              onClick={() => navigate("/track-mood")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Track Your First Mood
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-white/60 backdrop-blur-sm border-purple-100 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.totalEntries}
                </div>
                <div className="text-sm text-gray-600">Total Check-ins</div>
              </Card>
              <Card className="p-4 bg-white/60 backdrop-blur-sm border-purple-100 text-center">
                <div className="text-2xl font-bold text-pink-600">
                  {moodsByDay.length}
                </div>
                <div className="text-sm text-gray-600">Days Tracked</div>
              </Card>
              <Card className="p-4 bg-white/60 backdrop-blur-sm border-purple-100 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.averageEntriesPerDay}
                </div>
                <div className="text-sm text-gray-600">Avg per Day</div>
              </Card>
              <Card className="p-4 bg-white/60 backdrop-blur-sm border-purple-100 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.currentStreak}
                </div>
                <div className="text-sm text-gray-600">Current Streak</div>
              </Card>
            </div>

            {/* Content based on view mode */}
            {viewMode === "timeline" && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Mood Timeline
                  </h2>
                </div>

                <div className="space-y-6">
                  {moodsByDay.map(({ date, moods: dayMoods }) => (
                    <Card
                      key={date.toISOString()}
                      className="p-6 bg-white/60 backdrop-blur-sm border-purple-100"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        {getDateLabel(date)}
                      </h3>
                      <div className="space-y-3">
                        {dayMoods.map((mood) => (
                          <div
                            key={mood.id}
                            className="flex items-center justify-between p-3 bg-white/40 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{mood.emoji}</span>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {mood.mood}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {format(new Date(mood.date), "h:mm a")}
                                </p>
                              </div>
                            </div>
                            {mood.note && (
                              <p className="text-sm text-gray-600 italic max-w-md">
                                "{mood.note}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 text-sm text-gray-500 text-center">
                        {dayMoods.length} mood{dayMoods.length === 1 ? "" : "s"}{" "}
                        recorded
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {viewMode === "calendar" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Monthly Calendar
                  </h2>
                </div>
                <MoodCalendar moods={moods} />
              </div>
            )}

            {viewMode === "analytics" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Mood Analytics
                  </h2>
                </div>
                <MoodChart moods={moods} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
