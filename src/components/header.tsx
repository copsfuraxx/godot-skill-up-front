import HeaderLink from '@/atoms/headerlink';
import { useAuth } from '@/context/authContext';
import { MouseEvent } from 'react';
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  function handleLogout(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    logout();
  }

  function saveFrom() {
    sessionStorage.setItem('from', pathname);
  }

  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="w-full px-5 flex justify-between items-center">
        <div className="space-x-4">
          <HeaderLink href="/">Home</HeaderLink>
          <HeaderLink href="/exercise">Exercise</HeaderLink>
        </div>
        <h1>Godot skill up</h1>
        <ul className="flex space-x-4">
          {user ? (
            <>
              <li>
                Welcome, <HeaderLink href="/profile">{user.username}</HeaderLink>
              </li>
              <li>
                <HeaderLink onClick={handleLogout}>Logout</HeaderLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <HeaderLink href="/login" onClick={saveFrom}>Login</HeaderLink>
              </li>
              <li>
                <HeaderLink href="/register" onClick={saveFrom}>Register</HeaderLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
