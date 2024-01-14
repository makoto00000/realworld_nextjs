'use client'

import { Article, Articles } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Paginate from './Paginate';
import Link from 'next/link';
import { formatDate } from '../utils/formatDate';
import { GetArticles } from '@/articleAPI';

const ArticleList = () => {
  // const [articles, setArticles] = useState<Articles>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const perPage = 10

  const hundleCurrentPage = (selectedPage: number) => {
    setCurrentPage(() => selectedPage)
  }

  // useEffect(() => {
  //   const getArticles = async () => {
  //     const data = await fetch("http://localhost:3001/api/articles", { cache: "no-store" });
  //     if (!data.ok) {
  //       throw new Error("failed to get articles")
  //     }
  //     const articles: Articles = await data.json();
  //     setArticles(articles)
  //   }
  //   getArticles();
  // }, [])
  const {articles, isLoading, isError} = GetArticles(currentPage, perPage)
  
  if (isError) return <div>Load is Failed</div>
  if (isLoading) return <div>Loading...</div>
  if (articles) {

    return (
      <>
        {articles.articles.map((article: Article) => (
          <div className="article-preview" key={article.slug}>
            <div className="article-meta">
              <a href="/profile/eric-simons"><Image src={article.user.image} alt="" width={100} height={100}/></a>
              <div className="info">
                <a href="/profile/eric-simons" className="author">{article.user.username}</a>
                <span className="date">{formatDate(article.created_at)}</span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart"></i> 29
              </button>
            </div>
            <Link href={`/articles/${article.slug}`} className="preview-link">
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
              <ul className="tag-list">
                <li className="tag-default tag-pill tag-outline">realworld</li>
                <li className="tag-default tag-pill tag-outline">implementations</li>
              </ul>
            </Link>
          </div>
        ))
      }
        <Paginate perPage = {perPage} pageCount = {articles.article_count} currentPage = {currentPage} hundleCurrentPage = {hundleCurrentPage} />
      </>
    )
  }
}

export default ArticleList