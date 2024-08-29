"use client"

import { useAuth } from "@/context/authContext";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { get } from "@/service/fetchApi";
import Link from "@/atoms/link";

interface Exercises {
  id: number;
  name: string;
}

export default function Exercise() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();
  const [ exercises, setExercises ] = useState<Exercises[] | null>(null);
  const status = useRef<number>(0);
  const loading = useRef<boolean>(true);

  useEffect(() => {
    async function loadExercises() {
      const [data, s] = await get("exercises", user!.token);
      loading.current = false;
      status.current = s;
      setExercises(data);
    }
    if (user) {
      loadExercises();
    }
  }, [user]);

  if (!isAdmin() || loading.current) {
    return <div>Loading...</div>;
  }

  if (status.current === 401) {
    sessionStorage.setItem('from', pathname);
    router.push('/login');
    return null;
  }

  if (status.current >= 400) {
    return <div>Error</div>;
  }

  return (
    <div className="bg-slate-200 dark:bg-slate-700 container mt-5 mx-auto p-8 rounded-lg">
      <h1 className="text-2xl font-bold text-center mt-8">Welcome to the Exercise Page!</h1>
      {exercises!.length != 0 ? (
        <ul className="mt-4">
          {exercises!.map((exercise) => (
            <li key={exercise.id} className="py-2">
              <Link href={"exercise/" + exercise.id}>{exercise.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center mt-4">No exercises found.</div>
      )}
    </div>
  );
}