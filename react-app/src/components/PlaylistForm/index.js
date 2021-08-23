import React, { useState } from 'react';
import { Modal } from '../../context/Modal.js';
import PlaylistForm from './PlaylistForm.js';

function PlaylistFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
		<>
			<p
				id="create-playlist_button"
				className="nav-bar_nav-links"
				onClick={() => setShowModal(true)}
			>
				<span className="material-icons">add_box&nbsp;&nbsp;</span> Add
				Playlist
			</p>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<PlaylistForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
  );
}

export default PlaylistFormModal;
