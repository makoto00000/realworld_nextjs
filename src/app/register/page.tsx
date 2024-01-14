'use client'

import AuthForm from "../components/AuthForm"
import FormInput from "../components/formComponents/FormInput"
import { registerAction } from "../utils/actions"

export default function Register() {

  return (
    <AuthForm 
    title="Sign up" 
    link="/login" 
    linkText="Have an account?"
    action={registerAction}
    inputs={[
    <FormInput type="text" placeholder="Username" name= "username" />,
    <FormInput type="text" placeholder="Email" name= "email" />,
    <FormInput type="password" placeholder="Password" name= "password" />
    ]}
    buttonText="Sign up"
    />
  )
}