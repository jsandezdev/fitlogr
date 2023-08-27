'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { NewWorkoutFormStepButtons } from './NewWorkoutFormStepButtons';

const newWorkoutStepCheatMealsFormSchema = z.object({
  monthlyCheatMeals: z.number(),
});

type NewWorkoutStepCheatMealsFormValues = z.infer<
  typeof newWorkoutStepCheatMealsFormSchema
>;

const defaultValues: Partial<NewWorkoutStepCheatMealsFormValues> = {
  monthlyCheatMeals: 4,
};

type Props = {
  onNext: (formData: NewWorkoutStepCheatMealsFormValues) => void;
  onPrevious: () => void;
};

export const NewWorkoutStepCheatMealsForm = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewWorkoutStepCheatMealsFormValues>({
    resolver: zodResolver(newWorkoutStepCheatMealsFormSchema),
    defaultValues,
  });

  async function onSubmit(formData: NewWorkoutStepCheatMealsFormValues) {
    setIsLoading(true);
    onNext(formData);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="monthlyCheatMeals"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <NewWorkoutFormStepButtons
          isLoading={isLoading}
          onPrevious={onPrevious}
        />
      </form>
    </Form>
  );
};
