import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2, Plus, User, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserStage } from "../backend.d";
import { useAuth } from "../hooks/useAuth";
import { useGetUserProfile, useSaveUserProfile } from "../hooks/useQueries";

const stageLabels: Record<string, string> = {
  aspirant: "Aspirant (Class 11–12)",
  firstYear: "1st Year BTech",
  secondYear: "2nd Year BTech",
  thirdYear: "3rd Year BTech",
  fourthYear: "4th Year BTech",
  workingProfessional: "Working Professional",
};

const interestOptions = [
  "AI/ML",
  "Web Development",
  "App Development",
  "Robotics",
  "Core Engineering",
  "Startup",
  "Finance",
  "Research",
  "DSA",
  "Cloud Computing",
];

export default function ProfilePage() {
  const { loginStatus, identity, login } = useAuth();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const { data: profile, isLoading } = useGetUserProfile();
  const { mutate: saveProfile, isPending } = useSaveUserProfile();

  const [name, setName] = useState("");
  const [stage, setStage] = useState<string>(UserStage.aspirant);
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setStage(profile.stage);
      setInterests(profile.interests);
    }
  }, [profile]);

  const handleSave = () => {
    saveProfile(
      { name, stage: stage as UserStage, interests },
      {
        onSuccess: () => toast.success("Profile saved!"),
        onError: () => toast.error("Failed to save profile."),
      },
    );
  };

  const addInterest = (interest: string) => {
    if (interest && !interests.includes(interest)) {
      setInterests((prev) => [...prev, interest]);
    }
    setInterestInput("");
  };

  const removeInterest = (interest: string) => {
    setInterests((prev) => prev.filter((i) => i !== interest));
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto p-8 rounded-2xl border border-border bg-card">
          <User className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-3">
            Sign In to Access Your Profile
          </h2>
          <p className="text-muted-foreground mb-6">
            Save your preferences, track your progress, and get personalized
            guidance.
          </p>
          <Button
            onClick={() => login()}
            className="bg-primary text-primary-foreground glow-cyan"
            data-ocid="profile.primary_button"
          >
            Sign In with Internet Identity
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className="container mx-auto px-4 py-12 text-center"
        data-ocid="profile.loading_state"
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-4xl font-black mb-2">
          My <span className="text-gradient-cyan">Profile</span>
        </h1>
        <p className="text-muted-foreground">
          Personalize your experience and get targeted guidance.
        </p>
      </motion.div>

      <div className="space-y-6 p-6 rounded-2xl border border-border bg-card">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Arjun Sharma"
            data-ocid="profile.input"
          />
        </div>

        <div className="space-y-2">
          <Label>Current Stage</Label>
          <Select value={stage} onValueChange={setStage}>
            <SelectTrigger data-ocid="profile.select">
              <SelectValue placeholder="Select your stage" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(stageLabels).map(([val, label]) => (
                <SelectItem key={val} value={val}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Interests</Label>
          <div className="flex gap-2">
            <Input
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              placeholder="Add custom interest..."
              onKeyDown={(e) => e.key === "Enter" && addInterest(interestInput)}
              data-ocid="profile.input"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => addInterest(interestInput)}
              data-ocid="profile.secondary_button"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {interestOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                data-ocid="profile.toggle"
                onClick={() =>
                  interests.includes(opt)
                    ? removeInterest(opt)
                    : addInterest(opt)
                }
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  interests.includes(opt)
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                {interests.includes(opt) && (
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                )}
                {opt}
              </button>
            ))}
          </div>
          {interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-border">
              {interests.map((interest) => (
                <Badge
                  key={interest}
                  variant="outline"
                  className="text-xs border-primary/40 text-primary gap-1"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    data-ocid="profile.delete_button"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={handleSave}
          disabled={isPending || !name}
          className="w-full bg-primary text-primary-foreground glow-cyan font-semibold"
          data-ocid="profile.submit_button"
        >
          {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {isPending ? "Saving..." : "Save Profile"}
        </Button>

        <p className="text-xs text-center text-muted-foreground font-mono">
          Principal: {identity?.getPrincipal().toString()}
        </p>
      </div>
    </div>
  );
}
