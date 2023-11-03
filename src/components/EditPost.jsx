import React from "react";
import axios from "axios";
import { analytics } from "../firebase-config";
import { logEvent } from "firebase/analytics";

const EditPost = ({ post, setShow, setPosts }) => {
  const [title, setTitle] = React.useState(post.title);
  const [content, setContent] = React.useState(post.content);
  const [imageUrl, setImageUrl] = React.useState(post.imageUrl);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const newPosts = await axios.put(`http://localhost:8080/posts/${post.id}`, {
        title,
        content,
        imageUrl,
      });
      logEvent(analytics, "Post_edited");
      setPosts(newPosts.data);
      setShow(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
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
            type="text"
            className="form-control"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
