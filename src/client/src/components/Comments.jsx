import { useEffect, useState } from 'react';
import { fetchUserById } from '../api/users';

export default function Comments({ comments }) {
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    async function getAuthors() {
      for await (let comment of comments) {
        const author = await fetchUserById(comment.user_id);
        comment = { ...comment, author };
        setCommentData((data) => {
          if (data.length === 0) {
            return [comment];
          }
          return data.concat(comment);
        });
      }
    }

    getAuthors(comments);
  }, [comments]);

  return (
    <ul>
      {commentData.map((comment) => (
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
