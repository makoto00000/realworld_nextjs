import useSWR from "swr";
import { Articles, Tags } from "./types";

async function tagsFetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<Tags | null>);
}

async function articlesFetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<Articles | null>);
}

export const getArticles = (offset: number, limit: number) => {
  const { data, error, isLoading } = useSWR(
    `http://localhost:3001/api/articles?offset=${offset}&limit=${limit}`,
    articlesFetcher
  );
  return {
    articles: data,
    isLoading,
    isError: error,
  }
}

export async function getDetailArticle(slug: string):Promise<Articles> {
  const data = await fetch(`http://localhost:3001/api/articles/${slug}`, { cache: "no-store" });
  if (!data.ok) {
    throw new Error("failed to get article")
  }
  const article = await data.json();
  return article.article;
}

export const getTags = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3001/api/tags",
    tagsFetcher
  );
  return {
    tags: data,
    isLoading,
    isError: error,
  }
}
