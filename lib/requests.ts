export type RequestStatus = "yeni" | "incelendi";

export type SiteRequest = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: RequestStatus;
  createdAt: string;
};

export function normalizeRequest(value: unknown): SiteRequest | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Partial<SiteRequest>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const message = typeof record.message === "string" ? record.message.trim() : "";
  const id = typeof record.id === "string" ? record.id : "";
  const createdAt = typeof record.createdAt === "string" ? record.createdAt : "";
  if (!id || !name || !email || !message || !createdAt) return null;
  return {
    id,
    name,
    email,
    message,
    createdAt,
    status: record.status === "incelendi" ? "incelendi" : "yeni",
  };
}
