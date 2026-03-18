'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  href?: string
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-body font-bold rounded-xl transition-all duration-200 cursor-pointer select-none'

    const variants = {
      primary: 'bg-amber-brand text-navy-800 hover:bg-amber-400 shadow-[0_4px_16px_rgba(232,160,32,0.3)] hover:shadow-glow-amber',
      secondary: 'bg-navy-600 text-white hover:bg-navy-500 shadow-card hover:shadow-card-hover',
      ghost: 'bg-white/8 text-white hover:bg-white/14 border border-white/10',
      outline: 'border-2 border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white',
    }

    const sizes = {
      sm: 'text-sm px-4 py-2 rounded-lg',
      md: 'text-sm px-5 py-2.5',
      lg: 'text-base px-7 py-3.5',
      xl: 'text-base px-9 py-4 rounded-2xl',
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97 }}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(props as any)}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button
