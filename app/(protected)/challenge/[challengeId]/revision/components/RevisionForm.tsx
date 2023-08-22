'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Challenge, Revision } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon, SaveIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { UpdatedFields } from '@/components/UpdatedFields';
import { BodyPart } from '@/lib/config';
// import { BodyPart, weekDays } from '@/lib/config'
import { cn, translateBodyPart } from '@/lib/utils';
import { bodyPartMeasurementSchema } from '@/lib/validations/bodyPartMeasurement.schema';

// import { weekDaySchema } from '@/lib/validations/weekDay.schema'
import { CopyDataFromLastRevisionButton } from './CopyDataFromLastRevisionButton';
import { RevisionPhotos } from './RevisionPhotos';

const revisionFormSchema = z.object({
  date: z.coerce.date(),
  // weeklyTrainingDays: z.array(weekDaySchema),
  frontPhoto: z.string().optional().nullable(),
  sidePhoto: z.string().optional().nullable(),
  backPhoto: z.string().optional().nullable(),
  bodyWeight: z.number().optional().nullable(),
  bodyPartMeasurements: z.array(bodyPartMeasurementSchema),
});

type RevisionFormValues = z.infer<typeof revisionFormSchema>;

const defaultValues: Partial<RevisionFormValues> = {
  date: new Date(),
  // weeklyTrainingDays: [],
  frontPhoto: null,
  sidePhoto: null,
  backPhoto: null,
  bodyWeight: 0,
  bodyPartMeasurements: [
    {
      bodyPart: BodyPart.Bicep,
      amount: 0,
    },
    {
      bodyPart: BodyPart.Chest,
      amount: 0,
    },
    {
      bodyPart: BodyPart.Hips,
      amount: 0,
    },
    {
      bodyPart: BodyPart.Neck,
      amount: 0,
    },
    {
      bodyPart: BodyPart.Shoulders,
      amount: 0,
    },
    {
      bodyPart: BodyPart.Thigh,
      amount: 0,
    },
    {
      bodyPart: BodyPart.Waist,
      amount: 0,
    },
  ],
};

interface Props {
  challenge: Challenge;
  revision?: Revision;
}

