'use client'

import { useState } from 'react'

import { Progress } from '@/components/ui/progress'
import { toast } from '@/components/ui/use-toast'
import { ChallengeDuration, RevisionFrequency, UnitOfTime } from '@/lib/config'

import { useNewChallengeFormState } from '../hooks/useNewChallengeFormState'
import { NewChallengeStep1Form } from './NewChallengeStep1Form'
import { NewChallengeStep2Form } from './NewChallengeStep2Form'
import { NewChallengeStep3Form } from './NewChallengeStep3Form'
import { NewChallengeStep4Form } from './NewChallengeStep4Form'
import { NewChallengeStep5Form } from './NewChallengeStep5Form'
import { NewChallengeStep6Form } from './NewChallengeStep6Form'
import { NewChallengeStepBodyPartsForm } from './NewChallengeStepBodyPartsForm'
import { NewChallengeStepCheatMealsForm } from './NewChallengeStepCheatMealsForm'
import { NewChallengeStepNameForm } from './NewChallengeStepNameForm'
import { NewChallengeStepWeightForm } from './NewChallengeStepWeightForm'

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
    { number: 6, name: '¿Cuál es tu objetivo en cuanto al peso?' },
    { number: 7, name: '¿Cuáles son tus objetivos en las medidas corporales?' },
    { number: 8, name: '¿Quieres controlar también si cumples con la dieta?' },
    { number: 9, name: '¿Cuántos cheat meals al mes quieres hacer?' },
    { number: 10, name: 'Por último, ¿qué nombre quieres ponerle al reto?' }
  ]

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState(steps[0])
  const [formData, setFormData] = useNewChallengeFormState()

  const goNextStep = (stepFormData: any) => {
    const newFormData = { ...formData, ...stepFormData }
    setFormData(newFormData)

    if (currentStep.number < steps.length) {
      let newStepNumber = currentStep.number + 1

      if (newStepNumber === 6 && !newFormData.includeWeightGoal) newStepNumber++
      if (newStepNumber === 7 && !newFormData.includeBodyPartGoals) newStepNumber++
      if (newStepNumber === 9 && newFormData.includeDietLog === 'no') newStepNumber++

      setCurrentStepNumber(newStepNumber)
    } else {
      saveChallenge(newFormData)
    }
  }

  const goPreviousStep = () => {
    if (currentStep.number > 1) {
      let newStepNumber = currentStep.number - 1

      if (newStepNumber === 9 && formData.includeDietLog === 'no') newStepNumber--
      if (newStepNumber === 7 && !formData.includeBodyPartGoals) newStepNumber--
      if (newStepNumber === 6 && !formData.includeWeightGoal) newStepNumber--
      setCurrentStepNumber(newStepNumber)
    }
  }

  const setCurrentStepNumber = (newStepNumber: number) => {
    const newStep: Step | undefined = steps.find((step) => step.number === newStepNumber)
    if (newStep) setCurrentStep(newStep)
  }

  const saveChallenge = async (challenge: any) => {
    if (isLoading) return null

    setIsLoading(true)

    console.log('challenge: ', challenge)

    const {
      number: revisionFrequencyNumber,
      unitOfTime: revisionFrequencyUnitOfTime
    } = getRevisionFrequencyByRevisionFrequencyId(challenge.revisionFrequencyId)

    const data = {
      name: challenge.name,
      startDate: new Date(),
      endDate: getEndDateByDurationId(challenge.durationId),
      revisionFrequencyNumber,
      revisionFrequencyUnitOfTime,
      includeRevisionBodyPhotos: challenge.includeRevisionBodyPhotos,
      includeRevisionBodyWeight: challenge.includeRevisionBodyWeight,
      includeRevisionBodyParts: challenge.includeRevisionBodyParts,
      includeDietLog: challenge.includeDietLog === 'yes',
      monthlyCheatMeals: challenge.includeDietLog === 'yes' ? challenge.monthlyCheatMeals : null,
      includeWeightGoal: challenge.includeWeightGoal,
      includeBodyPartGoals: challenge.includeBodyPartGoals,
      weightGoal: challenge.includeWeightGoal ? challenge.weightGoal : null,
      bodyPartGoals: challenge.includeBodyPartGoals ? challenge.bodyPartGoals : [],
      weeklyTrainingDays: challenge.weeklyTrainingDays
    }

    console.log('data: ', data)

    const response = await fetch('/api/challenge/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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

  const getRevisionFrequencyByRevisionFrequencyId = (revisionFrequencyId: RevisionFrequency) => {
    let number = 0
    let unitOfTime = null

    switch (revisionFrequencyId) {
    case RevisionFrequency['1w']:
      number = 1
      unitOfTime = UnitOfTime.Week
      break

    case RevisionFrequency['2w']:
      number = 2
      unitOfTime = UnitOfTime.Week
      break

    case RevisionFrequency['1m']:
      number = 1
      unitOfTime = UnitOfTime.Month
      break
    }

    return { number, unitOfTime }
  }

  const getEndDateByDurationId = (durationId: ChallengeDuration) => {
    const endDate = new Date()

    switch (durationId) {
    case ChallengeDuration['1m']:
      endDate.setMonth(endDate.getMonth() + 1)
      break

    case ChallengeDuration['2m']:
      endDate.setMonth(endDate.getMonth() + 2)
      break

    case ChallengeDuration['3m']:
      endDate.setMonth(endDate.getMonth() + 3)
      break

    case ChallengeDuration['4m']:
      endDate.setMonth(endDate.getMonth() + 4)
      break

    case ChallengeDuration['6m']:
      endDate.setMonth(endDate.getMonth() + 6)
      break

    case ChallengeDuration['1y']:
      endDate.setFullYear(endDate.getFullYear() + 1)
      break
    }

    return endDate
  }

  return (
    <div className='mb-4'>
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
        <NewChallengeStepWeightForm onNext={goNextStep} onPrevious={goPreviousStep}/>
      </section>
      <section className={ currentStep.number === 7 ? '' : 'hidden'}>
        <NewChallengeStepBodyPartsForm onNext={goNextStep} onPrevious={goPreviousStep}/>
      </section>
      <section className={ currentStep.number === 8 ? '' : 'hidden'}>
        <NewChallengeStep6Form onNext={goNextStep} onPrevious={goPreviousStep}/>
      </section>
      <section className={ currentStep.number === 9 ? '' : 'hidden'}>
        <NewChallengeStepCheatMealsForm onNext={goNextStep} onPrevious={goPreviousStep}/>
      </section>
      <section className={ currentStep.number === 10 ? '' : 'hidden'}>
        <NewChallengeStepNameForm onNext={goNextStep} onPrevious={goPreviousStep}/>
      </section>

      {/* <div>
        <p>Form data:</p>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div> */}
    </div>
  )
}
