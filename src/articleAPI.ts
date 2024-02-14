import { getCookie } from "./app/utils/cookies";
import { Article } from "./types";

export async function getDetailArticle(slug: string): Promise<Article> {
  const data = await fetch(`${process.env.API_ENDPOINT}/api/articles/${slug}`, {
    cache: "no-store",
  });
  if (!data.ok) {
    throw new Error("failed to get article");
  }
  const article = await data.json();
  return article.article;
}

export const createArticle = async (
  title: string,
  description: string,
  body: string,
  tagList: string[]
) => {
  const res = await fetch(`${process.env.API_ENDPOINT}/api/articles`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({ article: { title, description, body, tagList } }),
  });
  if (res.ok) {
    const article = await res.json();
    return article;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const updateArticle = async (
  title: string,
  description: string,
  body: string,
  tagList: string[],
  slug: string
) => {
  const res = await fetch(`${process.env.API_ENDPOINT}/api/articles/${slug}`, {
    cache: "no-store",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({ article: { title, description, body, tagList } }),
  });
  if (res.ok) {
    const article = await res.json();
    return article;
  } else {
    const errors = await res.json();
    return errors;
  }
};
