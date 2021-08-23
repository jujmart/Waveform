import React, { useState } from "react";
import { Modal } from "../../context/Modal.js";
import EditPlaylistForm from "./EditPlaylistForm.js";

function EditPlaylistFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <p onClick={() => setShowModal(true)}>Edit Playlist</p>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPlaylistForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditPlaylistFormModal;
