'use client'

import { Copy } from 'lucide-react'

import { Button, ButtonProps, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props extends ButtonProps {}

export const CopyDataFromLastRevisionButton = ({
  className,
  variant,
  disabled,
  ...props
}: Props) => {
  const handleOnClick = () => {
    
  }

  return (
    <Button
      onClick={handleOnClick}
      className={cn(
        buttonVariants({ variant }),
        {
          'cursor-not-allowed opacity-60': disabled
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      <Copy className='mr-2 h-4 w-4' />
      Copiar datos de la última revisión
    </Button>
  )
}
