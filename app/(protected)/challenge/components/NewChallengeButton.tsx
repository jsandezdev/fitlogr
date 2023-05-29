'use client'

import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { NewChallengeFormWizard } from '../new/components/NewChallengeFormWizard'

export const NewChallengeButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New challenge</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>New Challenge</DialogTitle>
          <DialogDescription>Create a new and amazing challenge</DialogDescription>
          <Separator />
          <NewChallengeFormWizard />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
