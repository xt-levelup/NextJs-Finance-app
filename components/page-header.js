import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import getServerDarkMode from "@/hooks/use-server-dark-mode";
import { createClient } from "@/lib/supabase/server";
import Button from "./button";
import { CircleUser, KeyRound } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import SignOutButton from "./sign-out-button";

// Có thay đổi về getServerDarkMode vì lỗi await
export default async function PageHeader({ className }) {
  const theme = await getServerDarkMode();
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex items-center">
        <DarkModeToggle defaultTheme={theme} />
        {user && (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <CircleUser className="w-6 h-6" />
            <span>{user?.email}</span>
          </Button>
        )}
        {user && <SignOutButton />}
        {!user && (
          <Link href="/login" className={`${variants["ghost"]} ${sizes["sm"]}`}>
            <KeyRound className="w-6 h-6" />
          </Link>
        )}
      </div>
    </header>
  );
}
