import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ExamType } from "../backend.d";
import { useGetAllExams } from "../hooks/useQueries";

function formatDate(ts: bigint) {
  const ms = Number(ts);
  if (ms === 0) return "TBA";
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const examTypeLabels: Record<string, string> = {
  all: "All Exams",
  national: "National",
  state: "State",
  university: "University",
};

const typeColors: Record<string, string> = {
  national: "text-primary border-primary/50",
  state: "text-secondary border-secondary/50",
  university: "text-accent border-accent/50",
};

export default function ExamsPage() {
  const { data: exams, isLoading, isError } = useGetAllExams();
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    exams?.filter((e) => filter === "all" || e.examType === filter) ?? [];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-5xl font-black mb-3">
          Entrance <span className="text-gradient-cyan">Exams</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          All major engineering entrance examinations across India.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-8 items-center">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48" data-ocid="exams.select">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(examTypeLabels).map(([val, label]) => (
              <SelectItem key={val} value={val}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} exams found
        </span>
      </div>

      {isError && (
        <div
          className="p-6 rounded-xl border border-destructive/40 bg-destructive/10 text-center"
          data-ocid="exams.error_state"
        >
          <p className="text-destructive">
            Failed to load exams. Please try again.
          </p>
        </div>
      )}

      {isLoading && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="exams.loading_state"
        >
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="text-center py-20" data-ocid="exams.empty_state">
          <p className="text-muted-foreground">
            No exams found for this filter.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((exam, i) => (
          <motion.div
            key={exam.id.toString()}
            data-ocid={`exams.item.${(i + 1) as 1}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
            className="p-5 rounded-xl border border-border bg-card card-glow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display font-bold text-lg leading-tight">
                  {exam.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {exam.conductingBody}
                </p>
              </div>
              <Badge
                variant="outline"
                className={`shrink-0 text-xs ${typeColors[exam.examType] ?? ""}`}
              >
                {exam.examType}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {exam.description}
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  Exam:{" "}
                  <span className="text-foreground">
                    {formatDate(exam.examDate)}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  Deadline:{" "}
                  <span className="text-secondary">
                    {formatDate(exam.applicationDeadline)}
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground line-clamp-1">
                <span className="font-medium text-foreground">
                  Eligibility:
                </span>{" "}
                {exam.eligibilityCriteria}
              </p>
            </div>

            {exam.websiteUrl && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="mt-3 w-full text-primary h-8"
                data-ocid="exams.link"
              >
                <a
                  href={exam.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3 h-3 mr-1" /> Official Website
                </a>
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
