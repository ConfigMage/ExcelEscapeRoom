'use client'

interface StarRatingProps {
  stars: number
  size?: 'sm' | 'md' | 'lg'
}

export function StarRating({ stars, size = 'md' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
  }

  return (
    <div className={`flex justify-center gap-1 ${sizeClasses[size]}`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={i <= stars ? 'text-yellow-400' : 'text-gray-300'}
        >
          ⭐
        </span>
      ))}
    </div>
  )
}
