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
import { revisionFrequencies } from '@/lib/config';

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons';

const newChallengeStep2FormSchema = z.object({
  revisionFrequencyId: z.string(),
});

type NewChallengeStep2FormValues = z.infer<typeof newChallengeStep2FormSchema>;

const defaultValues: Partial<NewChallengeStep2FormValues> = {};

type Props = {
  onNext: (formData: NewChallengeStep2FormValues) => void;
  onPrevious: () => void;
};

export const NewChallengeStep2Form = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewChallengeStep2FormValues>({
    resolver: zodResolver(newChallengeStep2FormSchema),
    defaultValues,
  });

  async function onSubmit(formData: NewChallengeStep2FormValues) {
    setIsLoading(true);
    onNext(formData);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="revisionFrequencyId"
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
                  {revisionFrequencies.map((d) => (
                    <SelectItem key={`revision_frequency_${d.id}`} value={d.id}>
                      {d.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
