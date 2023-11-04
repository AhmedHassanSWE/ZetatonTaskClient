import React from "react";
import axios from "axios";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase-config";
import LoadingButton from "./LoadingButton";

const AddPost = ({ setShow, setPosts }) => {
  const [inputs, setInputs] = React.useState({ title: "", content: "", imageUrl: "" });
  const [err, setErr] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newPosts = await axios.post("http://localhost:8080/posts", inputs);
      logEvent(analytics, "Post_added");
      setPosts(newPosts.data);
      setShow(false);
      // Handle any success actions here
    } catch (error) {
      setErr(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
            required
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
            required
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
          Add Post
        </LoadingButton>
      </form>
    </div>
  );
};

export default AddPost;
