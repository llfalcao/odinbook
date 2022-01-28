import { useEffect, useState } from 'react';
import moment from 'moment';
import { likeApis } from '../api';
import { LikeIcon, CommentIcon } from '../components/Icons';

async function fetchLikes(post) {
  const api = likeApis.read;
  const response = await fetch(`${api.url}/${post}`, {
    headers: api.headers,
    method: api.method,
  });
  return await response.json();
}

async function toggleLike(post, isLiked) {
  const api = likeApis.create;
  const response = await fetch(`${api.url}/${post}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...api.headers,
    },
    method: api.method,
    body: JSON.stringify({ active: !isLiked }),
  });
  return response;
}

export default function Post({ postId, author, date, body }) {
  const [postData, setPostData] = useState({});

  useEffect(() => {
    // Fetch post likes
    (async () =>
      fetchLikes(postId).then((likes) =>
        setPostData((postData) => ({
          ...postData,
          isLiked: likes.find(({ user_id }) => user_id === author.id),
          likeCount: likes.length,
          likes,
        })),
      ))();
  }, [author.id, postId]);

  // Handle like button click
  async function onLike() {
    const response = await toggleLike(postId, postData.isLiked);
    if (response.status !== 204) return;

    let { isLiked, likeCount } = postData;
    setPostData((postData) => ({
      ...postData,
      isLiked: !isLiked,
      likeCount: isLiked ? likeCount - 1 : likeCount + 1,
    }));
  }

  return (
    <div className="post">
      <header className="post__header">
        <div className="post__profilePicture">
          <img src={author.profile_pic} alt="" />
        </div>
        <div className="post__info">
          <span className="post__author">{author.full_name}</span>
          <span className="post__date">{moment(date).fromNow()}</span>
        </div>
      </header>

      <p className="post__body">{body}</p>

      <div className="post__counters">
        <div className="post__counters--like">
          <LikeIcon />
          <span>{postData.likeCount}</span>
        </div>
      </div>

      <div className="post__btnWrapper">
        <hr className="hr" />
        <div className="post__btnContainer">
          <button
            type="button"
            className={`post__btn post__btn--like ${
              postData.isLiked ? 'post__btn--likeActive' : ''
            }`}
            onClick={onLike}
          >
            <LikeIcon />
            Like
          </button>
          <button type="button" className="post__btn post__btn--comment">
            <CommentIcon />
            Comment
          </button>
        </div>
        <hr className="hr" />

        <div className="post__commentFieldContainer">
          <div className="comment__profilePicture">
            <img src={author.profile_pic} alt="" />
          </div>
          <input
            className="comment__body"
            type="text"
            name="commentBody"
            placeholder="Write a comment..."
          />
        </div>
      </div>
    </div>
  );
}
