import React, { useState } from 'react';
import { Modal } from '../../context/Modal.js';
import PlaylistForm from './PlaylistForm.js';

function PlaylistFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Playlist</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PlaylistForm />
        </Modal>
      )}
    </>
  );
}

export default PlaylistFormModal;
