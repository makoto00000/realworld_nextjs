"use server";

import { redirect } from "next/navigation";
import { Errors, Article } from "@/types";
import { createArticle, updateArticle } from "@/articleAPI";

export type ArticleActionState = {
  errors: Errors | null;
  article: Article | null;
};

export async function createArticleAction(
  prevState: ArticleActionState,
  formData: FormData
): Promise<ArticleActionState> {
  const result = await createArticle(
    String(formData.get("title")),
    String(formData.get("description")),
    String(formData.get("body")),
    String(formData.get("tagList")).split(",")
  );
  if ("article" in result) {
    redirect("/");
    return {
      errors: null,
      article: result.article,
    };
  } else {
    return {
      errors: result,
      article: null,
    };
  }
}

export async function updateArticleAction(
  prevState: ArticleActionState,
  formData: FormData
): Promise<ArticleActionState> {
  const result = await updateArticle(
    String(formData.get("title")),
    String(formData.get("description")),
    String(formData.get("body")),
    String(formData.get("tagList")).split(","),
    String(formData.get("slug"))
  );
  if ("article" in result) {
    redirect(`/articles/${result.article.slug}`);
    return {
      errors: null,
      article: result.article,
    };
  } else {
    return {
      errors: result,
      article: null,
    };
  }
}
