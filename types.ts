export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    avatar?: CosmicImage;
    website?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
  };
}

export interface Tag extends CosmicObject {
  type: 'tags';
  metadata: {
    name?: string;
  };
}

export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    excerpt?: string;
    content?: string;
    featured_image?: CosmicImage;
    published_date?: string;
    author?: Author;
    category?: Category;
    tags?: Tag[];
  };
}

export interface Comment extends CosmicObject {
  type: 'comments';
  metadata: {
    author_name?: string;
    email?: string;
    comment?: string;
    approved?: boolean;
    date?: string;
    post?: Post | string;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}