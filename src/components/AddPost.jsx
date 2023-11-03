import React from "react";
import axios from "axios";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase-config";

const AddPost = ({ setShow, setPosts }) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPosts = await axios.post("http://localhost:8080/posts", {
        title,
        content,
        imageUrl,
      });
      logEvent(analytics, "Post_added");
      setPosts(newPosts.data);
      setShow(false);
      // Handle any success actions here
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            required
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            Image URL
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
