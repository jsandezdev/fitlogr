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

const newChallengeStep3FormSchema = z.object({
  includeRevisionBodyPhotos: z.boolean(),
  includeRevisionBodyWeight: z.boolean(),
  includeRevisionBodyParts: z.boolean(),
});

type NewChallengeStep3FormValues = z.infer<typeof newChallengeStep3FormSchema>;

const defaultValues: Partial<NewChallengeStep3FormValues> = {
  includeRevisionBodyWeight: false,
  includeRevisionBodyPhotos: false,
  includeRevisionBodyParts: false,
};

type Props = {
  onNext: (formData: NewChallengeStep3FormValues) => void;
  onPrevious: () => void;
};

export const NewChallengeStep3Form = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewChallengeStep3FormValues>({
    resolver: zodResolver(newChallengeStep3FormSchema),
    defaultValues,
  });

  async function onSubmit(formData: NewChallengeStep3FormValues) {
    setIsLoading(true);
    onNext(formData);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="includeRevisionBodyWeight"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Peso</FormLabel>
                    <FormDescription>
                      Controla la evolución de tu peso corporal
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
              name="includeRevisionBodyPhotos"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Fotos</FormLabel>
                    <FormDescription>
                      Con sólo tres fotos en cada revisión (
                      <strong>frontal</strong>, <strong>lateral</strong> y{' '}
                      <strong>de espaldas</strong>) podrás medir tu progreso a
                      lo largo del tiempo de manera visual
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
              name="includeRevisionBodyParts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Medidas</FormLabel>
                    <FormDescription>
                      Registra varias medidas corporales (bíceps, cintura,
                      glúteo, entre otros) para un control exhaustivo de tu
                      progreso durante el reto
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
