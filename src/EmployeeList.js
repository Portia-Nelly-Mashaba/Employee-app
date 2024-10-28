import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditModal from './EditModal';



function EmployeeList() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetch('http://localhost:8001/employees')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        if (data && data.length > 0) {
          setColumns(Object.keys(data[0]));
          setRecords(data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const openEditModal = (employeeId) => {
    const employee = records.find(record => record.id === employeeId);
    setEditedEmployee(employee);
    setSelectedEmployeeId(employeeId);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditedEmployee(null);
    setSelectedEmployeeId(null);
  };
  const saveChanges = () => {
    if (editedEmployee) {
      // Update records state with edited employee
      const updatedRecords = records.map(record =>
        record.id === editedEmployee.id ? editedEmployee : record
      );
      setRecords(updatedRecords);
      console.log('Updated records:', updatedRecords);
      // Perform PUT request to update backend
      fetch(`http://localhost:8001/employees/${editedEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedEmployee)
      })
        .then(res => res.json())
        .then(updatedEmployee => {
          console.log('Employee updated successfully:', updatedEmployee);
        })
        .catch(error => console.error('Error updating employee:', error));
      // Close the modal after saving changes
      closeEditModal();
    }
  };
  const deleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      fetch(`http://localhost:8001/employees/${employeeId}`, {
        method: 'DELETE'
      })
        .then(() => {
          // Update records state by filtering out the deleted employee
          const updatedRecords = records.filter(record => record.id !== employeeId);
          setRecords(updatedRecords);
          console.log('Employee deleted successfully:', employeeId);
        })
        .catch(error => console.error('Error deleting employee:', error));
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredRecords = records.filter(record =>
    Object.values(record).some(field =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-header'>
              <h4>
                Employee List
                <Link to='/add' className='btn btn-primary float-end'>
                  Add New Employee
                </Link>
              </h4>
              <form className="d-flex mb-3 mt-5" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search employee"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-outline-success" type="submit" onClick={() => setSearchTerm('')}>
                  Clear
                </button>
              </form>
            </div>
            <div className='card-body'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th key={index}>{column}</th>
                    ))}
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr key={index}>
                      {columns.map((column, colIndex) => (
                        <td key={colIndex}>{record[column]}</td>
                      ))}
                      <td>
                        <button className='btn btn-success' onClick={() => openEditModal(record.id)}>Edit</button>
                      </td>
                      <td>
                        <button className='btn btn-danger' onClick={() => deleteEmployee(record.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <EditModal
        show={showEditModal}
        onClose={closeEditModal}
        onChange={setEditedEmployee}
        onSave={saveChanges}
        formData={editedEmployee}
      />
    </div>
  );
}
export default EmployeeList;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Modals from './Modals';

// function EmployeeList() {
//   const [columns, setColumns] = useState([]);
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3030/employees')
//       .then(res => res.json())
//       .then(data => {
//         if (data && data.length > 0) {
//           setColumns(Object.keys(data[0]));
//           setRecords(data);
//         }
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div className='container mt-5'>
//       <div className='row'>
//         <div className='col-md-12'>
//           <div className='card'>
//             <div className='card-header'>
//               <h4>
//                 Employee List
//                 <Link to='/add' className='btn btn-primary float-end'>
//                   Add New Employee
//                 </Link>
//               </h4>
//               <form className="d-flex" role="search">
//                 <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: 'auto', marginLeft: 'auto' }} />
//                 <button className="btn btn-outline-success" type="submit">Search</button>
//               </form>
//             </div>
//             <div className='card-body'>
//               <table className='table table-striped'>
//                 <thead>
//                   <tr>
//                     {columns.map((column, index) => (
//                       <th key={index}>{column}</th>
//                     ))}
//                     <th>Edit</th>
//                     <th>Delete</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {records.map((record, index) => (
//                     <tr key={index}>
//                       {columns.map((column, colIndex) => (
//                         <td key={colIndex}>{record[column]}</td>
//                       ))}
//                       <td>
//                         <Link to={`/edit/${record.id}`} className='btn btn-success'>Edit</Link>
//                       </td>
//                       <td>
//                         <button className='btn btn-danger'>Delete</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
       
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmployeeList;
