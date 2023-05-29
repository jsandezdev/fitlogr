'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { BodyPart, GoalType, UnitOfTime } from '@/lib/config'
import { bodyPartGoalSchema } from '@/lib/validations/bodyPartGoal.schema'
import { weightGoalSchema } from '@/lib/validations/weightGoal.schema'

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons'

const newChallengeStep4FormSchema = z.object({
  includeWeightGoal: z.boolean(),
  includeBodyPartGoals: z.boolean(),
  weightGoal: weightGoalSchema,
  bodyPartGoals: z.array(bodyPartGoalSchema)
})

type NewChallengeStep4FormValues = z.infer<typeof newChallengeStep4FormSchema>

const defaultValues: Partial<NewChallengeStep4FormValues> = {
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

type Props = {
  onNext: (formData: NewChallengeStep4FormValues) => void;
  onPrevious: () => void;
}

export const NewChallengeStep4Form = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<NewChallengeStep4FormValues>({
    resolver: zodResolver(newChallengeStep4FormSchema),
    defaultValues
  })

  const { fields: bodyPartGoalsFields } = useFieldArray({
    name: 'bodyPartGoals',
    control: form.control
  })

  async function onSubmit (formData: NewChallengeStep4FormValues) {
    setIsLoading(true)
    onNext(formData)
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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

        <NewChallengeFormStepButtons
          isLoading={isLoading}
          onPrevious={onPrevious}
        />
      </form>
    </Form>
  )
}
