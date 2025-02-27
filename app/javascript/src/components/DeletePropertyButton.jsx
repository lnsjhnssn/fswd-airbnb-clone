import React, { useState } from "react";
import { deleteProperty } from "../../utils/api";

const DeletePropertyButton = ({ propertyId, onDeleteSuccess }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteProperty = async () => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    setDeleteLoading(true);
    setError(null);

    try {
      await deleteProperty(propertyId);
      onDeleteSuccess(propertyId);
    } catch (error) {
      console.error("Error deleting property:", error);
      setError(error.message);
      alert(error.message || "Failed to delete property. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteProperty}
        disabled={deleteLoading}
        className="action-link btn-delete"
      >
        {deleteLoading ? "Deleting..." : "Delete"}
      </button>
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

export default DeletePropertyButton;
