'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { Article } from "@/types";

export default function Editer(props: {article: Article}) {
  const article = props.article;
  
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const [body, setBody] = useState(article.body);
  const [tagName, setTagName] = useState("");
  const [tagList, settagList] = useState<string[]>(article.tagList);
  const [errors, setErrors] = useState<[string, []][] | null>(null);

  const hundletagList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagName.trim() !== '') {
      e.preventDefault();
      settagList((prevtagList: string[]) => [...prevtagList, tagName.trim()])
      setTagName("")
    }
  }

  const deleteTag = (index: number) => {
    settagList((prevtagList) => prevtagList.filter((_, i) => i !== index));
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/articles/${article.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({"article": {title, description, body, tagList}}),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrors(Object.entries(errorData.errors.body));
        
      } else {
        const data = await response.json();
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  console.log(title, description, body, tagName)
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">

          {errors ?
              <ul className="error-messages">
                {errors.map((error) => (
                  error[1].map((err) => (
                    <li key={err}>{error[0]} {err}</li>
                  ))
                ))}
              </ul>
            :""}

            <form onSubmit={onSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Article Title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="What's this article about?" onChange={(e) => setDescription(e.target.value)} value={description}/>
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    onChange={(e) => setBody(e.target.value)} 
                    value={body}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="Enter tagList" 
                  onChange={(e) => setTagName(e.target.value)} 
                  value={tagName}
                  onKeyDown={hundletagList}
                  />

                  <div className="tag-list">
                    {tagList.map((tag, i) => (
                      <span key={i} className="tag-default tag-pill" onClick={() => deleteTag(i)}> <i className="ion-close-round"></i> {tag} </span>
                    ))}
                  </div>

                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}