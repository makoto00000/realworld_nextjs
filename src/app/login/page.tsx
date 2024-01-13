'use client'

import { useState } from "react";
import { loginUser } from "@/userAPI";
import { setCookie } from "../utils/cookies";
import AuthForm from "../components/AuthForm";

// export const login = async(formData: FormData) => {
//   'use server';
//   const errors: [string, string[]][] | null = null
//   const email = String(formData.get('email'));
//   const password = String(formData.get('password'));
//   const result = await loginUser(email, password);
//   if ('user' in result) {
//     const token = result.user.token;
//     setCookie("token", token);
//   } else {
//     const errors:[string, string[]][] = result.errors.body
//   }
// };

export default function Login() {

  const [errors, setErrors] = useState<string | null>(null);

  return (
    <AuthForm />
  )
}