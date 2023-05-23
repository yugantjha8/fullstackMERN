import React, { useEffect, useRef, useState } from 'react'

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [eemployee, seteemployee] = useState({id:"", ename:"", eage:"", edesignation:"", eexperience:""});
    const ref = useRef(null);

    const getAllEmployees = async () => {
        const response = await fetch('http://localhost:5000/employee/getAllEmployee', {
            method: 'GET'
        });
        const json = await response.json();
        setEmployees(json);
        // console.log(employees);
    }

    const deleteEmployee = async (id) => {
        await fetch(`http://localhost:5000/employee/deleteEmp/${id}`, {
            method: 'DELETE'
        })
        getAllEmployees();
    }
    
    const onEditClick=(employee)=>{
        ref.current.click();
        seteemployee({
            id: employee._id,
            ename: employee.name,
            eage: employee.age,
            edesignation: employee.designation,
            eexperience: employee.experience
        })
    }
    
    const onChange=(e)=>{
        seteemployee({...eemployee, [e.target.name]: e.target.value});
    }

    const onUpdateClick= async ()=>{
        await fetch(`http://localhost:5000/employee/updateemployee/${eemployee.id}`, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name: eemployee.ename,
                age: eemployee.eage,
                designation: eemployee.edesignation,
                experience: eemployee.eexperience
            })
        })
        getAllEmployees();
    }

    useEffect(() => {
        getAllEmployees();
        // console.log(employees);
    }, [])

    return (
        <>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Employee Details</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="ename" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="ename" name='ename' onChange={onChange} value={eemployee.ename} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eage" className="form-label">Age</label>
                                    <input type="text" className="form-control" id="eage" name='eage' onChange={onChange} value={eemployee.eage} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edesignation" className="form-label">Designation</label>
                                    <input type="text" className="form-control" id="edesignation" name='edesignation' onChange={onChange} value={eemployee.edesignation} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eexperience" className="form-label">Experience</label>
                                    <input type="text" className="form-control" id="eexperience" name='eexperience' onChange={onChange} value={eemployee.eexperience} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onUpdateClick}>Update Employee</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='my-2 container'>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">S. no</th>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Experience</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => {
                            return <tr key={employee._id}>
                                <th scope="row">1</th>
                                <td>{employee.name}</td>
                                <td>{employee.age}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.experience}</td>
                                <td>
                                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{onEditClick(employee)}}></i>
                                    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => { deleteEmployee(employee._id) }}></i>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Employees
