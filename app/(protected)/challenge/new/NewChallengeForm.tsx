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
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { BodyPart, GoalType, UnitOfTime, WeekDay } from '@/lib/config'
import { cn } from '@/lib/utils'
import { bodyPartGoalSchema } from '@/lib/validations/bodyPartGoal.schema'
import { unitOfTimeSchema } from '@/lib/validations/unitOfTime.schema'
import { weekDaySchema } from '@/lib/validations/weekDay.schema'
import { weightGoalSchema } from '@/lib/validations/weightGoal.schema'

// @TODO: Dividir el form en partes:
// - https://react-hook-form.com/advanced-usage#WizardFormFunnel
// - React context: https://claritydev.net/blog/build-a-multistep-form-with-react-hook-form

const newChallengeFormSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  revisionFrequencyNumber: z.number(),
  revisionFrequencyUnitOfTime: unitOfTimeSchema,
  includeRevisionBodyPhotos: z.boolean(),
  includeRevisionBodyWeight: z.boolean(),
  includeRevisionBodyParts: z.boolean(),
  weeklyTrainingDays: z.array(weekDaySchema).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.'
  }),
  includeDietLog: z.boolean(),
  monthlyCheatMeals: z.number(),
  includeWeightGoal: z.boolean(),
  includeBodyPartGoals: z.boolean(),
  weightGoal: weightGoalSchema,
  bodyPartGoals: z.array(bodyPartGoalSchema)
})

type NewChallengeFormValues = z.infer<typeof newChallengeFormSchema>

const defaultValues: Partial<NewChallengeFormValues> = {
  name: 'My challenge',
  startDate: new Date(),
  endDate: new Date(),
  revisionFrequencyNumber: 1,
  revisionFrequencyUnitOfTime: UnitOfTime.Week,
  includeRevisionBodyWeight: false,
  includeRevisionBodyPhotos: false,
  includeRevisionBodyParts: false,
  weeklyTrainingDays: [WeekDay.Monday, WeekDay.Wednesday, WeekDay.Friday],
  includeDietLog: false,
  monthlyCheatMeals: 4,
  includeWeightGoal: true,
  includeBodyPartGoals: false,
  weightGoal: {
    amount: 1,
    frequencyAmount: 1,
    frequencyUnitOfTime: UnitOfTime.Month,
    goalType: GoalType.Lose
  },
  bodyPartGoals: [
    {
      bodyPart: BodyPart.Bicep,
      amount: 0.5,
      frequencyAmount: 1,
      frequencyUnitOfTime: UnitOfTime.Week,
      goalType: GoalType.Gain
    },
    {
      bodyPart: BodyPart.Chest,
      amount: 1,
      frequencyAmount: 2,
      frequencyUnitOfTime: UnitOfTime.Week,
      goalType: GoalType.Gain
    },
    {
      bodyPart: BodyPart.Hips,
      amount: 1,
      frequencyAmount: 2,
      frequencyUnitOfTime: UnitOfTime.Week,
      goalType: GoalType.Gain
    },
    {
      bodyPart: BodyPart.Neck,
      amount: 1,
      frequencyAmount: 2,
      frequencyUnitOfTime: UnitOfTime.Week,
      goalType: GoalType.Gain
    },
    {
      bodyPart: BodyPart.Shoulders,
      amount: 1,
      frequencyAmount: 2,
      frequencyUnitOfTime: UnitOfTime.Week,
      goalType: GoalType.Gain
    },
    {
      bodyPart: BodyPart.Thigh,
      amount: 1,
      frequencyAmount: 2,
      frequencyUnitOfTime: UnitOfTime.Week,
      goalType: GoalType.Gain
    },
    {
      bodyPart: BodyPart.Waist,
      amount: 1,
      frequencyAmount: 2,
      frequencyUnitOfTime: UnitOfTime.Week,
      goalType: GoalType.Gain
    }
  ]
}

const steps = { Duration: 'Duration', Revisions: 'Revisions' }

