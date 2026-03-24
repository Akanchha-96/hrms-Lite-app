import {useState} from "react";
// import { addEmployees } from "../api";
import axios from "axios";

function EmployeeForm({refresh}){
    const [employeeId,setEmployeeId]=useState("");
    const [full_name,setfullname]=useState("");
    const [email,setEmail]=useState("");
    const [department,setDepartment]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await axios.post("https://hrms-lite-app-2.onrender.com/employees",{
            employee_id:employeeId,
            full_name:full_name,
            email:email,
            department:department
        });
        refresh();
    };
    return(
        <form className="form" onSubmit={handleSubmit}>
            <h3>Add Employee</h3>
            
            <input placeholder="Employee ID" 
            value={employeeId}
            onChange={(e)=>setEmployeeId(e.target.value)}/>
            
            <input placeholder="Full Name" 
            value={full_name}
            onChange={(e)=>setfullname(e.target.value)}/>

            <input placeholder="Email id" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>

            <input placeholder="Department" 
            onChange={(e)=>setDepartment(e.target.value)}/>

            <button type="submit">Add Employee</button>
        </form>
    );
}

export default EmployeeForm;