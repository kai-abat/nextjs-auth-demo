import { getSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const sessionStr = JSON.parse(JSON.stringify(session));
  console.log(sessionStr);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session: sessionStr },
  };
}

export default ProfilePage;
