interface BlogDetailsPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogDetailsPageProps) {
  const postTitle = decodeURIComponent(params.slug.replace(/-/g, " "));

  return {
    title: `${postTitle} | Blog`,
    description: `Read our latest blog post titled "${postTitle}". Stay informed with in-depth analysis, expert insights, and practical advice.`,
  };
}

const BlogDetailsPage = () => {
  return <div>Blog Details Page</div>;
};

export default BlogDetailsPage;
