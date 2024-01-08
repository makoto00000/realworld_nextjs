import Editer from "@/app/components/Editer"
import { getDetailArticle } from "@/articleAPI"
import { Suspense } from 'react'
export default async function EditArticle({ params }: { params: {slug: string } }) {

  const article = await getDetailArticle(params.slug);
  return (
    <div className="editor-page">
      <Editer article={article} />
    </div>
  )
}