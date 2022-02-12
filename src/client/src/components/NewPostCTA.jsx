import { Link } from 'react-router-dom';

export default function NewPostCTA({ user }) {
  return (
    <div className="new-post__form">
      <div className="new-post__profilePicture">
        <img src={user.profile_pic} alt="" />
      </div>
      <Link to="/odinbook/new-post" className="new-post__link">
        {`What's on your mind, ${user.first_name}?`}
      </Link>
    </div>
  );
}
