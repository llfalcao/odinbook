import { useEffect, useState } from 'react';
import { fetchUserById } from '../api/users';

export default function Comments({ data }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getAuthors() {
      // Reduce database calls everytime there's a new comment
      // This should filter the ones that already have the author info stored in state.
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
  }, [data]);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id} className="comment">
          <div className="comment__profilePicture">
            <img src={comment.author.profile_pic} alt="" />
          </div>
          <div className="comment__bodyContainer">
            <span className="comment__author">{comment.author.full_name}</span>
            <p className="comment__body">{comment.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
