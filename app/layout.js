import { Inter } from "next/font/google";
import "./globals.css";
import getServerDarkMode from "@/hooks/use-server-dark-mode";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Finance App",
    default: "Finance App",
  },
  description: "Generated by create next app",
  /* 
  - template: Định dạng tiêu đề trang. %s sẽ được thay thế
   bằng tiêu đề cụ thể của từng trang. Ví dụ, nếu tiêu đề
    của trang là "Dashboard", tiêu đề cuối cùng sẽ là
     "Dashboard | Finance App".
  - default: Tiêu đề mặc định của trang nếu không có
   tiêu đề cụ thể nào được cung cấp. Trong trường hợp
    này, tiêu đề mặc định là "Finance App".
  */
};

// Có thay đổi về hàm getServerDarkMode vì lỗi await
export default async function RootLayout({ children }) {
  const theme = await getServerDarkMode();
  return (
    <html lang="en" className={theme}>
      <body className={`${inter.className} min-h-screen flex flex-col px-8`}>
        {children}
      </body>
    </html>
  );
}
