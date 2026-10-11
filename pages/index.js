import React from 'react'
import Link from 'next/link'
import { Row, Col } from '../components/flexbox-grid'

import Layout from '../components/Layout'
import Pagination, { POSTS_PER_PAGE, getTotalPages } from '../components/Pagination'
import { writings as allWritings } from '../lib/generated-posts'

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const today  = new Date(date);

  return today.toLocaleDateString("en-US", options);
}

export function WritingsList({ writings, page }) {
  const totalPages = getTotalPages(writings.length)
  const paged = writings.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  return (
    <>
      <Layout isHomepage>
        <Row>
          {paged.map(({ data, slug }) => {
            const { title, date } = data

            return (
              <Col md={6} key={slug}>
                <div className="writing-row" key={title}>
                  <Row>
                    <Col md={12}>
                      <div className="writing-date">{formatDate(date)}</div>
                    </Col>

                    <Col md={12}>
                      <Link href="/writings/[slug]" as={`/writings/${slug}`}>
                        <a>
                          <span className="writing-title">{title}</span>
                        </a>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Col>
            )
          })}
        </Row>
        <Pagination currentPage={page} totalPages={totalPages} />
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  // writings are pre-generated at build time (scripts/build-content.mjs),
  // sorted newest-first. Only slug + frontmatter needed for the listing.
  const writings = allWritings.map(({ slug, data }) => ({ slug, data }))

  return {
    props: {
      writings,
      page: 1,
    },
  }
}

export default function Homepage({ writings, page }) {
  return <WritingsList writings={writings} page={page} />
}
