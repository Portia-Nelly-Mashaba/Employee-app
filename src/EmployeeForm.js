import React, { useState, useEffect } from 'react';
import EditModal from './EditModal';

function EmployeeForm() {
  const [array, setArray] = useState([]);
  const [inputdata, setInputdata] = useState({
    name: "",
    identity: "",
    phone: "",
    email: "",
    address: "",
    code: "",
    position: "",
    image: ""
  });
  const [nextId, setNextId] = useState(1);
  const [editData, setEditData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3030/employees')
      .then(res => res.json())
      .then(data => {
        setArray(data);
        if (data.length > 0) {
          setNextId(data[data.length - 1].id + 1);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  function data(e) {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  }

  function handleFileChange(e) {
    setInputdata({ ...inputdata, image: e.target.files[0] });
  }

  function addInputdata(e) {
    e.preventDefault();
    const newData = { ...inputdata, id: nextId };

    fetch('http://localhost:3030/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
      .then(res => res.json())
      .then(data => {
        setArray([...array, data]);
        setInputdata({ name: "", identity: "", phone: "", email: "", address: "", code: "", position: "", image: "" });
        setNextId(nextId + 1);
      })
      .catch(error => console.error('Error adding employee:', error));
  }

  function handleEdit(index) {
    setEditData({ ...array[index], index });
    setIsEditModalOpen(true);
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  }

  function saveEditData() {
    const updatedData = { ...editData };
    delete updatedData.index;

    console.log("Updating employee with data:", updatedData);

    fetch(`http://localhost:3030/employees/${editData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Server response:", data);
        const updatedArray = [...array];
        updatedArray[editData.index] = data;
        setArray(updatedArray);
        setIsEditModalOpen(false);
      })
      .catch(error => console.error('Error updating employee:', error));
  }

  function deleteEmployee(index) {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const employeeId = array[index].id;

      fetch(`http://localhost:3030/employees/${employeeId}`, {
        method: 'DELETE'
      })
        .then(() => {
          const updatedArray = [...array];
          updatedArray.splice(index, 1);
          setArray(updatedArray);
        })
        .catch(error => console.error('Error deleting employee:', error));
    }
  }

  return (
    <div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='card'>
            <div className='card-header'>
              <h4>New Employee Registration Form</h4>
            </div>
            <form className="row g-3 mt-3" onSubmit={addInputdata}>
              <div className="col-6">
                <label className="form-label">Full Name:</label>
                <input name='name' type="text" value={inputdata.name} className="form-control" placeholder="Maria Jones" onChange={data} />
              </div>
              <div className="col-6">
                <label className="form-label">Identity Number:</label>
                <input name='identity' type="number" value={inputdata.identity} className="form-control" placeholder="8502220852015" onChange={data} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Mobile Number:</label>
                <input name="phone" type='number' value={inputdata.phone} className="form-control" onChange={data} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email:</label>
                <input name="email" type="email" value={inputdata.email} className="form-control" onChange={data} />
              </div>
              <div className="col-10">
                <label className="form-label">Address:</label>
                <input name="address" type="text" value={inputdata.address} className="form-control" placeholder="123 Springbok street, Johannesburg" onChange={data} />
              </div>
              <div className="col-md-2">
                <label className="form-label">Code:</label>
                <input name='code' type='number' value={inputdata.code} className="form-control" placeholder='1632' onChange={data} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Select Position:</label>
                <select name='position' value={inputdata.position} className="form-select" onChange={data}>
                  <option value="">Select Position</option>
                  <option value="Manager">Manager</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Upload Picture</label>
                <input name="image" type="file" className="form-control" onChange={handleFileChange} />
              </div>
              <div className="col-12 mb-3 mt-3">
                <button type="submit" className="btn btn-primary">Add Employee</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>
                <h4>Employee List</h4>
                <form className="d-flex">
                  <input className="form-control form-control-sm me-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success btn-sm" type="submit">Search</button>
                </form>
              </div>
              <div className='card-body'>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Full Name</th>
                      <th>Phone</th>
                      <th>Email Address</th>
                      <th>Address</th>
                      <th>Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {array.map((item, i) => (
                      <tr key={i}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>{item.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditModal
        show={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onChange={handleEditChange}
        onSave={saveEditData}
        formData={editData}
      />
    </div>
  );
}

export default EmployeeForm;
