'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { RevisionFrequency, UnitOfTime, WorkoutDuration } from '@/lib/config';

import { useNewWorkoutFormState } from '../hooks/useNewWorkoutFormState';
import { NewWorkoutStep1Form } from './NewWorkoutStep1Form';
import { NewWorkoutStep2Form } from './NewWorkoutStep2Form';
import { NewWorkoutStep3Form } from './NewWorkoutStep3Form';
import { NewWorkoutStep4Form } from './NewWorkoutStep4Form';
import { NewWorkoutStep5Form } from './NewWorkoutStep5Form';
import { NewWorkoutStep6Form } from './NewWorkoutStep6Form';
import { NewWorkoutStepBodyPartsForm } from './NewWorkoutStepBodyPartsForm';
import { NewWorkoutStepCheatMealsForm } from './NewWorkoutStepCheatMealsForm';
import { NewWorkoutStepNameForm } from './NewWorkoutStepNameForm';
import { NewWorkoutStepWeightForm } from './NewWorkoutStepWeightForm';

type Step = {
  number: number;
  name: string;
};

export const NewWorkoutFormWizard = () => {
  const router = useRouter();

  const steps: Step[] = [
    { number: 1, name: '¿Cuánto quieres que dure el reto?' },
    { number: 2, name: '¿Cada cuánto tiempo quieres hacer las revisiones?' },
    { number: 3, name: '¿Qué datos quieres registrar?' },
    { number: 4, name: '¿Qué días entrenas a la semana?' },
    { number: 5, name: '¿Cuáles son tus objetivos?' },
    { number: 6, name: '¿Cuál es tu objetivo en cuanto al peso?' },
    { number: 7, name: '¿Cuáles son tus objetivos en las medidas corporales?' },
    { number: 8, name: '¿Quieres controlar también si cumples con la dieta?' },
    { number: 9, name: '¿Cuántos cheat meals al mes quieres hacer?' },
    { number: 10, name: 'Por último, ¿qué nombre quieres ponerle al reto?' },
  ];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [formData, setFormData] = useNewWorkoutFormState();

  const goNextStep = (stepFormData: any) => {
    const newFormData = { ...formData, ...stepFormData };
    setFormData(newFormData);

    if (currentStep.number < steps.length) {
      let newStepNumber = currentStep.number + 1;

      if (newStepNumber === 6 && !newFormData.includeWeightGoal)
        newStepNumber++;
      if (newStepNumber === 7 && !newFormData.includeBodyPartGoals)
        newStepNumber++;
      if (newStepNumber === 9 && newFormData.includeDietLog === 'no')
        newStepNumber++;

      setCurrentStepNumber(newStepNumber);
    } else {
      saveWorkout(newFormData);
    }
  };

  const goPreviousStep = () => {
    if (currentStep.number > 1) {
      let newStepNumber = currentStep.number - 1;

      if (newStepNumber === 9 && formData.includeDietLog === 'no')
        newStepNumber--;
      if (newStepNumber === 7 && !formData.includeBodyPartGoals)
        newStepNumber--;
      if (newStepNumber === 6 && !formData.includeWeightGoal) newStepNumber--;
      setCurrentStepNumber(newStepNumber);
    }
  };

  const setCurrentStepNumber = (newStepNumber: number) => {
    const newStep: Step | undefined = steps.find(
      (step) => step.number === newStepNumber,
    );
    if (newStep) setCurrentStep(newStep);
  };

  const saveWorkout = async (workout: any) => {
    if (isLoading) return null;

    setIsLoading(true);

    const {
      number: revisionFrequencyNumber,
      unitOfTime: revisionFrequencyUnitOfTime,
    } = getRevisionFrequencyByRevisionFrequencyId(
      workout.revisionFrequencyId,
    );

    const data = {
      name: workout.name,
      startDate: new Date(),
      endDate: getEndDateByDurationId(workout.durationId),
      revisionFrequencyNumber,
      revisionFrequencyUnitOfTime,
      includeRevisionBodyPhotos: workout.includeRevisionBodyPhotos,
      includeRevisionBodyWeight: workout.includeRevisionBodyWeight,
      includeRevisionBodyParts: workout.includeRevisionBodyParts,
      includeDietLog: workout.includeDietLog === 'yes',
      monthlyCheatMeals:
        workout.includeDietLog === 'yes' ? workout.monthlyCheatMeals : null,
      includeWeightGoal: workout.includeWeightGoal,
      includeBodyPartGoals: workout.includeBodyPartGoals,
      weightGoal: workout.includeWeightGoal ? workout.weightGoal : null,
      bodyPartGoals: workout.includeBodyPartGoals
        ? workout.bodyPartGoals
        : [],
      weeklyTrainingDays: workout.weeklyTrainingDays,
    };

    const response = await fetch('/api/workout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const createdWorkout = await response.json();

    setIsLoading(false);

    if (!response?.ok) {
      return toast({
        title: 'Algo ha ido mal.',
        description:
          'Tu reto no ha sido creado. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    }

    toast({
      title: 'El reto ha sido creado.',
    });

    router.push(`/workout/${createdWorkout?.id}`);
  };

  const getRevisionFrequencyByRevisionFrequencyId = (
    revisionFrequencyId: RevisionFrequency,
  ) => {
    let number = 0;
    let unitOfTime = null;

    switch (revisionFrequencyId) {
      case RevisionFrequency['1w']:
        number = 1;
        unitOfTime = UnitOfTime.Week;
        break;

      case RevisionFrequency['2w']:
        number = 2;
        unitOfTime = UnitOfTime.Week;
        break;

      case RevisionFrequency['1m']:
        number = 1;
        unitOfTime = UnitOfTime.Month;
        break;
    }

    return { number, unitOfTime };
  };

  const getEndDateByDurationId = (durationId: WorkoutDuration) => {
    const endDate = new Date();

    switch (durationId) {
      case WorkoutDuration['1m']:
        endDate.setMonth(endDate.getMonth() + 1);
        break;

      case WorkoutDuration['2m']:
        endDate.setMonth(endDate.getMonth() + 2);
        break;

      case WorkoutDuration['3m']:
        endDate.setMonth(endDate.getMonth() + 3);
        break;

      case WorkoutDuration['4m']:
        endDate.setMonth(endDate.getMonth() + 4);
        break;

      case WorkoutDuration['6m']:
        endDate.setMonth(endDate.getMonth() + 6);
        break;

      case WorkoutDuration['1y']:
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
    }

    return endDate;
  };

  return (
    <div className="mb-4">
      <Progress
        value={(currentStep.number / steps.length) * 100}
        className="mb-6"
      />
      <p className="text-2xl mb-6">{currentStep.name}</p>
      <section className={currentStep.number === 1 ? '' : 'hidden'}>
        <NewWorkoutStep1Form onNext={goNextStep} />
      </section>
      <section className={currentStep.number === 2 ? '' : 'hidden'}>
        <NewWorkoutStep2Form onNext={goNextStep} onPrevious={goPreviousStep} />
      </section>
      <section className={currentStep.number === 3 ? '' : 'hidden'}>
        <NewWorkoutStep3Form onNext={goNextStep} onPrevious={goPreviousStep} />
      </section>
      <section className={currentStep.number === 4 ? '' : 'hidden'}>
        <NewWorkoutStep4Form onNext={goNextStep} onPrevious={goPreviousStep} />
      </section>
      <section className={currentStep.number === 5 ? '' : 'hidden'}>
        <NewWorkoutStep5Form onNext={goNextStep} onPrevious={goPreviousStep} />
      </section>
      <section className={currentStep.number === 6 ? '' : 'hidden'}>
        <NewWorkoutStepWeightForm
          onNext={goNextStep}
          onPrevious={goPreviousStep}
        />
      </section>
      <section className={currentStep.number === 7 ? '' : 'hidden'}>
        <NewWorkoutStepBodyPartsForm
          onNext={goNextStep}
          onPrevious={goPreviousStep}
        />
      </section>
      <section className={currentStep.number === 8 ? '' : 'hidden'}>
        <NewWorkoutStep6Form onNext={goNextStep} onPrevious={goPreviousStep} />
      </section>
      <section className={currentStep.number === 9 ? '' : 'hidden'}>
        <NewWorkoutStepCheatMealsForm
          onNext={goNextStep}
          onPrevious={goPreviousStep}
        />
      </section>
      <section className={currentStep.number === 10 ? '' : 'hidden'}>
        <NewWorkoutStepNameForm
          onNext={goNextStep}
          onPrevious={goPreviousStep}
        />
      </section>

      {/* <div>
        <p>Form data:</p>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div> */}
    </div>
  );
};
