import React from 'react'
import Link from 'next/link'

export const POSTS_PER_PAGE = 6

export function getTotalPages(totalPosts) {
  return Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE))
}

const linkStyle = {
  display: 'inline-block',
  padding: '6px 16px',
  margin: '4px',
  borderRadius: '9999px',
  border: '1px solid #52525b',
  color: '#d4d4d8',
  textDecoration: 'none',
  fontSize: '14px',
}

const currentStyle = {
  ...linkStyle,
  background: '#f4f4f5',
  color: '#18181b',
  borderColor: '#f4f4f5',
}

export default function Pagination({ currentPage, totalPages, basePath = '' }) {
  if (totalPages <= 1) return null

  const pageLink = pageNum =>
    pageNum === 1 ? `${basePath}/` : `${basePath}/page/${pageNum}`

  const items = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) items.push(i)
  } else {
    items.push(1)
    if (currentPage > 3) items.push('ellipsis-start')
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      items.push(i)
    }
    if (currentPage < totalPages - 2) items.push('ellipsis-end')
    items.push(totalPages)
  }

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: '40px',
        padding: '0 20px',
      }}
    >
      {currentPage > 1 && (
        <Link href={pageLink(currentPage - 1)} style={linkStyle}>
          Previous
        </Link>
      )}
      {items.map(item =>
        typeof item === 'string' ? (
          <span key={item} style={{ margin: '0 4px', color: '#71717a' }}>
            …
          </span>
        ) : item === currentPage ? (
          <span key={item} style={currentStyle}>
            {item}
          </span>
        ) : (
          <Link key={item} href={pageLink(item)} style={linkStyle}>
            {item}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link href={pageLink(currentPage + 1)} style={linkStyle}>
          Next
        </Link>
      )}
    </nav>
  )
}
