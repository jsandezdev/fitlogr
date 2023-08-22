'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { BodyPart, goalFrequencies, goalTypes } from '@/lib/config';
import { translateBodyPart } from '@/lib/utils';
import { bodyPartGoalSchema } from '@/lib/validations/bodyPartGoal.schema';

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons';

const newChallengeStepBodyPartsFormSchema = z.object({
  bodyPartGoals: z.array(bodyPartGoalSchema),
});

type NewChallengeStepBodyPartsFormValues = z.infer<
  typeof newChallengeStepBodyPartsFormSchema
>;

const defaultValues: Partial<NewChallengeStepBodyPartsFormValues> = {
  bodyPartGoals: [
    {
      bodyPart: BodyPart.Bicep,
      amount: 0,
      type: undefined,
      frequency: undefined,
    },
    {
      bodyPart: BodyPart.Chest,
      amount: 0,
      type: undefined,
      frequency: undefined,
    },
    {
      bodyPart: BodyPart.Hips,
      amount: 0,
      type: undefined,
      frequency: undefined,
    },
    {
      bodyPart: BodyPart.Neck,
      amount: 0,
      type: undefined,
      frequency: undefined,
    },
    {
      bodyPart: BodyPart.Shoulders,
      amount: 0,
      type: undefined,
      frequency: undefined,
    },
    {
      bodyPart: BodyPart.Thigh,
      amount: 0,
      type: undefined,
      frequency: undefined,
    },
    {
      bodyPart: BodyPart.Waist,
      amount: 0,
      type: undefined,
      frequency: undefined,
    },
  ],
};

type Props = {
  onNext: (formData: NewChallengeStepBodyPartsFormValues) => void;
  onPrevious: () => void;
};

export const NewChallengeStepBodyPartsForm = ({
  onNext,
  onPrevious,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewChallengeStepBodyPartsFormValues>({
    resolver: zodResolver(newChallengeStepBodyPartsFormSchema),
    defaultValues,
  });

  const { fields: bodyPartGoalsFields } = useFieldArray({
    name: 'bodyPartGoals',
    control: form.control,
  });

  async function onSubmit(formData: NewChallengeStepBodyPartsFormValues) {
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

        <div className="space-y-4">
          {bodyPartGoalsFields.map((field, index) => (
            <div
              key={'bodyPartGoal_' + index}
              className="flex flex-col mb-6 rounded-lg border"
            >
              <p className="text-2xl font-bold p-4 border-b">
                {translateBodyPart(field.bodyPart)}
              </p>
              <div className="grid sm:grid-cols-3 gap-2 p-4">
                <FormField
                  control={form.control}
                  name={`bodyPartGoals.${index}.type`}
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
                              key={`bodyPartGoals.${index}_type_${type.id}`}
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
                  name={`bodyPartGoals.${index}.amount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad (cm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`bodyPartGoals.${index}.frequency`}
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
                              key={`bodyPartGoals.${index}_frequency_${frequency.id}`}
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
            </div>
          ))}
        </div>

        <NewChallengeFormStepButtons
          isLoading={isLoading}
          onPrevious={onPrevious}
        />
      </form>
    </Form>
  );
};
