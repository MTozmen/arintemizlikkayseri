'use client'

import { useState, useEffect, useCallback } from 'react'

type Blog = {
  id: number
  title: string
  content: string
  image: string | null
  createdAt: Date
}

function useVisibleCount() {
  const [count, setCount] = useState(3)

  const update = useCallback(() => {
    const w = window.innerWidth
    if (w <= 600) setCount(1)
    else if (w <= 900) setCount(2)
    else setCount(3)
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  return count
}

export default function BlogSlider({ blogs }: { blogs: Blog[] }) {
  const [current, setCurrent] = useState(0)
  const visibleCount = useVisibleCount()

  const total = blogs.length
  const maxIndex = Math.max(total - visibleCount, 0)

  // Clamp current if visibleCount changes
  useEffect(() => {
    setCurrent(c => Math.min(c, maxIndex))
  }, [maxIndex])

  const prev = () => setCurrent(c => Math.max(c - 1, 0))
  const next = () => setCurrent(c => Math.min(c + 1, maxIndex))

  return (
    <div style={{ position: 'relative', marginTop: '48px' }}>

      {/* ← Prev Button */}
      <button
        onClick={prev}
        disabled={current === 0}
        className="blog-slider-btn blog-slider-btn-prev"
        style={{
          position: 'absolute',
          left: '-24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '2px solid var(--primary)',
          background: current === 0 ? '#f8fafc' : 'var(--primary)',
          color: current === 0 ? 'var(--text-muted)' : 'white',
          fontSize: '22px',
          cursor: current === 0 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
        aria-label="Önceki"
      >
        ‹
      </button>

      {/* Cards Viewport */}
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            gap: '24px',
            transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
            transform: `translateX(calc(-${current} * (100% / ${visibleCount} + 8px)))`,
          }}
        >
          {blogs.map(blog => (
            <div
              key={blog.id}
              style={{
                minWidth: `calc((100% - ${(visibleCount - 1) * 24}px) / ${visibleCount})`,
                background: 'white',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.3s, transform 0.3s',
              }}
              className="blog-card"
            >
              {/* Image */}
              <div style={{ width: '100%', height: '200px', overflow: 'hidden', background: 'linear-gradient(135deg, #e8f5e9, #e3f2fd)', flexShrink: 0 }}>
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                    📰
                  </div>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600', marginBottom: '10px', letterSpacing: '0.5px' }}>
                  {new Date(blog.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <h3 style={{
                  fontSize: '17px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.4',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {blog.title}
                </h3>
                <p style={{
                  fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', flex: 1, marginBottom: '20px',
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {blog.content}
                </p>
                <a href={`/blog/${blog.id}`} style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Devamını Oku →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* → Next Button */}
      <button
        onClick={next}
        disabled={current >= maxIndex}
        className="blog-slider-btn blog-slider-btn-next"
        style={{
          position: 'absolute',
          right: '-24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '2px solid var(--primary)',
          background: current >= maxIndex ? '#f8fafc' : 'var(--primary)',
          color: current >= maxIndex ? 'var(--text-muted)' : 'white',
          fontSize: '22px',
          cursor: current >= maxIndex ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
        aria-label="Sonraki"
      >
        ›
      </button>

      {/* Dot Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '28px' : '10px',
              height: '10px',
              borderRadius: '99px',
              border: 'none',
              background: i === current ? 'var(--primary)' : 'var(--border)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
            aria-label={`Sayfa ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
