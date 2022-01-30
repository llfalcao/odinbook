import { useEffect, useState } from 'react';
import moment from 'moment';
import { commentApis, likeApis } from '../api';
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
  return await fetch(`${api.url}/${post}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...api.headers,
    },
    method: api.method,
    body: JSON.stringify({ active: !isLiked }),
  });
}

async function submitComment(comment) {
  const api = commentApis.create;
  return await fetch(`${api.url}?post=${comment.post}`, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...api.headers,
    },
    body: JSON.stringify(comment),
  });
}

export default function Post({ postId, author, date, body }) {
  const [postData, setPostData] = useState({});
  const [comment, setComment] = useState({ post: postId, text: '' });

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

  function onChange(e) {
    if (e.target.value === '') {
      e.target.removeAttribute('style');
    } else {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
    setComment({ ...comment, text: e.target.value });
  }

  async function handleCommentSubmission() {
    await submitComment(comment);
    setComment({ ...comment, text: '' });
  }

  function onEnterPress(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmission();
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    if (comment.text === '') return;
    handleCommentSubmission();
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
      </div>

      <form className="post__commentFieldContainer">
        <div className="comment__profilePicture">
          <img src={author.profile_pic} alt="" />
        </div>
        <div className="comment__textareaContainer">
          <textarea
            className="comment__textarea"
            placeholder="Write a comment..."
            onKeyDown={onEnterPress}
            onChange={onChange}
            value={comment.text}
          />
          <button
            className="comment__sendBtn"
            type="submit"
            onClick={onSubmit}
            aria-label="Submit comment"
            hidden={!comment.text}
          >
            Press enter to send
          </button>
        </div>
      </form>
    </div>
  );
}
