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

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons';

const newChallengeStepCheatMealsFormSchema = z.object({
  monthlyCheatMeals: z.number(),
});

type NewChallengeStepCheatMealsFormValues = z.infer<
  typeof newChallengeStepCheatMealsFormSchema
>;

const defaultValues: Partial<NewChallengeStepCheatMealsFormValues> = {
  monthlyCheatMeals: 4,
};

type Props = {
  onNext: (formData: NewChallengeStepCheatMealsFormValues) => void;
  onPrevious: () => void;
};

export const NewChallengeStepCheatMealsForm = ({
  onNext,
  onPrevious,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewChallengeStepCheatMealsFormValues>({
    resolver: zodResolver(newChallengeStepCheatMealsFormSchema),
    defaultValues,
  });

  async function onSubmit(formData: NewChallengeStepCheatMealsFormValues) {
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

        <NewChallengeFormStepButtons
          isLoading={isLoading}
          onPrevious={onPrevious}
        />
      </form>
    </Form>
  );
};
