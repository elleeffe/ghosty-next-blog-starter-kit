import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getPostBySlug} from '@/utils/api';
import markdownToHtml from '@/utils/markdownToHtml';
import Container from '@/components/container';
import Header from '@/components/header';
import {PostBody} from '@/components/post-body';
import {PostHeader} from '@/components/post-header';

type Params = {
  params: {
    category: Category;
    slug: string;
  };
};

export function generateMetadata({params}: Params): Metadata {
  const postSlug = `/${params.category}/${params.slug}`;
  const post = getPostBySlug(decodeURIComponent(postSlug));

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog`;

  const description = post.excerpt;

  return {
    title,
    description,
    metadataBase: new URL('http://localhost:3000'),
    openGraph: {
      title,
      description,
      images: [post.ogImage],
    },
  };
}

export default async function PostPage({params}: Params) {
  const postSlug = `/${params.category}/${params.slug}`;
  const post = getPostBySlug(decodeURIComponent(postSlug));

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || '');

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            slug={postSlug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}
