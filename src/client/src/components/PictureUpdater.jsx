import { useState } from 'react';
import { updateUser } from '../api/users';

export default function PictureUpdater({ user, close }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const isValidUrl = (string) => {
    let url;
    try {
      url = new URL(string);
    } catch (e) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  };

  const doesImageExist = (url) =>
    new Promise((resolve) => {
      setError('');
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      setError('Invalid URL format.');
      return;
    }
    const isImage = await doesImageExist(url);
    if (!isImage) {
      setError('URL does not link to an image.');
      return;
    }
    setError('');
    await updateUser(user._id, {
      profile_pic: url,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" onChange={(e) => setUrl(e.target.value)} />
        {error && <p>{error}</p>}
      </div>

      <div>
        <button type="button" onSubmit={handleSubmit}>
          Update
        </button>
        <button type="button" onClick={close}>
          Cancel
        </button>
      </div>
    </form>
  );
}
