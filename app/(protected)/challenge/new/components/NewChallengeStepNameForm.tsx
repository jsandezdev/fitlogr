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

const newChallengeStepNameFormSchema = z.object({
  name: z.string(),
});

type NewChallengeStepNameFormValues = z.infer<
  typeof newChallengeStepNameFormSchema
>;

const defaultValues: Partial<NewChallengeStepNameFormValues> = {
  name: '',
};

type Props = {
  onNext: (formData: NewChallengeStepNameFormValues) => void;
  onPrevious: () => void;
};

export const NewChallengeStepNameForm = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewChallengeStepNameFormValues>({
    resolver: zodResolver(newChallengeStepNameFormSchema),
    defaultValues,
  });

  async function onSubmit(formData: NewChallengeStepNameFormValues) {
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

        <NewChallengeFormStepButtons
          isLoading={isLoading}
          onPrevious={onPrevious}
        />
      </form>
    </Form>
  );
};
