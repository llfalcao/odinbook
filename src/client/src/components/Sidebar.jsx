import { Link } from 'react-router-dom';
import {
  EventsIcon,
  FriendsIcon,
  GroupIcon,
  MarketplaceIcon,
  MemoriesIcon,
  PagesIcon,
  SavedIcon,
  WatchIcon,
} from '../components/Icons';

export default function Sidebar({ user }) {
  return (
    <nav id="sidebar" className={window.innerWidth < 1200 ? 'hidden' : ''}>
      <Link to={`/odinbook/u/${user.username}`} className="sidebar__user">
        <div className="profilePicture profilePicture--small">
          <img src={user.profile_pic} alt="" />
        </div>
        <p>{user.full_name}</p>
      </Link>
      <Link to={`/odinbook/u/${user.username}/friends`}>
        <FriendsIcon />
        <p>Friends</p>
      </Link>
      <a href="##">
        <MarketplaceIcon />
        <p>Marketplace</p>
      </a>
      <a href="##">
        <GroupIcon />
        <p>Groups</p>
      </a>
      <a href="##">
        <WatchIcon />
        <p>Watch</p>
      </a>
      <a href="##">
        <MemoriesIcon />
        <p>Memories</p>
      </a>
      <a href="##">
        <SavedIcon />
        <p>Saved</p>
      </a>
      <a href="##">
        <PagesIcon />
        <p>Pages</p>
      </a>
      <a href="##">
        <EventsIcon />
        <p>Events</p>
      </a>
    </nav>
  );
}
