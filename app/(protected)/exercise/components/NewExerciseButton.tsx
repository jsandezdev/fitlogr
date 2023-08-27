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

import { NewExerciseForm } from '../new/components/ExerciseForm';

export const NewExerciseButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New exercise</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">New Exercise</DialogTitle>
          <DialogDescription>
            Create a new and amazing exercise
          </DialogDescription>
          <Separator />
          <NewExerciseForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
