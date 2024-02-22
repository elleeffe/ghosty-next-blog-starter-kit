type Author = {
  name: string;
  picture: string;
};

type Category = 'news';

type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: string;
  content: string;
  preview?: boolean;
  category: Category;
};
