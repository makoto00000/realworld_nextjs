import { formatDate } from "@/app/utils/formatDate";
import { getDetailArticle } from "@/articleAPI";
import { getCurrentUser } from "@/userAPI";
import Image from "next/image"
import Link from "next/link";

export default async function Article({ params }: { params: {slug: string } }) {
  const article = await getDetailArticle(params.slug);
  const current_user = await getCurrentUser();
  console.log(current_user)
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <a href="/profile/eric-simons"><Image src={article.author.image} alt={article.author.username} width={100} height={100} /></a>
            <div className="info">
              <a href="/profile/eric-simons" className="author">{article.author.username}</a>
              <span className="date">{formatDate(article.createdAt)}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {article.author.username} <span className="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
            </button>
            <Link href={`/editor/${article.slug}`}>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-edit"></i> Edit Article
            </button>

            </Link>
            <button className="btn btn-sm btn-outline-danger">
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>
              {article.description}
            </p>
            <p>
              {article.body}
            </p>

            <ul className="tag-list">
              {article.tagList.map((tag, i) => (
                <li key={i} className="tag-default tag-pill tag-outline">{tag}</li>
              ))}
            </ul>

          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html"><Image src={article.author.image} alt={article.author.username} width={100} height={100} /></a>
            <div className="info">
              <a href="" className="author">{article.author.username}</a>
              <span className="date">{formatDate(article.createdAt)}</span>
            </div>

            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {article.author.username}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Article <span className="counter">({article.favoritesCount})</span>
            </button>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-edit"></i> Edit Article
            </button>
            <button className="btn btn-sm btn-outline-danger">
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </div>
        </div>
        
        {current_user ? 
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
                </div>
                <div className="card-footer">
                  <Image src={current_user.image} alt={current_user.username} className="comment-author-img" width={100} height={100} />
                  <button className="btn btn-sm btn-primary">Post Comment</button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to additional content.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <Image src={"http://i.imgur.com/Qr71crq.jpg"} alt={"eric-simons"} className="comment-author-img" width={100} height={100} />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to additional content.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <Image src={"http://i.imgur.com/Qr71crq.jpg"} alt={"eric-simons"} className="comment-author-img" width={100} height={100} />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        : 
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
                <Link href={"/login"}>Sign in</Link> or <Link href={"/register"}>Sign up</Link> to add comments on this article.
            </div>
          </div>
        }

      </div>
    </div>
  )
}