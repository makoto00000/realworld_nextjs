import { Article, Articles } from "./types";

export async function getArticles():Promise<Articles> {
  const data = await fetch("http://localhost:3001/api/articles", { cache: "no-store" });
  if (!data.ok) {
    throw new Error("failed to get articles")
  }
  const articles: Articles = await data.json();
  return articles;
}

export async function getDetailArticle(slug: string):Promise<Article> {
  const data = await fetch(`http://localhost:3001/api/articles/${slug}`, { cache: "no-store" });
  if (!data.ok) {
    throw new Error("failed to get article")
  }
  const article = await data.json();
  return article.article;
}

