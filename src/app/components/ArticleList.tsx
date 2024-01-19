'use client'

import { Article, Articles } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react'
import Paginate from './Paginate';
import Link from 'next/link';
import { formatDate } from '../utils/formatDate';
import useSWR from 'swr';

export default function ArticleList() {
  
  async function articlesFetcher(key: string) {
    return fetch(key).then((res) => res.json() as Promise<Articles | null>);
  }
  
  const GetArticles = (offset: number, limit: number) => {
    const { data, error, isLoading } = useSWR(
      `http://localhost:3001/api/articles?offset=${offset}&limit=${limit}`,
      articlesFetcher
    );
    return {
      articles: data,
      isError: error,
      isLoading,
    }
  }

  const [currentPage, setCurrentPage] = useState<number>(0);
  const perPage = 10
  const hundleCurrentPage = (selectedPage: number) => {
    setCurrentPage(() => selectedPage)
  }

  const {articles, isError, isLoading} = GetArticles(currentPage, perPage)
  
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
