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

const newWorkoutStepNameFormSchema = z.object({
  name: z.string(),
});

type NewWorkoutStepNameFormValues = z.infer<
  typeof newWorkoutStepNameFormSchema
>;

const defaultValues: Partial<NewWorkoutStepNameFormValues> = {
  name: '',
};

type Props = {
  onNext: (formData: NewWorkoutStepNameFormValues) => void;
  onPrevious: () => void;
};

export const NewWorkoutStepNameForm = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewWorkoutStepNameFormValues>({
    resolver: zodResolver(newWorkoutStepNameFormSchema),
    defaultValues,
  });

  async function onSubmit(formData: NewWorkoutStepNameFormValues) {
    setIsLoading(true);
    onNext(formData);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
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
