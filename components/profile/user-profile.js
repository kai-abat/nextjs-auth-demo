import { getSession, useSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useRouter } from "next/navigation";

function UserProfile() {
  // const router = useRouter();
  // // Redirect away if NOT auth
  // const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  // if (status === "unauthenticated") router.push("/auth");

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
