

// src/lib/api.ts
// No base URL needed — Vite proxies /api/* to http://localhost:5000 in dev,
// and in production your reverse-proxy (Nginx/Vercel/etc) does the same.

// src/lib/api.ts
const API_BASE = "/backend";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}
// ── Types 
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  authorName: string;
  author: "editor" | "ai";
  status: "draft" | "published";
  readingMinutes: number;
  metaDescription: string;
  createdAt: string;
  publishedAt: string | null;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "editor" | "admin";
}

export interface GeneratedDraft {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  metaDescription: string;
  author: "ai";
}

export type PostPayload = Partial<Omit<Post, "id" | "createdAt" | "readingMinutes">>;

// ── Auth 
export const auth = {

  register: (name: string, email: string, password: string) =>
    request<AdminUser>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),
    
  login: (email: string, password: string) =>
    request<AdminUser>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>  
    //  removed the /backend prefix
    request<{ ok: boolean }>("/api/auth/logout", { method: "POST" }),

  me: () => request<AdminUser>("/api/auth/me"),
};

// ── Admin posts 
export const adminPosts = {
  list: () =>
    request<Post[]>("/api/admin/posts"),

  create: (payload: PostPayload) =>
    request<Post>("/api/admin/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: PostPayload) =>
    request<Post>(`/api/admin/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  delete: (id: string) =>
    request<{ ok: boolean }>(`/api/admin/posts/${id}`, { method: "DELETE" }),
};

// ── AI generation 
export const ai = {
  generate: (topic: string, keywords: string[], tone: string) =>
    request<GeneratedDraft>("/api/admin/generate", {
      method: "POST",
      body: JSON.stringify({ topic, keywords, tone }),
    }),
};

// ── Public blog (used by Blog.tsx and BlogPost.tsx) 
export const publicPosts = {
  list: ()             => request<Post[]>("/api/blog"),
  bySlug: (slug: string) => request<Post>(`/api/blog/${slug}`),
};