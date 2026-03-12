import {useState} from "react";
import { markAttendance } from "../api";

function AttendanceForm(){
    const [data,setData]=useState({
        employee_id:"",
        date:"",
        status:"Present"
    });
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await markAttendance(data);
    };
    return(
        <form onSubmit={handleSubmit}>
            <input placeholder="Employee ID" 
            onChange={e=>setData({...data,employee_id:e.target.value})}/>
            
            <input placeholder="Date" 
            onChange={e=>setData({...data,date:e.target.value})}/>

            <select 
            onChange={e=>setData({...data,status:e.target.value})}>
            <option>Present</option>
            <option>Absent</option>
            </select>
            

            <button>Mark Attendance</button>
        </form>
    )
}

export default AttendanceForm;