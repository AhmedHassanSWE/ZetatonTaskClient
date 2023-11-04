/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import EditPost from "./EditPost";
import AppModal from "./AppModal";
import AddPost from "./AddPost";
import { useContext } from "react";
import { AppContext } from "../App";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase-config";

const PostsList = () => {
  const user = useContext(AppContext);
  const [posts, setPosts] = React.useState([]);
  const [editingPost, setEditingPost] = React.useState({});
  const [showAdd, setShowAdd] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/posts", {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const handleEditClick = (post) => {
    setShowEdit(true);
    setEditingPost(post);
  };

  const handleDelete = async (id, postUserId) => {
    if (postUserId === user?.uid) {
      try {
        const response = await axios.delete(`http://localhost:8080/posts/${id}`);
        setPosts(response.data);
        logEvent(analytics, "Post_deleted");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    } else {
      alert("Unauthorized");
    }
  };
  return (
    <div className="container">
      <AppModal show={showAdd} setShow={setShowAdd} title="Add Post">
        <AddPost setShow={setShowAdd} setPosts={setPosts} />
      </AppModal>

      <AppModal show={showEdit} setShow={setShowEdit} title="Edit Post">
        <EditPost post={editingPost} setShow={setShowEdit} setPosts={setPosts} />
      </AppModal>

      <div className="flex-between">
        <h1>Posts</h1>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          Add Post
        </button>
      </div>
      <hr className="mb-4" />
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post?.id} className="list-group-item mb-4">
            <div className="flex-between">
              <h3>{post.title}</h3>
              {post.userId === user?.uid && (
                <div>
                  <button className="btn btn-primary m-1" onClick={() => handleEditClick(post)}>
                    Edit
                  </button>
                  <button className="btn btn-danger m-1" onClick={() => handleDelete(post?.id, post.userId)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
            <p>{post.content}</p>
            <img className="mt-2 w-50" src={post.imageUrl} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
