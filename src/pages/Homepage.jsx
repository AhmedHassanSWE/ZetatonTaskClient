import PostsList from "../components/PostsList";
import { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

function Homepage() {
  const user = useContext(AppContext);
  return user?.accessToken ? (
    <PostsList user={user} />
  ) : (
    <div className="container text-center">
      <h2>CREATE ACCOUNT FIRST TO USE MY BLOG APP</h2>
      <Link to="/signup">
        <button className="btn btn-primary m-1">Sign Up</button>
      </Link>
      <Link to="/signin">
        <button className="btn btn-primary m-1">Sign In</button>
      </Link>
    </div>
  );
}

export default Homepage;
