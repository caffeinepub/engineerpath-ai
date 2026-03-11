import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronRight, Circle } from "lucide-react";
import { motion } from "motion/react";

const stages = [
  {
    phase: "Class 11–12",
    label: "Foundation Phase",
    color: "text-primary",
    border: "border-primary/40",
    bg: "bg-primary/10",
    steps: [
      "Master Physics, Chemistry, Math (PCM)",
      "Start JEE/NEET foundation courses",
      "Practice previous year papers",
      "Develop coding basics (Python/C++)",
      "Explore engineering branches & careers",
    ],
    exams: ["JEE Main", "BITSAT", "VITEEE", "SRMJEEE"],
    tip: "Consistency over intensity. 6 hours/day of focused study beats 12 hours of distracted grinding.",
  },
  {
    phase: "Entrance Exams",
    label: "Exam Cracking Phase",
    color: "text-secondary",
    border: "border-secondary/40",
    bg: "bg-secondary/10",
    steps: [
      "Appear for JEE Main (Jan & Apr sessions)",
      "JEE Advanced for IIT admission",
      "State CET exams (MHT-CET, KCET, etc.)",
      "Management quota + direct admission colleges",
      "JOSAA/CSAB counselling process",
    ],
    exams: ["JEE Advanced", "MHT-CET", "KCET", "WBJEE"],
    tip: "Apply to multiple exams. JEE Advanced isn't the only path to a great engineering career.",
  },
  {
    phase: "College Admission",
    label: "Counselling Phase",
    color: "text-accent",
    border: "border-accent/40",
    bg: "bg-accent/10",
    steps: [
      "JOSAA counselling for IITs, NITs, IIITs",
      "Fill multiple choice preferences",
      "State-level counselling for state colleges",
      "Private college applications & interviews",
      "Secure admission & pay fees by deadline",
    ],
    exams: ["JOSAA", "CSAB", "State Counselling"],
    tip: "Research branch + location carefully. CSE at NIT Trichy > CSE at a low-ranked IIT for placements.",
  },
  {
    phase: "BTech Years (1–4)",
    label: "Engineering Phase",
    color: "text-primary",
    border: "border-primary/40",
    bg: "bg-primary/10",
    steps: [
      "Year 1: Fundamentals, coding bootcamp, clubs",
      "Year 2: DSA, core subjects, first internship",
      "Year 3: Specialization, projects, research/startup",
      "Year 4: Placements, MTech prep, or entrepreneurship",
      "Build GitHub profile & competitive programming",
    ],
    exams: ["GATE", "GRE", "CAT", "UPSC ESE"],
    tip: "Build 3 real projects by Year 3. Internship > CGPA for most product companies.",
  },
  {
    phase: "Post BTech",
    label: "Career Launch Phase",
    color: "text-secondary",
    border: "border-secondary/40",
    bg: "bg-secondary/10",
    steps: [
      "Campus placement at top tech companies",
      "GATE for MTech at IITs/NITs (PSU jobs)",
      "GRE + TOEFL for MS abroad (US/Europe)",
      "Startup founding or joining early-stage startup",
      "Upskill in AI, cloud, or niche domains",
    ],
    exams: ["GATE", "GRE", "TOEFL", "IELTS"],
    tip: "The top 10% of every batch gets campus placements. The other 90% can still build extraordinary careers through upskilling.",
  },
];

export default function RoadmapPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-display text-5xl font-black mb-3">
          Engineering <span className="text-gradient-cyan">Roadmap</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Your complete journey from Class 11 aspirant to engineering graduate
          and beyond.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block" />

        <div className="space-y-8">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.phase}
              data-ocid={`roadmap.item.${(i + 1) as 1}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`lg:w-[calc(50%-2rem)] ${
                i % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
              } relative`}
            >
              <div
                className={`hidden lg:flex absolute ${
                  i % 2 === 0
                    ? "-right-[calc(2rem+1px)]"
                    : "-left-[calc(2rem+1px)]"
                } top-6 w-4 h-4 rounded-full border-2 bg-background ${stage.border} items-center justify-center`}
              />

              <div className={`p-6 rounded-xl border ${stage.border} bg-card`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div
                      className={`text-xs font-mono tracking-widest uppercase ${stage.color} mb-1`}
                    >
                      Phase {i + 1}
                    </div>
                    <h2 className="font-display text-2xl font-bold">
                      {stage.phase}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {stage.label}
                    </p>
                  </div>
                  <CheckCircle2 className={`w-6 h-6 ${stage.color} mt-1`} />
                </div>

                <ul className="space-y-2 mb-4">
                  {stage.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2 text-sm">
                      <ChevronRight
                        className={`w-4 h-4 mt-0.5 shrink-0 ${stage.color}`}
                      />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-4">
                  {stage.exams.map((exam) => (
                    <Badge
                      key={exam}
                      variant="outline"
                      className={`border-current ${stage.color} text-xs`}
                    >
                      {exam}
                    </Badge>
                  ))}
                </div>

                <div
                  className={`p-3 rounded-lg ${stage.bg} border ${stage.border}`}
                >
                  <p className="text-xs text-muted-foreground">
                    💡 <em>{stage.tip}</em>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 p-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-card text-center"
      >
        <Circle className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse-glow" />
        <h2 className="font-display text-3xl font-black mb-3">
          Beyond BTech:{" "}
          <span className="text-gradient-cyan">MTech & Research</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          GATE score opens doors to MTech at IITs/NITs, PSU jobs with ₹60k+
          starting salary, and even PhD research fellowships. Start preparing
          from 3rd year onwards.
        </p>
      </motion.div>
    </div>
  );
}
