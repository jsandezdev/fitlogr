import { signIn } from 'next-auth/react'
import { Dispatch, SetStateAction } from 'react'
import { FaGoogle, FaSpinner } from 'react-icons/fa'

import { cn } from '@/lib/utils'

import { buttonVariants } from './ui/button'

interface Props {
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  disabled: boolean
}

export const SocialLogin = ({ isLoading, setIsLoading, disabled } : Props) => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continua con
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={() => {
          setIsLoading(true)
          signIn('google', { callbackUrl: '/' })
        }}
        disabled={isLoading || disabled}
      >
        {isLoading
          ? (
            <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
          )
          : (
            <FaGoogle className="mr-2 h-4 w-4" />
          )}{' '}
        Google
      </button>
    </>
  )
}
