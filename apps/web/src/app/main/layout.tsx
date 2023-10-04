import { NavbarComponent } from "@/components/navbar/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log("session", session);

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <NavbarComponent session={session}>{children}</NavbarComponent>;
}
