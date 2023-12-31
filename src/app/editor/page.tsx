'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";

export default function CreateArticle() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagName, setTagName] = useState("");
  const [tagList, settagList] = useState<string[]>([]);
  const [errors, setErrors] = useState<[string, []][] | null>(null);

  const hundletagList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter' && tagName.trim() !== '') {
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
      const response = await fetch('http://localhost:3001/api/articles', {
        method: 'POST',
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
                  <input type="text" className="form-control form-control-lg" placeholder="Article Title" onChange={(e) => setTitle(e.target.value)} />
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="What's this article about?" onChange={(e) => setDescription(e.target.value)} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    onChange={(e) => setBody(e.target.value)} 
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="Enter tagList" 
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)} onKeyDown={hundletagList} />

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