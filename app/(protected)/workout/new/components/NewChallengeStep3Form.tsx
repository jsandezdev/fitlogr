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
import { Switch } from '@/components/ui/switch';
import { UnitOfTime } from '@/lib/config';

import { NewWorkoutFormStepButtons } from './NewWorkoutFormStepButtons';

const newWorkoutStep3FormSchema = z.object({
  includeRevisionBodyPhotos: z.boolean(),
  includeRevisionBodyWeight: z.boolean(),
  includeRevisionBodyParts: z.boolean(),
});

type NewWorkoutStep3FormValues = z.infer<typeof newWorkoutStep3FormSchema>;

const defaultValues: Partial<NewWorkoutStep3FormValues> = {
  includeRevisionBodyWeight: false,
  includeRevisionBodyPhotos: false,
  includeRevisionBodyParts: false,
};

type Props = {
  onNext: (formData: NewWorkoutStep3FormValues) => void;
  onPrevious: () => void;
};

export const NewWorkoutStep3Form = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewWorkoutStep3FormValues>({
    resolver: zodResolver(newWorkoutStep3FormSchema),
    defaultValues,
  });

  async function onSubmit(formData: NewWorkoutStep3FormValues) {
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

        <NewWorkoutFormStepButtons
          isLoading={isLoading}
          onPrevious={onPrevious}
        />
      </form>
    </Form>
  );
};