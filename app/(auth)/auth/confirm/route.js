// Hầu hết các đoạn code liên quan đến Supabase đều được
// tham khảo code từ Subpabase!

// ----------Cần thiết lập trong Supabase-----------------
// Trong Email Template/Confirm signup trong Supabase ở Source:
// Đoạn code cơ bản:
// {{ .ConfirmationURL }}: Đây là biến chứa URL xác nhận đầy đủ được Supabase tạo ra.
// URL này bao gồm token xác nhận và các thông tin cần thiết khác để xác thực người dùng.
// Khi người dùng nhấp vào liên kết này, họ sẽ được chuyển hướng đến trang xác nhận đăng ký.
{
  /* <h2>Confirm your signup</h2>

<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p> */
}

// Đoạn code tùy chỉnh:
// {{ .SiteURL }}: Đây là biến chứa URL của ứng dụng của bạn. Biến này được cấu hình trong cài đặt xác thực của dự án Supabase.

// {{ .TokenHash }}: Đây là biến chứa phiên bản mã hóa của token xác nhận. Bạn sử dụng biến này để tạo URL xác nhận tùy chỉnh.

// URL tùy chỉnh: Trong đoạn mã này, bạn tự tạo URL xác nhận bằng cách kết hợp {{ .SiteURL }} với đường dẫn /auth/confirm và thêm các tham số token_hash và type. Điều này cho phép bạn kiểm soát nhiều hơn về cấu trúc URL xác nhận.

// <h2>Confirm your signup</h2>

// <p>Follow this link to confirm your user:</p>
// <p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{.TokenHash}}&type=email">Confirm your mail</a></p>

// Trong Email Template/Magic Link trong Supabase:

// <h2>Magic Link</h2>

// <p>Follow this link to login:</p>
// <p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{.TokenHash}}&type=magiclink">Log In</a></p>
// -------------------------------------------------------
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/";
  const redirectTo = request.nextUrl.clone();

  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      redirectTo.searchParams.delete("next");
      return NextResponse.redirect(redirectTo);
    }
  }
  // return the user to an error page with some instructions
  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}
