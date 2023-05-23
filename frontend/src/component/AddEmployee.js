import React, { useEffect, useRef, useState } from 'react'

const AddEmployee = (props) => {
    const ref = useRef(null);
    const [employeeDetails, setEmployeeDetails] = useState({name:"", age:"", designation:"", experience:""});
    
    useEffect(()=>{
        if(props.modal){
            ref.current.click();
        }
    },)

    const onChange=(e)=>{
        setEmployeeDetails({...employeeDetails, [e.target.name]: e.target.value});
    }

    const onAddClick = async ()=>{
        await fetch('http://localhost:5000/employee/addEmployee', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name:employeeDetails.name,
                age: employeeDetails.age,
                designation: employeeDetails.designation,
                experience: employeeDetails.experience
            })
        })
        setEmployeeDetails({name:"", age:"", designation:"", experience:""});
    }

    return (
        <div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add New Employee</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} value={employeeDetails.name}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">Age</label>
                                    <input type="text" className="form-control" id="age" name='age' onChange={onChange}  value={employeeDetails.age}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="designation" className="form-label">Designation</label>
                                    <input type="text" className="form-control" id="designation" name='designation' onChange={onChange} value={employeeDetails.designation}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="experience" className="form-label">Experience</label>
                                    <input type="text" className="form-control" id="experience" name='experience' onChange={onChange} value={employeeDetails.experience}/>
                                </div>
                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onAddClick}>Add Employee</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee
