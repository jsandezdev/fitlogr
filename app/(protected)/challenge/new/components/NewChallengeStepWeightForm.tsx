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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { goalFrequencies, goalTypes } from '@/lib/config';
import { weightGoalSchema } from '@/lib/validations/weightGoal.schema';

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons';

const newChallengeStepWeightFormSchema = z.object({
  weightGoal: weightGoalSchema,
});

type NewChallengeStepWeightFormValues = z.infer<
  typeof newChallengeStepWeightFormSchema
>;

const defaultValues: Partial<NewChallengeStepWeightFormValues> = {
  weightGoal: {
    type: undefined,
    amount: 0,
    frequency: undefined,
  },
};

type Props = {
  onNext: (formData: NewChallengeStepWeightFormValues) => void;
  onPrevious: () => void;
};

export const NewChallengeStepWeightForm = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewChallengeStepWeightFormValues>({
    resolver: zodResolver(newChallengeStepWeightFormSchema),
    defaultValues,
  });

  async function onSubmit(formData: NewChallengeStepWeightFormValues) {
    setIsLoading(true);
    onNext(formData);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* <div>
          <p>Form values:</p>
          <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
        </div>

        <div>
          <p>Form Errors:</p>
          <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
        </div> */}

        <div className="grid sm:grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="weightGoal.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quiero</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona uno..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {goalTypes.map((type, index) => (
                      <SelectItem
                        key={`weightGoal_type_${type.id}`}
                        value={type.id}
                      >
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weightGoal.amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad (kg)</FormLabel>
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
          <FormField
            control={form.control}
            name="weightGoal.frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Con qué frecuencia?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona uno..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {goalFrequencies.map((frequency, index) => (
                      <SelectItem
                        key={`weightGoal_frequency_${frequency.id}`}
                        value={frequency.id}
                      >
                        {frequency.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <NewChallengeFormStepButtons
          isLoading={isLoading}
          onPrevious={onPrevious}
        />
      </form>
    </Form>
  );
};
