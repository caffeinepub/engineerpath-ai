import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MentorProfile {
    id: bigint;
    bio: string;
    domain: Domain;
    yearsExperience: bigint;
    name: string;
    currentRole: string;
    college: string;
}
export interface EntranceExam {
    id: bigint;
    applicationDeadline: bigint;
    conductingBody: string;
    websiteUrl: string;
    name: string;
    description: string;
    examDate: bigint;
    eligibilityCriteria: string;
    examType: ExamType;
}
export interface StartupTip {
    id: bigint;
    title: string;
    content: string;
    tags: Array<string>;
    stage: StartupStage;
}
export interface College {
    id: bigint;
    name: string;
    collegeType: CollegeType;
    avgCutoff: bigint;
    establishedYear: bigint;
    state: string;
    nirfRanking: bigint;
    topBranches: Array<string>;
    location: string;
}
export interface Resource {
    id: bigint;
    title: string;
    tags: Array<string>;
    author: string;
    category: ResourceCategory;
    contentSummary: string;
}
export interface UserProfile {
    interests: Array<string>;
    name: string;
    stage: UserStage;
}
export enum CollegeType {
    iit = "iit",
    nit = "nit",
    iiit = "iiit",
    privateCollege = "privateCollege",
    deemed = "deemed"
}
export enum Domain {
    ai = "ai",
    startup = "startup",
    core = "core",
    general = "general",
    robotics = "robotics",
    webDev = "webDev"
}
export enum ExamType {
    national = "national",
    university = "university",
    state = "state"
}
export enum ResourceCategory {
    ai = "ai",
    roadmap = "roadmap",
    finance = "finance",
    startup = "startup",
    skills = "skills"
}
export enum StartupStage {
    idea = "idea",
    launch = "launch",
    scale = "scale",
    build = "build",
    validation = "validation"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum UserStage {
    firstYear = "firstYear",
    workingProfessional = "workingProfessional",
    fourthYear = "fourthYear",
    thirdYear = "thirdYear",
    secondYear = "secondYear",
    aspirant = "aspirant"
}
export interface backendInterface {
    addCollege(college: College): Promise<bigint>;
    addExam(exam: EntranceExam): Promise<bigint>;
    addMentor(mentor: MentorProfile): Promise<bigint>;
    addResource(resource: Resource): Promise<bigint>;
    addStartupTip(tip: StartupTip): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteCollege(id: bigint): Promise<boolean>;
    deleteExam(id: bigint): Promise<boolean>;
    deleteMentor(id: bigint): Promise<boolean>;
    deleteResource(id: bigint): Promise<boolean>;
    deleteStartupTip(id: bigint): Promise<boolean>;
    getAllColleges(): Promise<Array<College>>;
    getAllExams(): Promise<Array<EntranceExam>>;
    getAllMentors(): Promise<Array<MentorProfile>>;
    getAllResources(): Promise<Array<Resource>>;
    getAllStartupTips(): Promise<Array<StartupTip>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCollege(id: bigint): Promise<College | null>;
    getExam(id: bigint): Promise<EntranceExam | null>;
    getMentor(id: bigint): Promise<MentorProfile | null>;
    getMentorsByDomain(domain: Domain): Promise<Array<MentorProfile>>;
    getResource(id: bigint): Promise<Resource | null>;
    getStartupTip(id: bigint): Promise<StartupTip | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedData(): Promise<void>;
    updateCollege(id: bigint, college: College): Promise<boolean>;
    updateExam(id: bigint, exam: EntranceExam): Promise<boolean>;
    updateMentor(id: bigint, mentor: MentorProfile): Promise<boolean>;
    updateResource(id: bigint, resource: Resource): Promise<boolean>;
    updateStartupTip(id: bigint, tip: StartupTip): Promise<boolean>;
}
