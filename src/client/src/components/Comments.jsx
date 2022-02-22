import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserById } from '../api/users';

export default function Comments({ data }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getAuthors() {
      // Avoid doing a db call for all comments whenever there's a new one
      // This should filter those that already have the author info stored in state.
      const newComments = data.filter(
        (item) => !comments.some((comment) => comment._id === item._id),
      );

      for await (let comment of newComments) {
        const author = await fetchUserById(comment.user_id);
        comment = { ...comment, author };

        setComments((comments) => {
          if (comments.length === 0) return [comment];
          const index = comments.findIndex((el) => el._id === comment._id);
          if (index > -1) {
            comments[index] = comment;
            return comments;
          }
          return comments.concat(comment);
        });
      }
    }
    getAuthors();
  }, [data, comments]);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id} className="comment">
          <Link to={`/odinbook/u/${comment.author.username}`}>
            <div className="comment__profilePicture">
              <img src={comment.author.profile_pic} alt="" />
            </div>
          </Link>
          <div>
            <Link to={`/odinbook/u/${comment.author.username}`}>
              <span className="comment__author">
                {comment.author.full_name}
              </span>
            </Link>
            <p className="comment__body">{comment.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
