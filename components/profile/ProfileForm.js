import { useState } from "react";
import classes from "./ProfileForm.module.css";

function ProfileForm(props) {
  const { onChangePwd } = props;
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    onChangePwd({ oldPwd, newPwd });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          value={oldPwd}
          onChange={(e) => setOldPwd(e.target.value)}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
