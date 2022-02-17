import { useState } from 'react';
import { updateUser } from '../api/users';

export default function PictureUpdater({ user, close, reload }) {
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
    reload();
  };

  return (
    <form onSubmit={handleSubmit} className="pictureForm">
      <div className="pictureForm__input">
        <input
          type="text"
          placeholder="Image url (e.g. https://imgur.com/...)"
          onChange={(e) => setUrl(e.target.value)}
        />
        {error && <p>{error}</p>}
      </div>

      <div className="pictureForm__btnContainer">
        <button type="button" className="update-btn" onClick={handleSubmit}>
          Update
        </button>
        <button type="button" className="cancel-btn" onClick={close}>
          Cancel
        </button>
      </div>
    </form>
  );
}
