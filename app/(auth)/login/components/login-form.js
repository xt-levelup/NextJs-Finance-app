"use client";
import Input from "@/components/input";
import { login } from "@/lib/actions";
import SubmitButton from "@/components/submit-button";
import { useActionState } from "react";
// import { useFormState } from "react-dom"; // Đã khuyến nghị bỏ

const initialState = {
  message: "",
  error: false,
};

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  // // Đã khuyến nghị bỏ
  // const [state, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction} className="space-y-2">
      <Input
        type="email"
        placeholder="name@example.com"
        name="email"
        required
      />
      <SubmitButton type="submit" size="sm" className="w-full">
        Sign in with email
      </SubmitButton>
      <p
        className={`${
          state?.error ? "text-red-500" : "text-green-500"
        } text-sm text-center`}
      >
        {state?.message}
      </p>
    </form>
  );
}
