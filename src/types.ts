export type Articles = {
  articles: Article[],
  article_count: number,
}

export type Article = {
  slug: string, 
  title: string, 
  description: string, 
  body: string, 
  tagList: string[],
  createdAt: string, 
  updatedAt: string,
  created_at: string, 
  updated_at: string,
  favorited: boolean,
  favoritesCount: number,
  user: User,
  author: {
      username: string,
      bio: string,
      image: string,
      following: boolean
  }
}

export type User = {
  id: string,
  username: string,
  email: string,
  password_digest: string,
  token: null | string,
  bio: null | string,
  image: string,
  createdAt: string,
  updatedAt: string,
}

export type Tags = {
  tagList: string[]
}

export type Errors = {
  errors: {
    body: [string, string[]][]
  }
}