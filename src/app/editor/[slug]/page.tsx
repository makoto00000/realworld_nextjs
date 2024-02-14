import Editer from "@/app/components/Editer";
import { getDetailArticle } from "@/articleAPI";
import { updateArticleAction } from "@/app/utils/articleActions";

export default async function EditArticle({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getDetailArticle(params.slug);
  return (
    <div className="editor-page">
      <Editer article={article} action={updateArticleAction} />
    </div>
  );
}
