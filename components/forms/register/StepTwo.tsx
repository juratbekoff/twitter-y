"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { registerStep2Schema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui";
import { Dispatch, SetStateAction, useState } from "react";
import { useRegisterModal } from "@/hooks";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";

const RegFormStepTwo = ({
  stepOnedata,
  setStep,
}: {
  stepOnedata: {
    name: string;
    email: string;
  };
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const registerModal = useRegisterModal();

  const form = useForm<z.infer<typeof registerStep2Schema>>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerStep2Schema>) {
    setIsLoading(true);

    try {
      const { data } = await axios.post("/api/auth/register?step=2", {
        ...stepOnedata,
        ...values,
      });

      if (data.success) {
        setIsLoading(false);
        setStep(1);
        signIn("credentials", {
          email: stepOnedata.email,
          password: values.password,
        });
        registerModal.onClose();
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive" className="text-red-500">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
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
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button label="Register" secondary fullWidth disabled={isLoading} />
      </form>
    </Form>
  );
};

export default RegFormStepTwo;
