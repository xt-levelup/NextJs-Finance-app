import { cookies } from "next/headers";

// NextJs 15 báo lỗi await nên có thay đổi thành hàm async
const getServerDarkMode = async (defaultTheme = "dark") => {
  const getCookie = await cookies();
  return getCookie.get("theme")?.value ?? defaultTheme;
};

export default getServerDarkMode;
