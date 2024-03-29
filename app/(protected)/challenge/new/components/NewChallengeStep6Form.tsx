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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons';

const newChallengeStep6FormSchema = z.object({
  includeDietLog: z.string(),
});

type NewChallengeStep6FormValues = z.infer<typeof newChallengeStep6FormSchema>;

const defaultValues: Partial<NewChallengeStep6FormValues> = {};

type Props = {
  onNext: (formData: NewChallengeStep6FormValues) => void;
  onPrevious: () => void;
};

export const NewChallengeStep6Form = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewChallengeStep6FormValues>({
    resolver: zodResolver(newChallengeStep6FormSchema),
    defaultValues,
  });

  async function onSubmit(formData: NewChallengeStep6FormValues) {
    setIsLoading(true);
    onNext(formData);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="includeDietLog"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                {/* <FormControl onChange={() => form.handleSubmit(onSubmit)()}> */}
                <RadioGroup
                  onValueChange={(e) => {
                    field.onChange(e);
                    form.handleSubmit(onSubmit)();
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Si</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
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
