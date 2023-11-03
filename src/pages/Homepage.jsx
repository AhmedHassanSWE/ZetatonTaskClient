import PostsList from "../components/PostsList";
import { useContext } from "react";
import { AppContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

function Homepage() {
  const user = useContext(AppContext);
  const navigate = useNavigate();
  return user?.email ? (
    <PostsList user={user} />
  ) : (
    <div className="container text-center">
      <h2>CREATE ACCOUNT FIRST TO USE MY BLOG APP</h2>
      <Link to="/signup">
        <button className="btn btn-primary">CREATE ACCOUNT</button>
      </Link>
    </div>
  );
}

export default Homepage;
