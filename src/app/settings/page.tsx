import React from "react";
import SettingForm from "../components/SettingForm";
import { getCurrentUser } from "@/userAPI";
import { redirect } from "next/navigation";

export default async function Settings() {
  const user = await getCurrentUser();
  let settingFormProps = {
    defaultImageUrl: "",
    defaultUserName: "",
    defaultBio: "",
    defaultEmail: "",
  };
  if (user) {
    if (user.bio === null) {
      user.bio = "";
    }

    settingFormProps = {
      defaultImageUrl: user.image,
      defaultUserName: user.username,
      defaultBio: user.bio,
      defaultEmail: user.email,
    };
  } else {
    redirect("/login");
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <SettingForm {...settingFormProps} />
      </div>
    </div>
  );
}
