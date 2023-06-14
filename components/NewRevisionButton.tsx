'use client'

import { Loader2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button, ButtonProps, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props extends ButtonProps {
  challengeId: string
}

export const NewRevisionButton = ({
  challengeId,
  className,
  variant,
  ...props
} : Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleOnClick = () => {
    setIsLoading(true)
    router.push(`/challenge/${challengeId}/revision/new`)
  }

  return (
    <Button
      onClick={handleOnClick}
      className={cn(
        buttonVariants({ variant }),
        {
          'cursor-not-allowed opacity-60': isLoading
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading
        ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )
        : (
          <Plus className="mr-2 h-4 w-4" />
        )}
          Nueva revisión
    </Button>
  )
}
