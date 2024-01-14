"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import { submitUser } from "../utils/actions";
import { logout } from "../utils/actions";
import FormErrors from "./formComponents/FormErrors";

const initialState = {
  errors: null,
  user: null,
};

type settingFormProps = {
  defaultImageUrl: string;
  defaultUserName: string;
  defaultBio: string;
  defaultEmail: string;
};

export default function SettingForm({
  defaultImageUrl,
  defaultUserName,
  defaultBio,
  defaultEmail,
}: settingFormProps) {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [userName, setUserName] = useState(defaultUserName);
  const [bio, setBio] = useState(defaultBio);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [formState, formAction] = useFormState(submitUser, initialState);

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="text-xs-center">Your Settings</h1>

        {formState.errors ? <FormErrors {...formState.errors} /> : ""}

        <form action={formAction}>
          <fieldset>
            <fieldset className="form-group">
              <input
                className="form-control"
                type="text"
                name={"imageUrl"}
                placeholder="URL of profile picture"
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                name={"userName"}
                placeholder="Your Name"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </fieldset>
            <fieldset className="form-group">
              <textarea
                name={"bio"}
                className="form-control form-control-lg"
                rows={8}
                placeholder="Short bio about you"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              ></textarea>
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                name={"email"}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="password"
                name={"password"}
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </fieldset>
            <button className="btn btn-lg btn-primary pull-xs-right">
              Update Settings
            </button>
          </fieldset>
        </form>
        <hr />
        <form action={logout}>
          <button className="btn btn-outline-danger">
            Or click here to logout.
          </button>
        </form>
      </div>
    </div>
  );
}
