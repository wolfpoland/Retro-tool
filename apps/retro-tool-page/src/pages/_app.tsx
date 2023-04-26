import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import { Navbar } from "../componets/navbar/navbar";
import { Content } from "../componets/content";
import { api } from "../utils/api";



const MyApp: AppType<{ session: Session | null }> = ({
                                                       Component,
                                                       pageProps: { session, ...pageProps }
                                                     }) => {
  return (
    <SessionProvider session={session}>
      <Navbar>
        <Content>
          <Component {...pageProps} />
        </Content>
      </Navbar>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
