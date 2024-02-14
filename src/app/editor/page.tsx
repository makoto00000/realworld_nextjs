"use client";

import Editer from "@/app/components/Editer";
import { createArticleAction } from "@/app/utils/articleActions";

export default function CreateArticle() {
  const article = null;
  return <Editer article={null} action={createArticleAction} />;
}
