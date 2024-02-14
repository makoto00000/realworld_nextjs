"use client";

import AuthForm from "../components/AuthForm";
import FormInput from "../components/formComponents/FormInput";
import { loginAction } from "../utils/userActions";

export default function Login() {
  return (
    <AuthForm
      title="Sign in"
      link="/register"
      linkText="Need an account?"
      action={loginAction}
      inputs={[
        <FormInput key={0} type="text" placeholder="Email" name="email" />,
        <FormInput
          key={1}
          type="password"
          placeholder="Password"
          name="password"
        />,
      ]}
      buttonText="Sign in"
    />
  );
}
