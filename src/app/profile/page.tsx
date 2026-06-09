import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signIn");
  }

  return <ProfileClient user={session.user} />;
}
