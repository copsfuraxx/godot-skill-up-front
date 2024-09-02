"use client"

import { FocusEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useAuth } from "@/context/authContext";
import InputField from "@/molecules/inputField";
import Button from "@/atoms/button";
import PasswordField from "@/molecules/passwordField copy";
 
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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    validateLogname(event.currentTarget.username);
    validatePassword(event.currentTarget.password);

    if (logNameError || passwordError) {
      return;
    }

 
    const formData = new FormData(event.currentTarget);
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    })

    if(!response.ok) {
      return;
    }
 
    const data = await response.json();
    login(data);
  }

  function validateLogname(target: HTMLInputElement) {
    if (!target.validity.valid) {
      setLoginError(target.validationMessage);
    }
    else if (logNameError) {
      setLoginError(undefined);
    }
  }

  function validatePassword(target: HTMLInputElement) {
    if (target.validity.patternMismatch) {
      setPasswordError("Password must contain at least one number, one uppercase and one lowercase letter");
    }
    else if (!target.validity.valid) {
      setPasswordError(target.validationMessage);
    }
    else if (passwordError) {
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
                    required
                    minLength={3}
                    maxLength={20}
                    error={logNameError}
                    onBlur={validateLogname}
                />
                <PasswordField
                    name="password"
                    label="Password"
                    error={passwordError}
                    required
                    minLength={8}
                    maxLength={20}
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$"
                    onBlur={validatePassword}
                />
                <div className="w-full flex justify-center">
                    <Button type="submit">Login</Button>
                </div>
            </form>
        </div>
    </div>
  )
}