export const NewChallengeForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<NewChallengeFormValues>({
    resolver: zodResolver(newChallengeFormSchema),
    defaultValues
  })

  const { fields: bodyPartGoalsFields } = useFieldArray({
    name: 'bodyPartGoals',
    control: form.control
  })

  // const nextStep = () =>

  async function onSubmit (formData: NewChallengeFormValues) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
    //     </pre>
    //   )
    // })

    setIsLoading(true)

    // @TODO
    const response = await fetch('/api/challenge/', {
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
        description: 'Your challenge was not created. Please try again.',
        variant: 'destructive'
      })
    }

    toast({
      description: 'Your challenge has been created.'
    })

    // router.refresh()
  }

  return (
    <Form {...form}>
      {/* <div>
        <p>Form Errors:</p>
        <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
      </div> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <h3 className='text-xl font-bold'>{steps.Duration}</h3>
        <div>
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start date</FormLabel>
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
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End date</FormLabel>
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
                        date < new Date()
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
        </div>

        <div className='hidden'>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
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
            name="revisionFrequencyNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>revisionFrequencyNumber</FormLabel>
                <FormControl>
                  <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="revisionFrequencyUnitOfTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>revisionFrequencyUnitOfTime</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    { (Object.keys(UnitOfTime) as Array<UnitOfTime>).map((unitOfTime, index) => <SelectItem key={`revisionFrequencyUnitOfTime_${unitOfTime}`} value={unitOfTime}>{unitOfTime}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="includeRevisionBodyWeight"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                    includeRevisionBodyWeight
                      </FormLabel>
                      <FormDescription>
                      Receive emails about your account activity.
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
                      <FormLabel className="text-base">
                    includeRevisionBodyPhotos
                      </FormLabel>
                      <FormDescription>
                      Receive emails about new products, features, and more.
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
                      <FormLabel className="text-base">
                      includeRevisionBodyParts
                      </FormLabel>
                      <FormDescription>
                      Receive emails for friend requests, follows, and more.
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

          <FormField
            control={form.control}
            name="weeklyTrainingDays"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Training days</FormLabel>
                  <FormDescription>
                  Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                { (Object.keys(WeekDay) as Array<WeekDay>).map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="weeklyTrainingDays"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item
                                    )
                                  )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="includeDietLog"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                  includeDietLog
                  </FormLabel>
                  <FormDescription>
                  You can manage your mobile notifications in the mobile settings page.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <div className={!form.getValues().includeDietLog ? 'hidden' : '' }>
            <FormField
              control={form.control}
              name="monthlyCheatMeals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>monthlyCheatMeals</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Goals</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="includeWeightGoal"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                    includeWeightGoal
                      </FormLabel>
                      <FormDescription>
                      Receive emails about your account activity.
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
                name="includeBodyPartGoals"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                    includeBodyPartGoals
                      </FormLabel>
                      <FormDescription>
                      Receive emails about new products, features, and more.
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

          <div className={!form.getValues().includeWeightGoal ? 'hidden' : '' }>
            <h3 className="mb-4 text-lg font-medium">Weight goal</h3>
            <FormField
              control={form.control}
              name="weightGoal.goalType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>goalType</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      { (Object.keys(GoalType) as Array<GoalType>).map((goalType, index) => <SelectItem key={`weightGoal_goalType_${goalType}`} value={goalType}>{goalType}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                  You can manage email addresses in your
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weightGoal.amount"
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
            <FormField
              control={form.control}
              name="weightGoal.frequencyAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>weightGoal.frequencyAmount</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weightGoal.frequencyUnitOfTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>frequencyUnitOfTime</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      { (Object.keys(UnitOfTime) as Array<UnitOfTime>).map((unitOfTime, index) => <SelectItem key={`weightGoal_frequencyUnitOfTime_${unitOfTime}`} value={unitOfTime}>{unitOfTime}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                  You can manage email addresses in your
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={!form.getValues().includeBodyPartGoals ? 'hidden' : '' }>
            <h3 className="mb-4 text-lg font-medium">BodyPart goals</h3>
            { bodyPartGoalsFields.map((field, index) => (
              <div key={'bodyPartGoal_' + index}>
                <p>{field.bodyPart}</p>
                <FormField
                  control={form.control}
                  name={`bodyPartGoals.${index}.goalType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>goalType</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          { (Object.keys(GoalType) as Array<GoalType>).map((goalType, index) => <SelectItem key={`bodyPartGoals.${index}_goalType_${goalType}`} value={goalType}>{goalType}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                  You can manage email addresses in your
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`bodyPartGoals.${index}.amount`}
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
                <FormField
                  control={form.control}
                  name={`bodyPartGoals.${index}.frequencyAmount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>frequencyAmount</FormLabel>
                      <FormControl>
                        <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`bodyPartGoals.${index}.frequencyUnitOfTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>frequencyUnitOfTime</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          { (Object.keys(UnitOfTime) as Array<UnitOfTime>).map((unitOfTime, index) => <SelectItem key={`bodyPartGoals.${index}_frequencyUnitOfTime_${unitOfTime}`} value={unitOfTime}>{unitOfTime}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                  You can manage email addresses in your
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

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
