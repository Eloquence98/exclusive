import { ApiResponse } from "@/types/api";

export interface BackendUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
  role: string;
}

export interface SyncGoogleUserPayload {
  idToken: string;
  photo?: string;
}

export type SyncGoogleUserResponse = ApiResponse<BackendUser>;
