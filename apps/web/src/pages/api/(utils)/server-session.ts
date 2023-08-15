import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiResponse } from "next";
import { redirect } from "next/navigation";

export async function checkSession(res: NextApiResponse) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      redirect("/auth/sign-in");
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    redirect("/auth/sign-in");
  }
}
