import { Link } from "react-router-dom";
import Button from "../../components/Button";

const Home = () => {
  return (
    <>
      <h1>this is home</h1>
      <Link to="/login">
        <Button variant="secondary">Log In</Button>
      </Link>
    </>
  );
};
export default Home;
