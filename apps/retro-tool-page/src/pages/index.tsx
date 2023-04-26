import { type NextPage } from "next";
import { api } from "../utils/api";
import { ColumnGrid } from "../componets/navbar/column-grid";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <ColumnGrid></ColumnGrid>
    </>
  );
};

export default Home;
