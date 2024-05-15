import { useRef, useState } from "react";
import classes from "./profile-form.module.css";

async function changePassword(newPassword, oldPassword) {
  const res = await fetch("/api/user/change-password", {
    method: "PATCH",
    body: JSON.stringify({ newPassword, oldPassword }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    try {
      const result = await changePassword(
        enteredNewPassword,
        enteredOldPassword
      );
      alert(result.message);
    } catch (error) {
      alert(error);
    }

    setIsLoading(false);
  }
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>{isLoading ? "Loading..." : "Change Password"}</button>
      </div>
    </form>
  );
}

export default ProfileForm;
