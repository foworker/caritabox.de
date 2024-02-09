"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Button, Input } from "@/components/caritabox";
import { userLogin } from "@/validations";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(userLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);

      if (!callback?.error) {
        toast.success("Eingeloggt");
        router.push("/");
        reset();
      }
      if (callback?.error) {
        toast.error("Authentifizierung fehlgeschlagen!");
      }
    });
  };

  return (
    <div className="flex flex-col space-y-8">
      <Input
        id="email"
        label="Ihre E-Mail-Adresse"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Ihr Passwort"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        type="submit"
        disabled={isLoading}
        label="Jetzt einloggen"
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default LoginForm;
