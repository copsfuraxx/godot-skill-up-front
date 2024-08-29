import { useAuth } from "@/context/authContext";
import { MutableRefObject, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
    status: number,
    children: ReactNode
}

export default function AdminTemplate({status, children}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  const admin = isAdmin();

  if (admin == -1 || status == 401) {
    sessionStorage.setItem('from', pathname);
    router.push('/login');
    return;
  }

  if (admin == 0) {
    return <div>Loading...</div>;
  }

  if (admin == 2) {
    router.push('/');
    return;
  }

  if (status >= 400) {
    return <div>Error</div>;
  }
  return (children);
}