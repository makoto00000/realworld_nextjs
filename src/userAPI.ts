import { getCookie } from "./app/utils/cookies";
import { User } from "./types";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const res = await fetch("http://localhost:3001/api/users",{ 
    cache: "no-store",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({"user": {username, email, password}}),
});
if (res.ok) {
  const user = await res.json();
  return user
} else {
  const errors = await res.json();
  return errors
}
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