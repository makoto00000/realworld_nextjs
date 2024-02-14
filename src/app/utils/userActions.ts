"use server";

import { loginUser, registerUser, updateUser } from "@/userAPI";
import { deleteCookie, setCookie } from "./cookies";
import { Errors, User } from "@/types";
import { redirect } from "next/navigation";

export type UserActionState = {
  errors: Errors | null;
  user: User | null;
};

export async function submitUser(
  prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const result = await updateUser(
    String(formData.get("imageUrl")),
    String(formData.get("userName")),
    String(formData.get("bio")),
    String(formData.get("email")),
    String(formData.get("password"))
  );

  if ("user" in result) {
    redirect("/");
    return {
      errors: null,
      user: result.user,
    };
  } else {
    return {
      errors: result,
      user: null,
    };
  }
}

export async function loginAction(
  prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const result = await loginUser(
    String(formData.get("email")),
    String(formData.get("password"))
  );
  if ("user" in result) {
    setCookie("token", result.user.token);
    redirect("/");
    return {
      errors: null,
      user: result.user,
    };
  } else {
    return {
      errors: result,
      user: null,
    };
  }
}

export async function registerAction(
  prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const result = await registerUser(
    String(formData.get("username")),
    String(formData.get("email")),
    String(formData.get("password"))
  );
  if ("user" in result) {
    setCookie("token", result.user.token);
    redirect("/");
    return {
      errors: null,
      user: result.user,
    };
  } else {
    return {
      errors: result,
      user: null,
    };
  }
}

export const logout = async () => {
  "use server";
  deleteCookie("token");
};