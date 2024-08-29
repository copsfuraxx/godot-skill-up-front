"use client"

import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { get, post } from "@/service/fetchApi";
import InputField from "@/molecules/inputField";
import TextareaField from "@/molecules/textareaField";
import Button from "@/atoms/button";

interface Exercise {
  name: string;
  description: string;
  baseCodeUrl: string;
}

interface Props {
  params: {id: number}
}

export default function Exercise(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();
  const [ exercise, setExercise ] = useState<Exercise | null>(null);
  const [ status, setStatus ] = useState<number | null>(null);

  useEffect(() => {
    async function loadExercise() {
      const [data, status] = await get(`exercises/${props.params.id}`, user!.token);
      setExercise(data);
      setStatus(status);
    }
    if (user) {
      loadExercise();
    }
  }, [user, props.params.id]);

  if (!isAdmin()) {
    return <div>Loading...</div>;
  }

  if (status === 401) {
    sessionStorage.setItem('from', pathname);
    router.push('/login');
    return null;
  }

  if (status! >= 400) {
    return <div>Error</div>;
  }

  const updateName = (name: string) => {
    setExercise({...exercise!, name});
  }

  const updateDescription = (description: string) => {
    setExercise({...exercise!, description});
  }

  const updateBaseCodeUrl = (baseCodeUrl: string) => {
    setExercise({...exercise!, baseCodeUrl});
  }

  const saveExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = post(`http://locahost:8080/exercises/${props.params.id}`, user!.token, exercise);
  }

  return (
    <div className="bg-slate-200 dark:bg-slate-700 container mt-5 mx-auto p-8 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Godot Coding Exercise</h1>
      {exercise ? (
        <form className="p-6" onSubmit={saveExercise}>
          <div className="mb-6">
            <InputField name="name" type="text" label="Name" value={exercise.name} onChange={updateName} required/>
        </div>
        <div className="mb-6">
          <TextareaField name="description" label="Description" value={exercise.description} onChange={updateDescription} required/>
        </div>
        <div className="mb-6">
          <InputField name="baseCodeUrl" type="url" label="Base Code URL" value={exercise.baseCodeUrl} onChange={updateBaseCodeUrl} required/>
        </div>
        <div className="flex justify-end">
        <Button type="submit">Save</Button>
        </div>
      </form>
      ):(<></>)}
    </div>
  );
}