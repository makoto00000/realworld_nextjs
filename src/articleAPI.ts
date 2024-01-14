import { Article } from "./types";

export async function getDetailArticle(slug: string):Promise<Article> {
  const data = await fetch(`http://localhost:3001/api/articles/${slug}`, { cache: "no-store" });
  if (!data.ok) {
    throw new Error("failed to get article")
  }
  const article = await data.json();
  return article.article;
}
