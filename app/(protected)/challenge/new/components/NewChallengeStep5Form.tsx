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
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons';

const newChallengeStep5FormSchema = z.object({
  includeWeightGoal: z.boolean(),
  includeBodyPartGoals: z.boolean(),
});

type NewChallengeStep5FormValues = z.infer<typeof newChallengeStep5FormSchema>;

const defaultValues: Partial<NewChallengeStep5FormValues> = {
  includeWeightGoal: false,
  includeBodyPartGoals: false,
};

type Props = {
  onNext: (formData: NewChallengeStep5FormValues) => void;
  onPrevious: () => void;
};

export const NewChallengeStep5Form = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewChallengeStep5FormValues>({
    resolver: zodResolver(newChallengeStep5FormSchema),
    defaultValues,
  });

  async function onSubmit(formData: NewChallengeStep5FormValues) {
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
        <div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="includeWeightGoal"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Peso</FormLabel>
                    <FormDescription>
                      Aumentar o reducir tu peso corporal
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="includeBodyPartGoals"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Medidas corporales
                    </FormLabel>
                    <FormDescription>
                      Aumentar o reducir el volumen de algunas partes de tu
                      cuerpo
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <NewChallengeFormStepButtons
          isLoading={isLoading}
          onPrevious={onPrevious}
        />
      </form>
    </Form>
  );
};
