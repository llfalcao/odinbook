import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPost, updatePost } from '../api/posts';
import { BackArrowIcon } from '../components/Icons';
import Sidebar from '../components/Sidebar';
import { LoadingIcon } from '../components/Icons';
import Friendlist from '../components/Friendlist';

export default function PostEditor({ user }) {
  const navigate = useNavigate();
  const { post: id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    fetchPost(id).then((response) => {
      if (response.user_id !== user._id) {
        return navigate('/odinbook');
      }
      setPost(response);
    });
  }, [id, navigate, user]);

  const loadPreviousPage = () => window.history.back();

  const handleChange = (e) => setPost((p) => ({ ...p, body: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost(post).then((response) => {
      if (response.status === 200) {
        navigate(`/odinbook/p/${post._id}`);
      }
    });
  };

  if (!post) {
    return <LoadingIcon />;
  }

  return (
    <div>
      <Sidebar user={user} />
      <main>
        <form className="post-form" onSubmit={handleSubmit}>
          <h1>
            <button type="button" onClick={loadPreviousPage}>
              <BackArrowIcon />
            </button>
            Edit post
          </h1>

          <textarea
            className="post-form__body"
            name="postBody"
            value={post.body}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="post-form__submitBtn"
            disabled={post.body === '' || !post.body}
          >
            Post
          </button>
        </form>
      </main>
      <Friendlist username={user.username} />
    </div>
  );
}
