import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>this is home</h1>
      <Link to="/login">
        <button>Log In</button>
      </Link>
    </>
  );
};
export default Home;
