import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Link from 'next/link'
import Head from 'next/head'
import ProgressBar from 'react-scroll-progress-bar'

import Layout from '../../components/Layout'
import CodeBlock from '../../components/CodeBlock'
import { writings } from '../../lib/generated-posts'

function Writing({ content, data }) {
  const frontmatter = data
  const { title, author } = frontmatter
  const avatar = `https://avatars.githubusercontent.com/u/2747740?v=4`;

  return (
    <>
      <div className="writing-progress">
        <ProgressBar height="5px" />
      </div>

      <Layout secondaryPage noHead>
        <div style={{ marginTop: 50 }}>
          <Link href="/" as="/">
            <a className="back-button">
              back
            </a>
          </Link>
          <h1 className="writing-title-h1">{title}</h1>

          {author && (
            <div className="author">
              <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener noreferrer nofollow">
                <img src={avatar} />
                {author.name}
              </a>
            </div>
          )}

          <div className="writing-container">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                code: CodeBlock,
                a: props => {
                  if (!props.href || !props.href.startsWith('http')) {
                     return props.href;
                  }

                  return <a href={props.href} rel="nofollow noreferrer noopener" target="_blank">{props.children}</a>;
                }
              }}
            >
              {content}
            </ReactMarkdown>

            <div className="twitter-follow">
              If you have any questions or comments, for now you can reach out to me on {' '}
              <a href="https://twitter.com/timofey" rel="noopener noreferrer nofollow">Twitter</a>.
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.params
  const post = writings.find(w => w.slug === slug)

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

export default Writing
