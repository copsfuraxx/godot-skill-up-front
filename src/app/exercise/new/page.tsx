"use client"

import { FormEvent, useState } from "react";
import { post } from "@/service/fetchApi";
import InputField from "@/molecules/inputField";
import TextareaField from "@/molecules/textareaField";
import Button from "@/atoms/button";
import { useAuth } from "@/context/authContext";
import AdminTemplate from "@/templates/adminTemplates";

interface Props {
  params: {id: number}
}

export default function Exercise(props: Props) {
  const { user } = useAuth();
  const [errors, setErrors] = useState<{ [key: string]: string | undefined}>({});

  const validateName = (name: string) => {
    if (name.length < 3) {
      return "Name must be at least 3 characters long";
    } else {
      return undefined;
    }
  };

  const validateDescription = (description: string) => {
    if (description.length < 10) {
      return "Description must be at least 10 characters long";
    } else {
      return undefined;
    }
  };

  const validateBaseCodeUrl = (baseCodeUrl: string) => {
    if (baseCodeUrl.startsWith("https://github.com/")) {
      return undefined;
    }
    else {
      return "Only accept github repository";
    }
  }

  const saveExercise = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const exercise = new FormData(event.currentTarget);
    const name = exercise.get("name") as string;
    const description = exercise.get("description") as string;
    const baseCodeUrl = exercise.get("baseCodeUrl") as string;
    const newErrors : any = {};
    newErrors.name = validateName(name);
    newErrors.description = validateDescription(description);
    newErrors.baseCodeUrl = validateBaseCodeUrl(baseCodeUrl);
    setErrors(newErrors);
    if (newErrors.name || newErrors.description || newErrors.baseCodeUrl) {
      return;
    }
    const [data, status] = await post(`exercises`, user!.token, {name, description, baseCodeUrl});
    console.log(data);
  }

  return (
    <AdminTemplate status={200}>
      <div className="bg-slate-200 dark:bg-slate-700 container mt-5 mx-auto p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8">New Godot Coding Exercise</h1>
          <form className="p-6" onSubmit={saveExercise} noValidate>
            <div className="mb-6">
              <InputField
              name="name"
              type="text"
              label="Name"
              error={errors.name}
              onBlur={(value) => setErrors({...errors, name: validateName(value)})}
              required
              />
          </div>
          <div className="mb-6">
            <TextareaField
            name="description"
            label="Description"
            error={errors.description}
            onBlur={(value) => setErrors({...errors, description: validateDescription(value)})}
            required
            />
          </div>
          <div className="mb-6">
            <InputField
            name="baseCodeUrl"
            type="url"
            label="Base Code URL"
            error={errors.baseCodeUrl}
            onBlur={(value) => setErrors({...errors, baseCodeUrl: validateBaseCodeUrl(value)})}
            required
            />
          </div>
          <div className="flex justify-end">
          <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
  </AdminTemplate>
  );
}