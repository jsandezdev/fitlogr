'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WorkoutDuration } from '@/lib/config';
import { workoutDurationSchema } from '@/lib/validations/workoutDuration.schema';

import { useNewWorkoutFormState } from '../hooks/useNewWorkoutFormState';
import { NewWorkoutFormStepButtons } from './NewWorkoutFormStepButtons';

const workoutDurations = [
  {
    id: WorkoutDuration['1m'],
    title: '1 mes',
  },
  {
    id: WorkoutDuration['2m'],
    title: '2 meses',
  },
  {
    id: WorkoutDuration['3m'],
    title: '3 meses',
  },
  {
    id: WorkoutDuration['4m'],
    title: '4 meses',
  },
  {
    id: WorkoutDuration['6m'],
    title: '6 meses',
  },
  {
    id: WorkoutDuration['1y'],
    title: '1 año',
  },
];

const newWorkoutStep1FormSchema = z.object({
  durationId: workoutDurationSchema,
});

type NewWorkoutStep1FormValues = z.infer<typeof newWorkoutStep1FormSchema>;

type Props = {
  onNext: (formData: NewWorkoutStep1FormValues) => void;
};

export const NewWorkoutStep1Form = ({ onNext }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newWorkoutData, setNewWorkoutData] = useNewWorkoutFormState();

  const defaultValues = {};

  if (newWorkoutData.durationId)
    defaultValues.durationId = newWorkoutData.durationId;

  const form = useForm<NewWorkoutStep1FormValues>({
    resolver: zodResolver(newWorkoutStep1FormSchema),
    defaultValues,
  });

  async function onSubmit(formData: NewWorkoutStep1FormValues) {
    setIsLoading(true);
    onNext(formData);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <div>
          <p>Form values:</p>
          <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
        </div>

        <div>
          <p>Form Errors:</p>
          <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
        </div> */}

        <FormField
          control={form.control}
          name="durationId"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.handleSubmit(onSubmit)();
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona uno..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {workoutDurations.map((d) => (
                    <SelectItem key={`duration_${d.id}`} value={d.id}>
                      {d.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <NewWorkoutFormStepButtons isLoading={isLoading} />
      </form>
    </Form>
  );
};
