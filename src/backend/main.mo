import List "mo:core/List";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  public type Domain = {
    #ai;
    #webDev;
    #robotics;
    #core;
    #startup;
    #general;
  };

  public type MentorProfile = {
    id : Nat;
    name : Text;
    domain : Domain;
    bio : Text;
    yearsExperience : Nat;
    college : Text;
    currentRole : Text;
  };

  public type ExamType = {
    #national;
    #state;
    #university;
  };

  public type EntranceExam = {
    id : Nat;
    name : Text;
    description : Text;
    conductingBody : Text;
    examDate : Int;
    applicationDeadline : Int;
    eligibilityCriteria : Text;
    websiteUrl : Text;
    examType : ExamType;
  };

  public type CollegeType = {
    #iit;
    #nit;
    #iiit;
    #privateCollege;
    #deemed;
  };

  public type College = {
    id : Nat;
    name : Text;
    location : Text;
    state : Text;
    nirfRanking : Nat;
    topBranches : [Text];
    avgCutoff : Nat;
    collegeType : CollegeType;
    establishedYear : Nat;
  };

  public type ResourceCategory = {
    #roadmap;
    #startup;
    #ai;
    #finance;
    #skills;
  };

  public type Resource = {
    id : Nat;
    title : Text;
    contentSummary : Text;
    category : ResourceCategory;
    tags : [Text];
    author : Text;
  };

  public type StartupStage = {
    #idea;
    #validation;
    #build;
    #launch;
    #scale;
  };

  public type StartupTip = {
    id : Nat;
    title : Text;
    content : Text;
    stage : StartupStage;
    tags : [Text];
  };

  public type UserStage = {
    #aspirant;
    #firstYear;
    #secondYear;
    #thirdYear;
    #fourthYear;
    #workingProfessional;
  };

  public type UserProfile = {
    name : Text;
    stage : UserStage;
    interests : [Text];
  };

  module MentorProfile {
    public func compareById(a : MentorProfile, b : MentorProfile) : Order.Order {
      Int.compare(a.id, b.id);
    };
  };

  module EntranceExam {
    public func compareById(a : EntranceExam, b : EntranceExam) : Order.Order {
      Int.compare(a.id, b.id);
    };
  };

  module College {
    public func compareById(a : College, b : College) : Order.Order {
      Int.compare(a.id, b.id);
    };
  };

  module Resource {
    public func compareById(a : Resource, b : Resource) : Order.Order {
      Int.compare(a.id, b.id);
    };
  };

  module StartupTip {
    public func compareById(a : StartupTip, b : StartupTip) : Order.Order {
      Int.compare(a.id, b.id);
    };
  };

  // State
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let mentorProfiles = Map.empty<Nat, MentorProfile>();
  let entranceExams = Map.empty<Nat, EntranceExam>();
  let colleges = Map.empty<Nat, College>();
  let resources = Map.empty<Nat, Resource>();
  let startupTips = Map.empty<Nat, StartupTip>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var mentorIdCounter = 0;
  var examIdCounter = 0;
  var collegeIdCounter = 0;
  var resourceIdCounter = 0;
  var tipIdCounter = 0;

  // Mentor CRUD
  public shared ({ caller }) func addMentor(mentor : MentorProfile) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add mentors");
    };
    let id = mentorIdCounter;
    let newMentor : MentorProfile = { mentor with id };
    mentorProfiles.add(id, newMentor);
    mentorIdCounter += 1;
    id;
  };

  public query ({ caller }) func getMentor(id : Nat) : async ?MentorProfile {
    mentorProfiles.get(id);
  };

  public query ({ caller }) func getAllMentors() : async [MentorProfile] {
    mentorProfiles.values().toArray().sort(MentorProfile.compareById);
  };

  public query ({ caller }) func getMentorsByDomain(domain : Domain) : async [MentorProfile] {
    let filtered = mentorProfiles.values().toArray().filter(
      func(mentor) { mentor.domain == domain }
    );
    filtered.sort(MentorProfile.compareById);
  };

  public shared ({ caller }) func updateMentor(id : Nat, mentor : MentorProfile) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update mentors");
    };
    switch (mentorProfiles.get(id)) {
      case null { false };
      case (?_) {
        let updatedMentor : MentorProfile = { mentor with id };
        mentorProfiles.add(id, updatedMentor);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteMentor(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete mentors");
    };
    switch (mentorProfiles.get(id)) {
      case null { false };
      case (?_) {
        mentorProfiles.remove(id);
        true;
      };
    };
  };

  // Exam CRUD
  public shared ({ caller }) func addExam(exam : EntranceExam) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add exams");
    };
    let id = examIdCounter;
    let newExam : EntranceExam = { exam with id };
    entranceExams.add(id, newExam);
    examIdCounter += 1;
    id;
  };

  public query ({ caller }) func getExam(id : Nat) : async ?EntranceExam {
    entranceExams.get(id);
  };

  public query ({ caller }) func getAllExams() : async [EntranceExam] {
    entranceExams.values().toArray().sort(EntranceExam.compareById);
  };

  public shared ({ caller }) func updateExam(id : Nat, exam : EntranceExam) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update exams");
    };
    switch (entranceExams.get(id)) {
      case null { false };
      case (?_) {
        let updatedExam : EntranceExam = { exam with id };
        entranceExams.add(id, updatedExam);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteExam(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete exams");
    };
    switch (entranceExams.get(id)) {
      case null { false };
      case (?_) {
        entranceExams.remove(id);
        true;
      };
    };
  };

  // College CRUD
  public shared ({ caller }) func addCollege(college : College) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add colleges");
    };
    let id = collegeIdCounter;
    let newCollege : College = { college with id };
    colleges.add(id, newCollege);
    collegeIdCounter += 1;
    id;
  };

  public query ({ caller }) func getCollege(id : Nat) : async ?College {
    colleges.get(id);
  };

  public query ({ caller }) func getAllColleges() : async [College] {
    colleges.values().toArray().sort(College.compareById);
  };

  public shared ({ caller }) func updateCollege(id : Nat, college : College) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update colleges");
    };
    switch (colleges.get(id)) {
      case null { false };
      case (?_) {
        let updatedCollege : College = { college with id };
        colleges.add(id, updatedCollege);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteCollege(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete colleges");
    };
    switch (colleges.get(id)) {
      case null { false };
      case (?_) {
        colleges.remove(id);
        true;
      };
    };
  };

  // Resource CRUD
  public shared ({ caller }) func addResource(resource : Resource) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add resources");
    };
    let id = resourceIdCounter;
    let newResource : Resource = { resource with id };
    resources.add(id, newResource);
    resourceIdCounter += 1;
    id;
  };

  public query ({ caller }) func getResource(id : Nat) : async ?Resource {
    resources.get(id);
  };

  public query ({ caller }) func getAllResources() : async [Resource] {
    resources.values().toArray().sort(Resource.compareById);
  };

  public shared ({ caller }) func updateResource(id : Nat, resource : Resource) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update resources");
    };
    switch (resources.get(id)) {
      case null { false };
      case (?_) {
        let updatedResource : Resource = { resource with id };
        resources.add(id, updatedResource);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteResource(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete resources");
    };
    switch (resources.get(id)) {
      case null { false };
      case (?_) {
        resources.remove(id);
        true;
      };
    };
  };

  // Startup Tip CRUD
  public shared ({ caller }) func addStartupTip(tip : StartupTip) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add startup tips");
    };
    let id = tipIdCounter;
    let newTip : StartupTip = { tip with id };
    startupTips.add(id, newTip);
    tipIdCounter += 1;
    id;
  };

  public query ({ caller }) func getStartupTip(id : Nat) : async ?StartupTip {
    startupTips.get(id);
  };

  public query ({ caller }) func getAllStartupTips() : async [StartupTip] {
    startupTips.values().toArray().sort(StartupTip.compareById);
  };

  public shared ({ caller }) func updateStartupTip(id : Nat, tip : StartupTip) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update startup tips");
    };
    switch (startupTips.get(id)) {
      case null { false };
      case (?_) {
        let updatedTip : StartupTip = { tip with id };
        startupTips.add(id, updatedTip);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteStartupTip(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete startup tips");
    };
    switch (startupTips.get(id)) {
      case null { false };
      case (?_) {
        startupTips.remove(id);
        true;
      };
    };
  };

  // User Profile CRUD
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Dummy seed data for testing - not used in production
  public shared ({ caller }) func seedData() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can seed data");
    };

    let mentor1 : MentorProfile = {
      id = 0;
      name = "Alice";
      domain = #ai;
      bio = "AI expert - trying to save the world";
      yearsExperience = 5;
      college = "IIT Bombay";
      currentRole = "Research Scientist";
    };

    let mentor2 : MentorProfile = {
      id = 1;
      name = "Bob";
      domain = #webDev;
      bio = "Full-stack developer";
      yearsExperience = 3;
      college = "IIIT Hyderabad";
      currentRole = "Software Engineer";
    };

    mentorProfiles.add(0, mentor1);
    mentorProfiles.add(1, mentor2);

    let exam1 : EntranceExam = {
      id = 0;
      name = "JEE Main";
      description = "National level engineering entrance exam";
      conductingBody = "NTA";
      examDate = 1633029600;
      applicationDeadline = 1630424400;
      eligibilityCriteria = "12th pass with PCM";
      websiteUrl = "https://jeemain.nta.nic.in";
      examType = #national;
    };

    entranceExams.add(0, exam1);

    let college1 : College = {
      id = 0;
      name = "IIT Bombay";
      location = "Mumbai";
      state = "Maharashtra";
      nirfRanking = 1;
      topBranches = ["CSE", "ECE"];
      avgCutoff = 1000;
      collegeType = #iit;
      establishedYear = 1958;
    };

    colleges.add(0, college1);

    let resource1 : Resource = {
      id = 0;
      title = "AI Roadmap";
      contentSummary = "Comprehensive guide to AI learning path";
      category = #ai;
      tags = ["ai", "roadmap"];
      author = "Dr. Smith";
    };

    resources.add(0, resource1);

    let tip1 : StartupTip = {
      id = 0;
      title = "Validating Startup Ideas";
      content = "Steps to validate your startup idea";
      stage = #validation;
      tags = ["validation", "startup"];
    };

    startupTips.add(0, tip1);

    mentorIdCounter := 2;
    examIdCounter += 1;
    collegeIdCounter += 1;
    resourceIdCounter += 1;
    tipIdCounter += 1;
  };
};
