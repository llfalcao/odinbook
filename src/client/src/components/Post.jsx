import { useEffect, useState } from 'react';
// import { Interval, DateTime } from 'luxon';
import moment from 'moment';

export default function Post({ author, date, body }) {
  const [time, setTime] = useState('...');

  useEffect(() => {
    const interval = moment(date).fromNow();
    setTime(interval);
  }, [date]);

  return (
    <div className="post">
      <header className="post__header">
        <div className="post__profilePicture">
          <img src={author.profile_pic} alt="" />
        </div>
        <div className="post__info">
          <span className="post__author">{author.full_name}</span>
          <span className="post__date">{time}</span>
        </div>
      </header>

      <p className="post__body">{body}</p>
      <div className="post__btnWrapper">
        <hr className="hr" />
        <div className="post__btnContainer">
          <button type="button" className="post__btn post__btn--like">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-thumbs-up"
            >
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            Like
          </button>
          <button type="button" className="post__btn post__btn--comment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-message-circle"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
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
            name="body"
            placeholder={`What's on your mind, ${author.first_name}?`}
          />
        </div>
      </div>
    </div>
  );
}
