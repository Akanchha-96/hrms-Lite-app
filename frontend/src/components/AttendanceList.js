import {useState} from "react";
import { getAttendance } from "../api";

function AttendanceList(){
    const [employeeId,setEmployeeId]=useState("");
    const [records,setRecords]=useState([]);

    const getattend=async()=>{
        if(!employeeId){
            alert("Please enter Employee Id");
            return;
        }

        try{
            const response=await getAttendance(employeeId);
            setRecords(response.data);
        }catch(err){
            console.error(err);
            alert("Failed to fetch the attendance detail");
        }
    };

    return(
        <div style={{marginTop:"20px"}}>
            <h2>View Attendance</h2>

            <input placeholder="Enter Employee Id" value={employeeId} onChange={(e)=>setEmployeeId(e.target.value)}/>

            <button onClick={getattend} style={{marginLeft:"10px"}}>Get Attendance</button>
            <table border="1" style={{marginTop:"20px", width:"100%"}}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {records.length===0?(
                        <tr>
                            <td colSpan="2">No records found</td>
                        </tr>
                    ):(
                        records.map((r,index)=>(
                            <tr key={index}>
                                <td>{r.date}</td>
                                <td>{r.status}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

        </div>
    );
}

export default AttendanceList;