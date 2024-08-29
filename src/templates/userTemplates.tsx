import { useAuth } from "@/context/authContext";
import { MutableRefObject, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
    status: number,
    children: ReactNode
}

export default function UserTemplate({status, children}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLogged } = useAuth();

  const logged = isLogged();

  if (logged == -1 || status == 401) {
    sessionStorage.setItem('from', pathname);
    router.push('/login');
    return;
  }

  if (logged == 0) {
    return <div>Loading...</div>;
  }

  if (status >= 400) {
    return <div>Error</div>;
  }
  return (children);
}