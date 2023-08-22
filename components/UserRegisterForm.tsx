'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { userRegisterSchema } from '@/lib/validations/userRegister.schema';

import { SocialLogin } from './SocialLogin';
import { Checkbox } from './ui/checkbox';

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userRegisterSchema>;

const defaultValues = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues,
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const registerResult = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (registerResult?.ok) {
        signIn('credentials', {
          email: data.email.toLowerCase(),
          password: data.password,
          callbackUrl: '/',
        });
      } else {
        throw new Error(`Register result status: ${registerResult.status}`);
      }
    } catch (error: any) {
      setIsLoading(false);
      return toast({
        title: 'Error al crear la cuenta ',
        description:
          'El registro de la cuenta ha fallado. Por favor, inténtalo de nuevo más tarde',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Nombre" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Apellidos" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" {...field} placeholder="Contaseña" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Repetir contraseña"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Acepto los términos y condiciones</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button
            variant="default"
            className="w-full"
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
            Crear cuenta
          </Button>
        </form>
      </Form>
      <SocialLogin
        isLoading={isGoogleLoading}
        setIsLoading={setIsGoogleLoading}
        disabled={isLoading}
      />
    </div>
  );
}
