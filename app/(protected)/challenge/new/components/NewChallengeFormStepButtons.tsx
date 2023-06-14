import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FaSpinner } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  isLoading: boolean,
  onPrevious?: () => void
}

export const NewChallengeFormStepButtons = ({
  isLoading,
  onPrevious
} : Props) => {
  return (
    <div className='flex flex-row justify-between'>
      <Button
        type="button"
        disabled={isLoading || !onPrevious}
        onClick={() => onPrevious?.()}
        className={cn(
          {
            'cursor-not-allowed opacity-60': isLoading || !onPrevious
          }
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        <span>Anterior</span>
      </Button>

      <Button
        type="submit"
        disabled={isLoading}
        className={cn(
          {
            'cursor-not-allowed opacity-60': isLoading
          }
        )}
      >
        <span>{ isLoading ? 'Cargando' : 'Siguiente' }</span>
        {isLoading ? <FaSpinner className="ml-2 h-4 w-4 animate-spin" /> : <ChevronRight className="ml-2 h-4 w-4" /> }

      </Button>
    </div>
  )
}
