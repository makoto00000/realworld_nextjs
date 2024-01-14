'use client'

import { GetTags } from '@/articleAPI'
import React from 'react'

const TagList = () => {
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

export default TagList