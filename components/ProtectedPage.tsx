import * as React from 'react'

import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function ProtectedPage ({
  children,
  className,
  ...props
}: Props) {
  return (
    <div className={cn('grid items-start gap-8', className)} {...props}>
      {children}
    </div>
  )
}
