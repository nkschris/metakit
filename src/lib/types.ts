export type MetaResponse = {
  url: string;
  title: string | null;
  description: string | null;
  ogImage: string | null;
  favicon: string | null;
  siteName: string | null;
  statusCode: number;
  fetchedAt: string;
};

export type MetaError = {
  error: string;
  message: string;
  statusCode: number;
};
