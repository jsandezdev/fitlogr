'use client';

import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { NewWorkoutFormWizard } from '../new/components/NewWorkoutFormWizard';

export const NewWorkoutButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New workout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">New Workout</DialogTitle>
          <DialogDescription>
            Create a new and amazing workout
          </DialogDescription>
          <Separator />
          <NewWorkoutFormWizard />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
