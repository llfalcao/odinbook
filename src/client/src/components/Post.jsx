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
    </div>
  );
}
