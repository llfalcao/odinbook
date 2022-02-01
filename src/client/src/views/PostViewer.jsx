import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Post from '../components/Post';
import { LoadingIcon } from '../components/Icons';
import { fetchPost } from '../api/posts';
import { fetchUserById } from '../api/users';
import { fetchComments } from '../api/comments';
import Comments from '../components/Comments';

export default function PostViewer() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const url = window.location.href.split('/');
    const postId = url[url.length - 1];
    (async () => {
      const postData = await fetchPost(postId);
      const author = await fetchUserById(postData.user_id);
      const comments = await fetchComments(postId);

      postData.author = author;
      postData.comments = comments;
      setPost({ ...postData });
    })();
  }, []);

  return (
    <div>
      <Header />
      <main>
        {post ? (
          <Post
            postId={post._id}
            author={post.author}
            date={post.created_at}
            body={post.body}
            comments={post.comments}
          >
            <Comments comments={post.comments} />
          </Post>
        ) : (
          <LoadingIcon />
        )}
      </main>
    </div>
  );
}
