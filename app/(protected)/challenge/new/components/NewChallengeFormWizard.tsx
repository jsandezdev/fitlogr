'use client'

import { useState } from 'react'

import { Progress } from '@/components/ui/progress'
import { toast } from '@/components/ui/use-toast'

import { NewChallengeStep1Form } from './NewChallengeStep1Form'
import { NewChallengeStep2Form } from './NewChallengeStep2Form'

type Step = {
  number: number,
  name: string
}

export const NewChallengeFormWizard = () => {
  const steps : Step[] = [
    { number: 1, name: 'Duration' },
    { number: 2, name: 'Revisions' }
    // { number: 3, name: 'Training' }
  ]

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState(steps[0])
  const [formData, setFormData] = useState({})

  const goNextStep = (stepFormData: any) => {
    setFormData((prev) => ({ ...prev, stepFormData }))

    if (currentStep.number < steps.length) {
      const newStep: Step | undefined = steps.find((step) => step.number === currentStep.number + 1)
      if (newStep) setCurrentStep(newStep)
    } else {
      saveChallenge()
    }
  }

  const goPreviousStep = () => {
    if (currentStep.number > 1) {
      const newStep: Step | undefined = steps.find((step) => step.number === currentStep.number - 1)
      if (newStep) setCurrentStep(newStep)
    }
  }

  const saveChallenge = async () => {
    if (isLoading) return null

    setIsLoading(true)

    const response = await fetch('/api/challenge/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your challenge was not created. Please try again.',
        variant: 'destructive'
      })
    }

    toast({
      description: 'Your challenge has been created.'
    })
  }

  return (
    <>
      <Progress
        value={currentStep.number / steps.length * 100}
      />
      <p className='text-2xl'>{ currentStep.name }</p>
      { currentStep.number === 1 && (
        <NewChallengeStep1Form onNext={goNextStep}/>
      ) }
      { currentStep.number === 2 && (
        <NewChallengeStep2Form onNext={goNextStep} onPrevious={goPreviousStep}/>
      ) }
    </>
  )
}
