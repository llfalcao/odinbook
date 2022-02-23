import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLikes, toggleLike } from '../api/likes';
import { submitComment } from '../api/comments';
import {
  LikeIcon,
  CommentIcon,
  MenuDotsIcon,
  LinkIcon,
  EditIcon,
  TrashIcon,
} from '../components/Icons';
import { deletePost } from '../api/posts';

export default function Post({
  postId,
  author,
  date,
  body,
  currentUser,
  linkToComments,
  reloadComments,
  children,
}) {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({});
  const [comment, setComment] = useState({ post: postId, text: '' });

  // Fetch post likes
  useEffect(() => {
    fetchLikes(postId).then((likes) =>
      setPostData((postData) => ({
        ...postData,
        isLiked: likes.find(({ user_id }) => user_id === currentUser._id),
        likeCount: likes.length,
        likes,
      })),
    );
  }, [currentUser._id, author.id, postId]);

  // Handle like button click
  const onLike = async () => {
    const response = await toggleLike(postId, postData.isLiked);
    if (response.status !== 204) return;
    let { isLiked, likeCount } = postData;
    setPostData((postData) => ({
      ...postData,
      isLiked: !isLiked,
      likeCount: isLiked ? likeCount - 1 : likeCount + 1,
    }));
  };

  // Comment input
  const onChange = (e) => {
    if (e.target.value === '') {
      e.target.removeAttribute('style');
    } else {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
    setComment({ ...comment, text: e.target.value });
  };

  const handleCommentSubmission = async () => {
    await submitComment(comment);
    if (children) reloadComments();
    setComment({ ...comment, text: '' });
    document.querySelector('textarea:focus').removeAttribute('style');
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmission();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (comment.text === '') return;
    handleCommentSubmission();
  };

  const toggleMenu = (e) => {
    const menu = e.target.closest('.post__menu');
    const container = menu.querySelector('.post__menuContainer');
    container.classList.toggle('show-menu');
  };

  const toggleDeleteSubmenu = (e) => {
    const btn = e.target.closest('.post__delete');
    const submenu = btn.querySelector('.post__delete--submenu');
    submenu.classList.toggle('delete-options');
  };

  const handlePostDelete = (id) => {
    deletePost(id).then((response) => {
      if (response.status === 200) {
        navigate('/');
      }
    });
  };

  const hideMenu = (e) => {
    const menu = e.target.closest('.post__menu');
    const container = menu.querySelector('.post__menuContainer');
    container.classList.remove('show-menu');
  };

  return (
    <div className="post">
      <header className="post__header">
        <div>
          <Link
            to={`/odinbook/u/${author.username}`}
            className="post__profilePicture"
          >
            <img src={author.profile_pic} alt="" />
          </Link>
          <div className="post__info">
            <Link
              to={`/odinbook/u/${author.username}`}
              className="post__author"
            >
              {author.full_name}
            </Link>
            <span className="post__date">{moment(date).fromNow()}</span>
          </div>
        </div>

        <div className="post__menu">
          <button type="button" className="post__menuBtn" onClick={toggleMenu}>
            <MenuDotsIcon />
          </button>
          <div className="post__menuContainer">
            <div
              className="post__menuItem"
              onClick={(e) => {
                navigator.clipboard.writeText(
                  `${window.location.hostname}/odinbook/p/${postId}`,
                );
                hideMenu(e);
              }}
            >
              <LinkIcon />
              Copy Link
            </div>
            {currentUser._id === author._id && (
              <>
                <Link
                  to={`/odinbook/p/${postId}/edit`}
                  className="post__menuItem"
                >
                  <EditIcon />
                  Edit
                </Link>

                <div className="post__menuItem post__delete">
                  <div onClick={toggleDeleteSubmenu}>
                    <TrashIcon />
                    Delete
                  </div>
                  <div className="post__delete--submenu">
                    <p>Are you sure?</p>
                    <div>
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => handlePostDelete(postId)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={hideMenu}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
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
          <button
            type="button"
            className="post__btn post__btn--comment"
            onClick={() => document.querySelector('textarea').focus()}
          >
            <CommentIcon />
            Comment
          </button>
        </div>
        <hr className="hr" />
      </div>

      <form className="post__commentFieldContainer" onSubmit={onSubmit}>
        <div className="comment__profilePicture">
          <img src={currentUser.profile_pic} alt="" />
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
            aria-label="Submit comment"
            hidden={!comment.text}
          >
            Press enter to send
          </button>
        </div>
      </form>

      {linkToComments ? (
        <Link to={`/odinbook/p/${postId}`} className="view-comments">
          View comments
        </Link>
      ) : null}

      {children}
    </div>
  );
}
