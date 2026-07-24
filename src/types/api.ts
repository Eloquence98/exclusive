// src/types/api.ts

/**
 * Standard backend success/error response wrapper.
 *
 * Backend shape:
 * {
 *   status: "success",
 *   results?: number,
 *   token?: string,
 *   meta?: {
 *     pagination: {...}
 *   },
 *   data: {
 *     data: T
 *   }
 * }
 */
export interface ApiResponse<T> {
  status: "success" | "fail" | "error";
  results?: number;
  token?: string;
  meta?: ApiMeta;
  data: T;
}

/**
 * Metadata returned with list endpoints.
 */
export interface ApiMeta {
  pagination: PaginationMeta;
}

/**
 * Pagination information returned by backend.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  totalDocuments: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Backend error response.
 *
 * Example:
 * {
 *   status: "fail",
 *   message: "Product not found"
 * }
 */
export interface ApiErrorResponse {
  status: "fail" | "error";
  message: string;
}
