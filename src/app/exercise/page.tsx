"use client"

import { useAuth } from "@/context/authContext";
import { useEffect, useState, useRef } from "react";
import { get } from "@/service/fetchApi";
import Link from "@/atoms/link";
import UserTemplate from "@/templates/userTemplates";

interface Exercises {
  id: number;
  name: string;
}

export default function Exercise() {
  const { user } = useAuth();
  const [ exercises, setExercises ] = useState<Exercises[] | null>(null);
  const status = useRef<number>(0);
  const loading = useRef<boolean>(true);

  useEffect(() => {
    async function loadExercises() {
      const [data, s] = await get("exercises", user!.token);
      status.current = s;
      loading.current = false;
      setExercises(data);
    }
    if (user) {
      loadExercises();
    }
  }, [user]);

  return (
    <UserTemplate status={status.current}>
      <div className="bg-slate-200 dark:bg-slate-700 container mt-5 mx-auto p-8 rounded-lg">
        <h1 className="text-2xl font-bold text-center mt-8">Welcome to the Exercise Page!</h1>
        {exercises ? (
          <div>
            {exercises.length != 0 ? (
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
            {user?.role == "admin" && (
              <div className="text-center mt-4">
                <Link href="exercise/new">Créer un nouvelle exercise</Link>
              </div>
            )}
          </div>
        ) : (
          <div>loading...</div>
        )}
        
      </div>
    </UserTemplate>
  );
}