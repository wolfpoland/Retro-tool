import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export async function checkSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).redirect("/auth/sign-in");
  }
}
