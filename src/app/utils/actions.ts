'use server'

import { loginUser, updateUser } from "@/userAPI";
import { redirect } from "next/navigation";
import { deleteCookie, setCookie } from "./cookies";
import { Errors, User } from "@/types";

type State = {
  errors: Errors | null
  user: User | null
}

export async function submitUser(prevState: State, formData: FormData): Promise<State> {

    const result = await updateUser(
      String(formData.get("imageUrl")),
      String(formData.get("userName")),
      String(formData.get("bio")),
      String(formData.get("email")),
      String(formData.get("password"))
    )

    if ('user' in result) {
      redirect("/");
      return {
        errors: null,
        user: result.user,
      }
    } else {
      return {
        errors: result,
        user: null,
      }
    } 

}

export async function loginAction(prevState: State, formData: FormData): Promise<State> {
  const result = await loginUser(
    String(formData.get("email")),
    String(formData.get("password"))
  );
  if ('user' in result) {
    setCookie("token", result.user.token)
    redirect("/")
    return {
      errors: null,
      user: result.user,
    }
  } else {
    return {
      errors: result,
      user: null,
    }
  } 
}

export const logout = async () => {
  'use server'
  deleteCookie("token");
}

