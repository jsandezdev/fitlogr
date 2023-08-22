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
import { ChallengeDuration } from '@/lib/config';
import { challengeDurationSchema } from '@/lib/validations/challengeDuration.schema';

import { useNewChallengeFormState } from '../hooks/useNewChallengeFormState';
import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons';

const challengeDurations = [
  {
    id: ChallengeDuration['1m'],
    title: '1 mes',
  },
  {
    id: ChallengeDuration['2m'],
    title: '2 meses',
  },
  {
    id: ChallengeDuration['3m'],
    title: '3 meses',
  },
  {
    id: ChallengeDuration['4m'],
    title: '4 meses',
  },
  {
    id: ChallengeDuration['6m'],
    title: '6 meses',
  },
  {
    id: ChallengeDuration['1y'],
    title: '1 año',
  },
];

const newChallengeStep1FormSchema = z.object({
  durationId: challengeDurationSchema,
});

type NewChallengeStep1FormValues = z.infer<typeof newChallengeStep1FormSchema>;

type Props = {
  onNext: (formData: NewChallengeStep1FormValues) => void;
};

export const NewChallengeStep1Form = ({ onNext }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newChallengeData, setNewChallengeData] = useNewChallengeFormState();

  const defaultValues = {};

  if (newChallengeData.durationId)
    defaultValues.durationId = newChallengeData.durationId;

  const form = useForm<NewChallengeStep1FormValues>({
    resolver: zodResolver(newChallengeStep1FormSchema),
    defaultValues,
  });

  async function onSubmit(formData: NewChallengeStep1FormValues) {
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
                  {challengeDurations.map((d) => (
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

        <NewChallengeFormStepButtons isLoading={isLoading} />
      </form>
    </Form>
  );
};
