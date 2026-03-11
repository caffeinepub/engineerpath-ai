import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserProfile } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllExams() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllExams();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllColleges() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllColleges();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllMentors() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMentors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllResources() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllResources();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllStartupTips() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["startupTips"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStartupTips();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSeedData() {
  const { actor } = useActor();
  return useQuery({
    queryKey: ["seed"],
    queryFn: async () => {
      if (!actor) return null;
      await actor.seedData();
      return true;
    },
    enabled: !!actor,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}
