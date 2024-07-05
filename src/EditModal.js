import React from 'react';

function EditModal({ show, onClose, onChange, onSave, formData }) {
  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    onChange({ ...formData, image: e.target.files[0] });
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Employee</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name:</label>
                <input name='name' type="text" value={formData.name} className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Identity Number:</label>
                <input name='identity' type="number" value={formData.identity} className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile Number:</label>
                <input name="phone" type='number' value={formData.phone} className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input name="email" type="email" value={formData.email} className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Address:</label>
                <input name="address" type="text" value={formData.address} className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Code:</label>
                <input name='code' type='number' value={formData.code} className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Select Position:</label>
                <select name='position' value={formData.position} className="form-select" onChange={handleChange}>
                  <option value="">Select Position</option>
                  <option value="Manager">Manager</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Picture</label>
                <input name="image" type="file" className="form-control" onChange={handleFileChange} />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={onSave}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
