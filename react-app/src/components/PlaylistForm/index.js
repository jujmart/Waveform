import React, { useState } from 'react';
import { Modal } from '../../context/Modal.js';
import PlaylistForm from './PlaylistForm.js';

function PlaylistFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id='create-playlist_div'>
      <button id='create-playlist_button' onClick={() => setShowModal(true)}>Create Playlist</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PlaylistForm setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default PlaylistFormModal;
