/**
 * src/types/index.ts
 * Defines interfaces for the data structures used throughout the application,
 * primarily for content fetched from external APIs and data submitted to external services.
 */

/**
 * Represents a simplified newsletter item in a list view.
 */
export interface NewsletterListItem {
  id: string;
  title: string;
  publishDate: string; // ISO 8601 string, e.g., "2023-10-26"
  description: string;
  imageUrl?: string; // Optional image for list display
}

/**
 * Represents the detailed content of a specific newsletter issue.
 */
export interface NewsletterContent {
  id: string;
  title: string;
  publishDate: string; // ISO 8601 string
  author: string;
  contentHtml: string; // HTML string of the newsletter body
  sections?: {
    title: string;
    bodyHtml: string;
  }[];
  // Add any other relevant fields for a detailed view
}

/**
 * Represents the payload for a user subscription request.
 */
export interface SubscriptionPayload {
  email: string;
  firstName?: string;
  lastName?: string;
  // Add any other fields required by the external subscription service
}

/**
 * Represents a generic API response structure (optional, but good practice).
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}