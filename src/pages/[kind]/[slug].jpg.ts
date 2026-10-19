import type { APIContext, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

import {
  isSocialImageKind,
  renderSocialImage,
  socialImageSizes,
  type SocialImageKind,
} from '@/data/socialImages';
import { getPostSlug } from '@/utils';

// One share image per post and size: /og/<slug>.jpg and /rss/<slug>.jpg
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts');
  const kinds = Object.keys(socialImageSizes) as SocialImageKind[];
  return kinds.flatMap((kind) =>
    posts.map((post) => ({
      params: { kind, slug: getPostSlug(post.id) },
      props: { post },
    })),
  );
};

interface Props {
  post: CollectionEntry<'posts'>;
}

export async function GET({ params, props }: APIContext<Props>): Promise<Response> {
  if (!isSocialImageKind(params.kind)) return new Response(null, { status: 404 });

  const image = await renderSocialImage(props.post, params.kind);
  return new Response(image, { headers: { 'Content-Type': 'image/jpeg' } });
}
