import React from "react";
import axios from "axios";
import { analytics } from "../firebase-config";
import { logEvent } from "firebase/analytics";
import LoadingButton from "./LoadingButton";

const EditPost = ({ post, setShow, setPosts }) => {
  const [inputs, setInputs] = React.useState({ title: post.title, content: post.content, imageUrl: post.imageUrl });
  const [err, setErr] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newPosts = await axios.put(`${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/${post.id}`, inputs);
      logEvent(analytics, "Post_edited");
      setPosts(newPosts.data);
      setShow(false);
    } catch (error) {
      setErr(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
          {err?.errors?.title && <div className="error-message">{err?.errors?.title}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={inputs.content}
            onChange={handleChange}
          />
          {err?.errors?.content && <div className="error-message">{err?.errors?.content}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            value={inputs.imageUrl}
            onChange={handleChange}
          />
          {err?.errors?.imageUrl && <div className="error-message">{err?.errors?.imageUrl}</div>}
        </div>
        <LoadingButton loading={loading} type="submit" className="btn btn-primary w-100">
          Update Post
        </LoadingButton>
      </form>
    </div>
  );
};

export default EditPost;
