import { useSession, getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";

function UserProfile() {
  // getSession: send new request, and get the lastest session of it
  // const [isLoading, setIsLoading] = useState(true);
  // const [session, loading] = useSession(); 會卡在loading state if not logged in
  // Redirect away if NOT auth

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) window.location.href = "/auth";
  //     else setIsLoading(false);
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  const changePwdHandler = async (pwdData) => {
    const result = await fetch("/api/user/changePwd", {
      method: "PATCH",
      body: JSON.stringify({
        oldPassword: pwdData.oldPwd,
        newPassword: pwdData.newPwd,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();
    console.log(data);
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePwd={changePwdHandler} />
    </section>
  );
}

export default UserProfile;
