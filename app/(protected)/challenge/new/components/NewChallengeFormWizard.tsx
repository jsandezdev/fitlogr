'use client'

import { useState } from 'react'

import { Progress } from '@/components/ui/progress'
import { toast } from '@/components/ui/use-toast'

import { useNewChallengeFormState } from '../hooks/useNewChallengeFormState'
import { NewChallengeStep1Form } from './NewChallengeStep1Form'
import { NewChallengeStep2Form } from './NewChallengeStep2Form'
import { NewChallengeStep3Form } from './NewChallengeStep3Form'
import { NewChallengeStep4Form } from './NewChallengeStep4Form'
import { NewChallengeStep5Form } from './NewChallengeStep5Form'
import { NewChallengeStep6Form } from './NewChallengeStep6Form'
import { NewChallengeStep7Form } from './NewChallengeStep7Form'

type Step = {
  number: number,
  name: string
}

export const NewChallengeFormWizard = () => {
  const steps : Step[] = [
    { number: 1, name: '¿Cuánto quieres que dure el reto?' },
    { number: 2, name: '¿Cada cuánto tiempo quieres hacer las revisiones?' },
    { number: 3, name: '¿Qué datos quieres registrar?' },
    { number: 4, name: '¿Qué días entrenas a la semana?' },
    { number: 5, name: '¿Cuáles son tus objetivos?' },
    { number: 6, name: '¿Quieres controlar también la dieta?' },
    { number: 7, name: 'Por último, ¿qué nombre quieres ponerle al reto?' }
  ]

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState(steps[0])
  const [formData, setFormData] = useNewChallengeFormState()

  const goNextStep = (stepFormData: any) => {
    const newFormData = { ...formData, ...stepFormData }
    setFormData(newFormData)

    if (currentStep.number < steps.length) {
      const newStep: Step | undefined = steps.find((step) => step.number === currentStep.number + 1)
      if (newStep) setCurrentStep(newStep)
    } else {
      saveChallenge(newFormData)
    }
  }

  const goPreviousStep = () => {
    if (currentStep.number > 1) {
      const newStep: Step | undefined = steps.find((step) => step.number === currentStep.number - 1)
      if (newStep) setCurrentStep(newStep)
    }
  }

  const saveChallenge = async (challenge: any) => {
    if (isLoading) return null

    setIsLoading(true)

    const response = await fetch('/api/challenge/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(challenge)
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: 'Algo ha ido mal.',
        description: 'Tu reto no ha sido creado. Por favor, inténtalo de nuevo.',
        variant: 'destructive'
      })
    }

    toast({
      description: 'El reto ha sido creado.'
    })
  }

  return (
    <>
      <Progress
        value={currentStep.number / steps.length * 100}
        className='mb-6'
      />
      <p className='text-2xl mb-6'>{ currentStep.name }</p>
      <section className={ currentStep.number === 1 ? '' : 'hidden'}>
        <NewChallengeStep1Form onNext={goNextStep}/>
      </section>
      <section className={ currentStep.number === 2 ? '' : 'hidden'}>
        <NewChallengeStep2Form onNext={goNextStep} onPrevious={goPreviousStep}/>
      </section>
      <section className={ currentStep.number === 3 ? '' : 'hidden'}>
        <NewChallengeStep3Form onNext={goNextStep} onPrevious={goPreviousStep}/>
      </section>
      <section className={ currentStep.number === 4 ? '' : 'hidden'}>
        <NewChallengeStep4Form onNext={goNextStep} onPrevious={goPreviousStep}/>
      </section>
      <section className={ currentStep.number === 5 ? '' : 'hidden'}>
        <NewChallengeStep5Form onNext={goNextStep} onPrevious={goPreviousStep}/>
      </section>
      <section className={ currentStep.number === 6 ? '' : 'hidden'}>
        <NewChallengeStep6Form onNext={goNextStep} onPrevious={goPreviousStep}/>
      </section>
      <section className={ currentStep.number === 7 ? '' : 'hidden'}>
        <NewChallengeStep7Form onNext={goNextStep} onPrevious={goPreviousStep}/>
      </section>

      {/* <div>
        <p>Form data:</p>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div> */}
    </>
  )
}
