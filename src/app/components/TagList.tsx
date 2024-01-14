'use client'

import { Tags } from '@/types';
import React from 'react'
import useSWR from 'swr';

export default function TagList() {

  async function tagsFetcher(key: string) {
    return fetch(key).then((res) => res.json() as Promise<Tags | null>);
  }

  const GetTags = () => {
    const { data, error, isLoading } = useSWR(
      "http://localhost:3001/api/tags",
      tagsFetcher
    );
    return {
      tags: data,
      isLoading,
      isError: error,
    }
  }

  const {tags, isLoading, isError} = GetTags();
  if (isError) return <div>Load is Failed</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="tag-list">
    {tags?.tagList.map((tag, index) => (
      <a href="" key={index} className="tag-pill tag-default">{tag}</a>
    ))}
    </div>
  )
}
