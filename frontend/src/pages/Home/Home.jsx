import { useEffect } from "react";
import "./home.scss";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGetCurrentUser } from "../../hooks/auth";

const Home = () => {
  const { user } = useAuthContext();
  const { data, isPending, isError, isSuccess } = useGetCurrentUser();

  return <div className="home">Home</div>;
};

export default Home;
