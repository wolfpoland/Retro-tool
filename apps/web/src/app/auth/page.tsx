import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function Auth() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/main/workspace");
  }

  return (
    <h1>Auth</h1>
    // <main>
    //   {/*<WsProvider>*/}
    //   {/*  <ColumnGridComponent cards={cards ?? []} />*/}
    //   {/*  <StatusNavbarComponent position="LEFT" titles={leftStatus} />*/}
    //
    //   {/*  <StatusNavbarComponent position="RIGHT" titles={rightStatus} />*/}
    //   {/*</WsProvider>*/}
    // </main>
  );
}
