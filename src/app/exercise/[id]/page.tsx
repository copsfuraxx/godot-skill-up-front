"use client"

import Link from "@/atoms/link";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { get } from "@/service/fetchApi";
import { usePathname, useRouter } from "next/navigation";

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
  const { user, isLogged } = useAuth();
  const [ exercise, setExercise ] = useState<Exercise | null>(null);
  const [ status, setStatus ] = useState<number | null>(null);

  useEffect(() => {
    async function loadExercise() {
      const [data, status] = await get(`exercises/${props.params.id}`, user!.token);
      setStatus(status);
      setExercise(data);
    }
    if (user) {
      loadExercise();
    }
  }, [user, props.params.id]);

  if (!isLogged()) {
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

  return (
    <div className="bg-slate-200 dark:bg-slate-700 container mt-5 mx-auto p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Godot Coding Exercise</h1>

        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{exercise?.name}</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-6">{exercise?.description}</p>
            <Link href={exercise!.baseCodeUrl} external>View Code on GitHub</Link>
        </div>
    </div>
  );
}