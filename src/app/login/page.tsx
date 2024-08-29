"use client"

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useAuth } from "@/context/authContext";
import InputField from "@/molecules/inputField";
import Button from "@/atoms/button";
 
export default function Page() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [logNameError, setLoginError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user) {
      const from = sessionStorage.getItem('from');
      if (from) {
        router.push(from);
      } else {
        router.push('/');
      }
      return;
    }
  }, [user, router]);

  function isFormValid() {
    return !logNameError && !passwordError;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    validateLogname(event.currentTarget.username.value);
    validatePassword(event.currentTarget.password.value);

    if (!isFormValid()) {
      return;
    }
 
    const formData = new FormData(event.currentTarget);
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })

    if(!response.ok) {
      return;
    }
 
    const data = await response.json();
    login(data);
  }

  function validateLogname(value: string) {
    if (value.length < 3) {
      setLoginError("Le pseudo doit contenir au moins 3 caractères");
    } else if (logNameError) {
      setLoginError(undefined);
    }
  }

  function validatePassword(value: string) {
    if (value.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
    } else if (logNameError) {
      setPasswordError(undefined);
    }
  }
 
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-black shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <form onSubmit={onSubmit} className="space-y-6" noValidate>
                <InputField
                    name="username"
                    label="Pseudo de connection"
                    type="text"
                    error={logNameError}
                    onBlur={validateLogname}
                    required
                />
                <InputField
                    name="password"
                    label="Password"
                    type="password"
                    error={passwordError}
                    onBlur={validatePassword}
                    required
                />
                <div className="w-full flex justify-center">
                    <Button type="submit">Login</Button>
                </div>
            </form>
        </div>
    </div>
  )
}