export const RevisionForm = ({ challenge, revision }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopyingDataFromLastRevision, setIsCopyingDataFromLastRevision] =
    useState<boolean>(false);

  const router = useRouter();

  const form = useForm<RevisionFormValues>({
    resolver: zodResolver(revisionFormSchema),
    defaultValues: revision || defaultValues,
  });

  const { fields: bodyPartMeasurementFields } = useFieldArray({
    name: 'bodyPartMeasurements',
    control: form.control,
  });

  const onSubmit = async (formData: RevisionFormValues) => {
    setIsLoading(true);

    const response = await fetch(
      `/api/challenge/${challenge.id}/revision` +
        (!revision ? '' : `/${revision.id}`),
      {
        method: !revision ? 'POST' : 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );

    setIsLoading(false);

    const actionName = !revision ? 'creada' : 'actualizada';

    if (!response?.ok) {
      return toast({
        title: 'Algo ha ido mal.',
        description: `Tu revisión no ha sido ${actionName}. Por favor, inténtalo de nuevo.`,
        variant: 'destructive',
      });
    }

    toast({
      description: `Revisión ${actionName} correctamente.`,
    });

    router.push(`/challenge/${challenge.id}/revision`);
  };

  const handleCopyDataFromLastRevision = async () => {
    setIsCopyingDataFromLastRevision(true);

    const response = await fetch(
      `/api/challenge/${challenge.id}/revision/last`,
      {
        method: 'GET',
      },
    );

    const lastRevision = await response.json();

    setIsLoading(false);

    if (!response?.ok) {
      return toast({
        title: 'Algo ha ido mal.',
        description:
          'Error al consultar la última revisión. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    }

    setIsCopyingDataFromLastRevision(false);

    if (!lastRevision) {
      return toast({
        description: 'No hay ninguna revisión anterior',
      });
    }

    form.setValue('bodyWeight', lastRevision.bodyWeight);
    form.setValue('bodyPartMeasurements', [
      ...lastRevision.bodyPartMeasurements,
    ]);
    form.reset(form.getValues()); // To view useFieldArray changes

    toast({
      description: 'Datos copiados correctamente.',
    });
  };

  return (
    <Form {...form}>
      {!revision && (
        <div className="text-end mb-4">
          <CopyDataFromLastRevisionButton
            isLoading={isCopyingDataFromLastRevision}
            onClick={handleCopyDataFromLastRevision}
          />
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>Fecha</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {challenge.includeRevisionBodyWeight && (
            <FormField
              control={form.control}
              name="bodyWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peso corporal (kg)</FormLabel>
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
          )}
        </div>

        {/* <FormField
          control={form.control}
          name="weeklyTrainingDays"
          render={() => (
            <FormItem>
              <FormLabel>Días de entreno</FormLabel>
              { weekDays.map((item) => (
                <FormField
                  key={`weekdays_${item.id}`}
                  control={form.control}
                  name="weeklyTrainingDays"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={`weekday_${item.id}`}
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
                                    (value) => value !== item.id
                                  )
                                )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.title}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* { challenge.includeRevisionBodyParts && (
          <>
            <div>
              <h3 className="text-lg font-medium">Medidas corporales</h3>
              <p className='text-md text-gray-500'>Todas las medidas están indicadas en cm (centímetros)</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              { bodyPartMeasurementFields.map((bodyPartMeasurementField, index) => (
                <div key={'bodyPartMeasurement_' + index}>
                  <FormField
                    control={form.control}
                    name={`bodyPartMeasurements.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{translateBodyPart(bodyPartMeasurementField.bodyPart)} (cm)</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))
              }
            </div>
          </>
        ) } */}

        {challenge.includeRevisionBodyParts && (
          <div className="hidden md:block">
            <h3 className="text-lg font-medium">Medidas corporales</h3>
            <p className="text-md text-gray-500 mb-2">
              Todas las medidas están indicadas en cm (centímetros)
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  {bodyPartMeasurementFields.map(
                    (bodyPartMeasurementField, index) => (
                      <TableHead key={'bodyPartMeasurement_header_' + index}>
                        {translateBodyPart(bodyPartMeasurementField.bodyPart)}
                      </TableHead>
                    ),
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  {bodyPartMeasurementFields.map(
                    (bodyPartMeasurementField, index) => (
                      <TableCell
                        className="font-medium"
                        key={'bodyPartMeasurement_row_' + index}
                      >
                        <FormField
                          control={form.control}
                          name={`bodyPartMeasurements.${index}.amount`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(+event.target.value)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                    ),
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}

        {challenge.includeRevisionBodyParts && (
          <div className="md:hidden">
            <h3 className="text-lg font-medium">Medidas corporales</h3>
            <p className="text-md text-gray-500 mb-2">
              Todas las medidas están indicadas en cm (centímetros)
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parte del cuerpo</TableHead>
                  <TableHead>Medida</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bodyPartMeasurementFields.map(
                  (bodyPartMeasurementField, index) => (
                    <TableRow key={'bodyPartMeasurement_row_' + index}>
                      <TableCell>
                        {translateBodyPart(bodyPartMeasurementField.bodyPart)}
                      </TableCell>
                      <TableCell className="font-medium w-[100px]">
                        <FormField
                          control={form.control}
                          name={`bodyPartMeasurements.${index}.amount`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(+event.target.value)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {challenge.includeRevisionBodyPhotos && revision && (
          <RevisionPhotos revision={revision} />
        )}

        {revision && <UpdatedFields entity={revision} />}

        <div className="text-end">
          <Button
            type="submit"
            disabled={isLoading}
            className={cn({
              'cursor-not-allowed opacity-60': isLoading,
            })}
          >
            <span>{isLoading ? 'Guardando...' : 'Guardar'}</span>
            {isLoading ? (
              <FaSpinner className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <SaveIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
