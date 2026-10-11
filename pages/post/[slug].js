import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { posts } from '../../lib/generated-posts'

export default function PostTemplate({ content, data }) {
  // This holds the data between `---` from the .md file
  const frontmatter = data

  return (
    <div>
      <h1>{frontmatter.title}</h1>

      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.params
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return { notFound: true }
  }

  return {
    props: {
      content: post.content,
      data: post.data,
    },
  }
}
