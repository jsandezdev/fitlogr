import { FaSpinner } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

type Props = {
  isLoading: boolean,
  onPrevious?: () => void
}

export const NewChallengeFormStepButtons = ({
  isLoading,
  onPrevious = () => {}
} : Props) => {
  return (
    <div className='flex flex-row justify-between'>
      <Button
        type="button"
        disabled={isLoading || !onPrevious}
        onClick={() => onPrevious?.()}
      >
        <span>Previous</span>
      </Button>

      <Button
        type="submit"
        disabled={isLoading}
      >
        {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> }
        <span>{ isLoading ? 'Loading' : 'Next' }</span>
      </Button>
    </div>
  )
}
