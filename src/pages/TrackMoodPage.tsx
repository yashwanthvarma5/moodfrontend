import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMood } from "@/contexts/MoodContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MoodPicker } from "@/components/mood/MoodPicker";
import { useToast } from "@/hooks/use-toast";
import { MOTIVATIONAL_QUOTES } from "@/types";
import { ArrowLeft, Send, Clock, TrendingUp, Timer } from "lucide-react";
import { format } from "date-fns";

export const TrackMoodPage: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<{
    emoji: string;
    mood: string;
  } | null>(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const {
    addMood,
    getTodaysMoods,
    getLatestMood,
    getMoodStats,
    canSubmitMood,
    getTimeUntilNextSubmission,
  } = useMood();
  const { currentTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  const todaysMoods = getTodaysMoods();
  const latestMood = getLatestMood();
  const stats = getMoodStats();
  const canSubmit = canSubmitMood();

  useEffect(() => {
    const updateTimer = () => {
      setTimeRemaining(getTimeUntilNextSubmission());
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [getTimeUntilNextSubmission, latestMood]);

  const handleMoodSelect = (emoji: string, mood: string) => {
    setSelectedMood({ emoji, mood });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling right now before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!canSubmit) {
      toast({
        title: "Please wait before submitting",
        description: `You can submit another mood in ${timeRemaining} seconds.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000));

    const success = await addMood(selectedMood.emoji, selectedMood.mood, note);
    if (success) {
      const quote =
        MOTIVATIONAL_QUOTES[
          Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)
        ];
      toast({ title: "Mood recorded! 🎉", description: quote, duration: 5000 });
      setSelectedMood(null);
      setNote("");
    } else {
      toast({
        title: "Unable to record mood",
        description: "Please wait a minute between mood entries.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const getTimeSinceLastMood = () => {
    if (!latestMood) return null;
    const now = new Date();
    const moodTime = new Date(latestMood.date);
    const diffMinutes = Math.floor(
      (now.getTime() - moodTime.getTime()) / (1000 * 60)
    );

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60)
      return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24)
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

    return "Earlier today";
  };

  const formatTimeRemaining = (seconds: number) => {
    if (seconds <= 0) return "";
    return `${seconds}s`;
  };

  return (
    <div className={`min-h-screen p-4 ${currentTheme.className}`}>
      <div className="max-w-2xl mx-auto">
        <Button
          variant="default"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            How are you feeling?
          </h1>
          <p className="text-gray-600 text-lg">
            Take a moment to check in with yourself
          </p>

          {latestMood && (
            <div className="mt-4 p-3 bg-white/40 rounded-lg inline-flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Last mood: {latestMood.emoji} {latestMood.mood} •{" "}
                {getTimeSinceLastMood()}
              </span>
            </div>
          )}
        </div>

        {!canSubmit && timeRemaining > 0 && (
          <Card className="p-4 mb-6 bg-amber-50 border-amber-200">
            <div className="flex items-center space-x-3">
              <Timer className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800">
                  Please wait before submitting another mood
                </p>
                <p className="text-sm text-amber-700">
                  You can record your next mood in{" "}
                  {formatTimeRemaining(timeRemaining)}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 bg-white/60 backdrop-blur-sm border-purple-100 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.todayEntries}
            </div>
            <div className="text-sm text-gray-600">Today's Check-ins</div>
          </Card>
          <Card className="p-4 bg-white/60 backdrop-blur-sm border-purple-100 text-center">
            <div className="text-2xl font-bold text-pink-600">
              {stats.currentStreak}
            </div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </Card>
          <Card className="p-4 bg-white/60 backdrop-blur-sm border-purple-100 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalEntries}
            </div>
            <div className="text-sm text-gray-600">Total Entries</div>
          </Card>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <MoodPicker
            onMoodSelect={handleMoodSelect}
            selectedMood={selectedMood?.mood}
          />

          <Card className="p-6 bg-white/60 backdrop-blur-sm border-purple-100">
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="note"
                  className="text-base font-medium text-gray-800"
                >
                  What's on your mind? (optional)
                </Label>
                <p className="text-sm text-gray-600 mb-2">
                  Share your thoughts, what triggered this feeling, or what
                  you're grateful for.
                </p>
              </div>
              <Textarea
                id="note"
                placeholder="I'm feeling this way because..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px] bg-white/80 resize-none"
                maxLength={500}
                disabled={!canSubmit}
              />
              <div className="text-right text-sm text-gray-500">
                {note.length}/500
              </div>
            </div>
          </Card>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !canSubmit}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Recording mood...
              </>
            ) : !canSubmit ? (
              <>
                <Timer className="w-5 h-5 mr-2" />
                Wait {formatTimeRemaining(timeRemaining)} to record
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Record This Mood
              </>
            )}
          </Button>
        </form>

        {todaysMoods.length > 0 && (
          <Card className="mt-8 p-6 bg-white/60 backdrop-blur-sm border-purple-100">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Today's Mood Journey
              </h3>
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {todaysMoods.map((mood, index) => (
                <div
                  key={mood.id}
                  className="flex items-center justify-between p-3 bg-white/40 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{mood.emoji}</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {mood.mood}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(mood.date), "h:mm a")}
                      </p>
                    </div>
                  </div>
                  {mood.note && (
                    <p className="text-xs text-gray-600 italic max-w-xs truncate">
                      "{mood.note}"
                    </p>
                  )}
                  {index === 0 && (
                    <div className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      Latest
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="mt-6 p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {canSubmit ? "Keep it up! 🌟" : "Take a moment to reflect 🧘‍♀️"}
          </h3>
          <p className="text-gray-600 text-sm">
            {canSubmit
              ? "Regular check-ins help you understand your emotional patterns and build self-awareness."
              : "Use this time to reflect on your current mood and what might be influencing how you feel."}
          </p>
        </Card>
      </div>
    </div>
  );
};
