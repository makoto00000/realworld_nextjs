"use client";

import AuthForm from "../components/AuthForm";
import FormInput from "../components/formComponents/FormInput";
import { registerAction } from "../utils/userActions";

export default function Register() {
  return (
    <AuthForm
      title="Sign up"
      link="/login"
      linkText="Have an account?"
      action={registerAction}
      inputs={[
        <FormInput
          key={0}
          type="text"
          placeholder="Username"
          name="username"
        />,

        <FormInput key={1} type="text" placeholder="Email" name="email" />,

        <FormInput
          key={2}
          type="password"
          placeholder="Password"
          name="password"
        />,
      ]}
      buttonText="Sign up"
    />
  );
}
