'use client'

import { useEffect, useState } from 'react'

export function MovingBackground() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className="fixed inset-0 -z-10 w-full h-full transition-transform duration-300"
      style={{
          backgroundImage: 'url("https://www.google.com/imgres?q=backround&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fwavy-elegant-lines-yellow-background_78370-3231.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fbackround&docid=HCIazYFxq9YtSM&tbnid=NF8Va8VtUVO0CM&vet=12ahUKEwjzwae28tSKAxXyd2wGHZfnLmIQM3oECBoQAA..i&w=626&h=398&hcb=2&ved=2ahUKEwjzwae28tSKAxXyd2wGHZfnLmIQM3oECBoQAA")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
      }}
    />
  )
}

