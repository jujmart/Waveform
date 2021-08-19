import React, { useState } from "react";
import { Modal } from "../../context/Modal.js";
import EditPlaylistForm from "./EditPlaylistForm.js";

function EditPlaylistFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Playlist</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPlaylistForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditPlaylistFormModal;
