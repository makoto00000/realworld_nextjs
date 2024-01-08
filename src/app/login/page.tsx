'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Cookies from 'js-cookie';


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<[string, []][] | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"user": {email, password}}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(Object.entries(errorData.errors.body));
        
      } else {
        const data = await response.json();
        const newToken = data.user.token;
        Cookies.set('token', newToken, 
        {expires: 14,
        path: '/'})
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <a href="/register">Need an account?</a>
            </p>

            {errors ?
              <ul className="error-messages">
                {errors.map((error) => (
                  error[1].map((err) => (
                    <li key={err}>{error[0]} {err}</li>
                  ))
                ))}
              </ul>
            :""}

            <form onSubmit={onSubmit}>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}