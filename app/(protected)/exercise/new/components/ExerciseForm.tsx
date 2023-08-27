'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Exercise } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSave, FaSpinner } from 'react-icons/fa';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { MuscularGroup, muscularGroups } from '@/lib/config';
import { cn } from '@/lib/utils';
import { muscularGroupSchema } from '@/lib/validations/muscularGroup.schema';

const exerciseFormSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  video: z.string().url().optional().or(z.literal('')),
  muscularGroups: z
    .array(muscularGroupSchema)
    .refine((value) => value.some((item) => item), {
      message: 'Tienes que seleccionar almenos uno.',
    }),
});

type exerciseFormValues = z.infer<typeof exerciseFormSchema>;

let defaultValues: Partial<exerciseFormValues> = {
  name: '',
  description: '',
  video: '',
  muscularGroups: [],
};

type Props = {
  exercise?: Exercise | null;
};

export const ExerciseForm = ({ exercise = null }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  if (exercise) {
    defaultValues = {
      name: exercise.name,
      description: exercise.description || '',
      video: exercise.video || '',
      muscularGroups: exercise.muscularGroups.map((muscularGroup) => {
        return muscularGroup as MuscularGroup;
      }),
    };
  }

  const form = useForm<exerciseFormValues>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues,
  });

  async function onSubmit(formData: exerciseFormValues) {
    setIsLoading(true);
    saveExercise(formData);
    setIsLoading(false);
  }

  const saveExercise = async (formData: any) => {
    if (isLoading) return null;

    setIsLoading(true);

    const data = { ...formData };
    const exerciseId = exercise ? exercise.id : '';

    try {
      const response = await fetch(`/api/exercise/${exerciseId}`, {
        method: exercise ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const createdExercise = await response.json();

      if (!response?.ok) throw new Error('Response is not ok');

      toast({
        title: 'El ejercicio ha sido guardado.',
      });

      router.push(`/exercise/${createdExercise?.id}`);
    } catch (error) {
      console.log(
        '🚀 ~ file: ExerciseForm.tsx:106 ~ saveExercise ~ error:',
        error,
      );
      return toast({
        title: 'Algo ha ido mal.',
        description:
          'El ejercicio no ha sido guardado. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="muscularGroups"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">Grupos musculares</FormLabel>
              {muscularGroups.map((item) => (
                <FormField
                  key={`muscularGroups_${item.id}`}
                  control={form.control}
                  name="muscularGroups"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={`muscularGroup_${item.id}`}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.title}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row">
          <Button
            type="submit"
            disabled={isLoading}
            className={cn({
              'ml-auto w-full sm:w-auto': true,
              'cursor-not-allowed opacity-60': isLoading,
            })}
          >
            <span>{isLoading ? 'Cargando' : 'Guardar'}</span>
            {isLoading ? (
              <FaSpinner className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <FaSave className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
