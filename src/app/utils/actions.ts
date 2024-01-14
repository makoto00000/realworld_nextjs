'use server'

import { loginUser, registerUser, updateUser } from "@/userAPI";
import { redirect } from "next/navigation";
import { deleteCookie, setCookie } from "./cookies";
import { Errors, User } from "@/types";

export type ActionState = {
  errors: Errors | null
  user: User | null
}

export async function submitUser(prevState: ActionState, formData: FormData): Promise<ActionState> {

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

export async function loginAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const result = await loginUser(
    String(formData.get("email")),
    String(formData.get("password"))
  );
  if ('user' in result) {
    await setCookie("token", result.user.token)
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

export async function registerAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const result = await registerUser(
    String(formData.get("username")),
    String(formData.get("email")),
    String(formData.get("password"))
  );
  if ('user' in result) {
    await setCookie("token", result.user.token)
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

