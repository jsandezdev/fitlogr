import React from 'react'

interface Props {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function PageHeader ({
  heading,
  text,
  children
}: Props) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading font-bold text-3xl md:text-4xl">{heading.toUpperCase()}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
