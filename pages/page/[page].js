import React from 'react'
import { WritingsList } from '../index'
import { getTotalPages } from '../../components/Pagination'
import { writings as allWritings } from '../../lib/generated-posts'

export async function getServerSideProps({ params }) {
  const page = parseInt(params.page, 10)
  const writings = allWritings.map(({ slug, data }) => ({ slug, data }))
  const totalPages = getTotalPages(writings.length)

  if (isNaN(page) || page < 1 || page > totalPages) {
    return { notFound: true }
  }
  if (page === 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      writings,
      page,
    },
  }
}

export default function PaginatedHomepage({ writings, page }) {
  return <WritingsList writings={writings} page={page} />
}
