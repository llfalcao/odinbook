import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { LoadingIcon } from '../components/Icons';
import { postApis } from '../api';

async function createPost(post) {
  const api = postApis.create;
  const response = await fetch(api.url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...api.headers,
    },
    method: api.method,
    body: JSON.stringify(post),
  });
  return response;
}

export default function PostCreator({ user }) {
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  function onChange(e) {
    const { scrollHeight } = e.target;
    e.target.style.height = `${scrollHeight}px`;
    setPost((post) => ({ ...post, body: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const { status } = await createPost(post);
    if (status === 200) {
      navigate('/odinbook');
    }
  }

  if (!user) return <LoadingIcon />;

  // todo: return home arrow btn
  return (
    <div>
      <Header />

      <form className="post-form">
        <h1>Create post</h1>

        <textarea
          className="post-form__body"
          name="postBody"
          placeholder={`What's on your mind, ${user.first_name}?`}
          value={post.body}
          onChange={onChange}
        />

        <button
          type="submit"
          className="post-form__submitBtn"
          onClick={onSubmit}
          disabled={post.body === '' || !post.body}
        >
          Post
        </button>
      </form>
    </div>
  );
}
