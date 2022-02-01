import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { LikeIcon, CommentIcon } from '../components/Icons';
import { fetchLikes, toggleLike } from '../api/likes';
import { submitComment } from '../api/comments';

export default function Post({
  postId,
  author,
  date,
  body,
  linkToComments,
  reloadComments,
  children,
}) {
  const [postData, setPostData] = useState({});
  const [comment, setComment] = useState({ post: postId, text: '' });
  // Fetch post likes
  useEffect(
    () =>
      fetchLikes(postId).then((likes) =>
        setPostData((postData) => ({
          ...postData,
          isLiked: likes.find(({ user_id }) => user_id === author.id),
          likeCount: likes.length,
          likes,
        })),
      ),
    [author.id, postId],
  );

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

  // Comment input
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
    if (children) reloadComments();
    setComment({ ...comment, text: '' });
    document.querySelector('textarea:focus').removeAttribute('style');
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

      {linkToComments ? (
        <Link to={`p/${postId}`} className="view-comments">
          View comments
        </Link>
      ) : null}

      {children}
    </div>
  );
}
