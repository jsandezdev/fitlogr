'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { FaSpinner } from 'react-icons/fa'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { BodyPart } from '@/lib/config'
import { cn } from '@/lib/utils'
import { measurementSchema } from '@/lib/validations/measurement.schema'

const newRevisionFormSchema = z.object({
  date: z.coerce.date(),
  frontPhoto: z.string().optional().nullable(),
  sidePhoto: z.string().optional().nullable(),
  backPhoto: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  measurements: z.array(measurementSchema)
})

type NewRevisionFormValues = z.infer<typeof newRevisionFormSchema>

const defaultValues: Partial<NewRevisionFormValues> = {
  date: new Date(),
  frontPhoto: null,
  sidePhoto: null,
  backPhoto: null,
  weight: 65.50,
  measurements: [
    {
      bodyPart: BodyPart.Bicep,
      amount: 0
    },
    {
      bodyPart: BodyPart.Chest,
      amount: 0
    },
    {
      bodyPart: BodyPart.Hips,
      amount: 0
    },
    {
      bodyPart: BodyPart.Neck,
      amount: 0
    },
    {
      bodyPart: BodyPart.Shoulders,
      amount: 0
    },
    {
      bodyPart: BodyPart.Thigh,
      amount: 0
    },
    {
      bodyPart: BodyPart.Waist,
      amount: 0
    }
  ]
}

interface Props {
  challengeId: string
}

export const NewRevisionForm = ({ challengeId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<NewRevisionFormValues>({
    resolver: zodResolver(newRevisionFormSchema),
    defaultValues
  })

  const { fields: measurementsFields } = useFieldArray({
    name: 'measurements',
    control: form.control
  })

  async function onSubmit (formData: NewRevisionFormValues) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
    //     </pre>
    //   )
    // })

    setIsLoading(true)

    const response = await fetch(`/api/challenge/${challengeId}/revision`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your revision was not created. Please try again.',
        variant: 'destructive'
      })
    }

    toast({
      description: 'Your revision has been created.'
    })

    // router.refresh()
  }

  return (
    <Form {...form}>
      <div>
        <p>Form Errors:</p>
        <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? (
                          format(field.value, 'PPP')
                        )
                        : (
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

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>weight</FormLabel>
              <FormControl>
                <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h3 className="mb-4 text-lg font-medium">Measurements</h3>
          { measurementsFields.map((field, index) => (
            <div key={'measurement_' + index}>
              <p>{field.bodyPart}</p>
              {/* <FormField
                className='hidden'
                control={form.control}
                name={`measurements.${index}.bodyPart`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>bodyPart</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        { (Object.keys(BodyPart) as Array<BodyPart>).map((bodyPart, index) => <SelectItem key={`measurements.${index}_bodyPart_${bodyPart}`} value={bodyPart}>{bodyPart}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                  You can manage email addresses in your
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name={`measurements.${index}.amount`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>amount</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
        >
          { isLoading
            ? (
              <>
                <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                <span>Loading</span>
              </>
            )
            : (
              <span>Save</span>
            )}
        </Button>
      </form>
    </Form>
  )
}
