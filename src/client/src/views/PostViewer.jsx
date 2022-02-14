import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Post from '../components/Post';
import { LoadingIcon } from '../components/Icons';
import { fetchPost } from '../api/posts';
import { fetchUserById } from '../api/users';
import { fetchComments } from '../api/comments';
import { getCurrentUser } from '../api/auth';
import Comments from '../components/Comments';

export default function PostViewer() {
  const url = window.location.href.split('/');
  const postId = url[url.length - 1];
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    (async () => {
      const postData = await fetchPost(postId);
      const author = await fetchUserById(postData.user_id);
      const comments = await fetchComments(postId);
      setCurrentUser(await getCurrentUser());

      postData.author = author;
      postData.comments = comments;
      setPost({ ...postData });
    })();
  }, [postId]);

  async function reloadComments() {
    const comments = await fetchComments(postId);
    setPost({ ...post, comments });
  }

  return (
    <div>
      <Header user={currentUser} />
      <main>
        {post ? (
          <Post
            postId={post._id}
            author={post.author}
            date={post.created_at}
            body={post.body}
            comments={post.comments}
            reloadComments={reloadComments}
          >
            <Comments data={post.comments} />
          </Post>
        ) : (
          <LoadingIcon />
        )}
      </main>
    </div>
  );
}
