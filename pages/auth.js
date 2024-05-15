import { useSession } from "next-auth/react";
import AuthForm from "../components/auth/auth-form";
import { useRouter } from "next/navigation";

function AuthPage() {
  // client side securing page
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") router.replace("/profile");

  if (status == "loading") <p>Loading Page</p>;

  return <AuthForm />;
}

export default AuthPage;
