"use client"

import { useEffect, useState } from "react"

export function ParallaxSection() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section className="relative h-[20vh] mb-4 overflow-hidden">
      <div
        className="absolute inset-0 "
        style={{
          transform: `translateY(${offset * 0.5}px)`,
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translateY(${offset * 0.2}px)`,
        }}
      >
        <h2 className="text-5xl font-light text-white">Scroll to explore</h2>
      </div>
    </section>
  )
}

