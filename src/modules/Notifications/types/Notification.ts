export interface Notification {
  id: string;
  type: "info" | "message" | "trip" | "success";
  title: string;
  timeAgo: string;
}
