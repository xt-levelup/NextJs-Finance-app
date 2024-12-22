import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import getServerDarkMode from "@/hooks/use-server-dark-mode";

// Có thay đổi về getServerDarkMode vì lỗi await
export default async function PageHeader({ className }) {
  const theme = await getServerDarkMode();
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex items-center space-x-4">
        <DarkModeToggle defaultTheme={theme} />
        <div>User Dropdown</div>
      </div>
    </header>
  );
}
