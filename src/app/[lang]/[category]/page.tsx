import Container from '@/components/container';
import {HeroPost} from '@/components/hero-post';
import {Intro} from '@/components/intro';
import {MoreStories} from '@/components/more-stories';
import {getAllPostsByCategory} from '@/utils/api';
import {Metadata} from 'next';
import {notFound} from 'next/navigation';

type Params = {
  params: {
    lang: Language;
    category: Category;
  };
};

export function generateMetadata({params}: Params): Metadata {
  const title = `${params.category} | Next.js Blog`;
  const description = '';

  return {
    title,
    description,
    metadataBase: new URL('http://localhost:3000'),
    openGraph: {
      title,
      description,
    },
  };
}

export default function CategoryPage({params}: Params) {
  const allPosts = getAllPostsByCategory(params.lang, params.category);

  if (!allPosts) {
    return notFound();
  }

  if (allPosts.length === 0) {
    return (
      <main>
        <Container>
          <Intro />
          <h1>Nessun post per {params.category}</h1>
        </Container>
      </main>
    );
  }

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
