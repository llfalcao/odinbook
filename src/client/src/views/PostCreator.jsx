import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { BackArrowIcon, LoadingIcon } from '../components/Icons';
import { createPost } from '../api/posts';

export default function PostCreator({ user }) {
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  function onChange(e) {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setPost((post) => ({ ...post, body: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const { status } = await createPost(post);
    if (status === 200) {
      navigate('/odinbook');
    }
  }

  const loadPreviousPage = () => {
    window.history.back();
  };

  if (!user) return <LoadingIcon />;

  return (
    <div>
      <Header user={user} />

      <form className="post-form">
        <h1>
          <button type="button" onClick={loadPreviousPage}>
            <BackArrowIcon />
          </button>
          Create post
        </h1>

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
