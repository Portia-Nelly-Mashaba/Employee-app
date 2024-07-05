


import React from 'react'

function Modals() {
    return (
        <div>
        
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Edit
        </button>


        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Update {}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form class="row g-3 mt-3">

                <div class="col-6">
                    <label className="form-label">Full Name:</label>
                    <input name='name' type="text" class="form-control"  placeholder="Maria Jones"/>
                </div>

                <div class="col-6">
                    <label  className="form-label">Identity Number:</label>
                    <input name='id' type="text" class="form-control"  placeholder="8502220852015"/>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Mobile Number:</label>
                    <input type="phone" className="form-control" id="0781526666"/>
                </div>

                <div className="col-md-6">
                    <label for="inputEmail4" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="portia@gmail.com"/>
                </div>
                
                <div className="col-10">
                    <label className="form-label">Address:</label>
                    <input type="address" className="form-control"  placeholder="123 Springbok street, Johannesburg"/>
                </div>

                <div className="col-md-2">
                    <label className="form-label">Code:</label>
                    <input type="code" className="form-control" placeholder='1632'/>
                </div>
                
                <div className="col-md-6">
                    <label className="form-label">Select Position:</label>
                    <select className="form-select">
                    <option selected>Manager</option>
                    <option>Supervisor</option>
                    <option selected>Manager</option>
                    <option>Supervisor</option>
                    <option selected>Manager</option>
                    <option>Supervisor</option>
                    <option selected>Manager</option>
                    <option>Supervisor</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Upload Picture</label>
                    <input name="image" className="form-control" type="file" />
                </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Update & Save</button>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Modals
