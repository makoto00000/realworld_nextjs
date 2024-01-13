"use client"

import { useFormState } from "react-dom";
import { loginAction } from "../utils/actions";
import FormErrors from "./FormErrors";

export default function AuthForm() {
  const [formState, formAction] = useFormState(loginAction, {errors: null, user: null});

  return (
    <div className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign in</h1>
          <p className="text-xs-center">
            <a href="/register">Need an account?</a>
          </p>

          {formState.errors ? 
          <FormErrors {...formState.errors} />
          : ""}

          <form action={formAction}>
            <fieldset className="form-group">
              <input className="form-control form-control-lg" type="text" placeholder="Email" name="email"/>
            </fieldset>
            <fieldset className="form-group">
              <input className="form-control form-control-lg" type="password" placeholder="Password" name="password"/>
            </fieldset>
            <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}