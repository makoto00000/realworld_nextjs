"use client";

import { useState } from "react";
import { ArticleActionState } from "../utils/articleActions";
import { useFormState } from "react-dom";
import FormErrors from "../components/formComponents/FormErrors";
import { Article } from "@/types";

type Props = {
  article: Article | null;
  action: (prevState: ArticleActionState, formData: FormData) => Promise<ArticleActionState>
};
export default function Editer({ article, action }: Props) {
  const [title, setTitle] = useState<string>(article?.title || "");

  const [description, setDescription] = useState<string>(
    article?.description || ""
  );
  const [body, setBody] = useState<string>(article?.body || "");
  const [tagName, setTagName] = useState("");
  const [tagList, settagList] = useState<string[]>(article?.tagList || []);
  const [slug] = useState<string>(article?.slug || "");

  const [formState, formAction] = useFormState(action, {
    errors: null,
    article: null,
  });

  const hundletagList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagName.trim() !== "") {
      e.preventDefault();
      settagList((prevtagList: string[]) => [...prevtagList, tagName.trim()]);
      setTagName("");
    }
  };

  const deleteTag = (index: number) => {
    settagList((prevtagList) => prevtagList.filter((_, i) => i !== index));
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {formState.errors ? <FormErrors {...formState.errors} /> : ""}

            <form action={formAction}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="title"
                    value={title}
                    placeholder="Article Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input type="hidden" name="slug" value={slug} />
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={description}
                    placeholder="What's this article about?"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    name="body"
                    value={body}
                    placeholder="Write your article (in markdown)"
                    onChange={(e) => setBody(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tagList"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    onKeyDown={hundletagList}
                  />
                  <input type="hidden" value={tagList} name="tagList" />
                  <div className="tag-list">
                    {tagList.map((tag, i) => (
                      <span
                        key={i}
                        className="tag-default tag-pill"
                        onClick={() => deleteTag(i)}
                      >
                        {" "}
                        <i className="ion-close-round"></i> {tag}{" "}
                      </span>
                    ))}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
