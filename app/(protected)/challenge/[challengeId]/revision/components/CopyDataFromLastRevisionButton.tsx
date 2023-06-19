'use client'

import { Copy } from 'lucide-react'
import { FaSpinner } from 'react-icons/fa'

import { Button, ButtonProps, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props extends ButtonProps {
  isLoading: boolean
}

export const CopyDataFromLastRevisionButton = ({
  className,
  isLoading,
  variant,
  disabled,
  onClick,
  ...props
}: Props) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          'cursor-not-allowed opacity-60': disabled
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading
        ? <><span>Copiando</span><FaSpinner className="ml-2 h-4 w-4 animate-spin" /></>
        : <><Copy className="mr-2 h-4 w-4" /><span>Copiar datos de la última revisión</span></>
      }
    </Button>
  )
}
