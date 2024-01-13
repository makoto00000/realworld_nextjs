import { deleteCookie, getCookie } from "./app/utils/cookies";
import { User } from "./types";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const res = await fetch('http://localhost:3001/api/users', { 
    cache: "no-store",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, email, password}),
  });
  // if (res.status === 422) {
     // const errors = await res.json();
  //   throw new Error("failed to register")
     // return errors;
  // }

  // if (!res.ok) {
  //   throw new Error("failed to register")
  // } else {
    const user = await res.json();
    console.log(user)
    return user
    // return user;
  // }
}

export const getCurrentUser:() => Promise<User> = async() => {
  
  const token = getCookie('token')
  const res = await fetch('http://localhost:3001/api/user', {
    cache: "no-store",
    headers: {'Authorization': `Bearer ${token}`},
  });
  if (!res.ok) {
    return null;
  } else {
    const currentUser = await res.json();
    return currentUser.user;
  }
}

export const updateUser = async (
  imageUrl: string, 
  userName: string, 
  bio: string, 
  email: string,
  password: string) => {
    const token = getCookie('token')
    const res = await fetch('http://localhost:3001/api/users', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`},
      body: JSON.stringify({
        "user": {
          "image": imageUrl, 
          "username": userName,
          "bio": bio,
          "email": email,
          "password": password}})
    });
    if (!res.ok) {
      const errors = await res.json();
      return errors
    } else {
      const user = await res.json();
      return user
    }
}

export const loginUser = async(email: string, password: string) => {

    const res = await fetch("http://localhost:3001/api/users/login",{ 
        cache: "no-store",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({"user": {email, password}}),
    });
    if (res.ok) {
      const user = await res.json();
      return user
    } else {
      const errors = await res.json();
      return errors
    }

}