import { useEffect,useState } from "react";
import { getEmployees } from "../api";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

function Employees(){
    const [employees,setEmployees]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");
    
    const loadEmployees=async()=>{
        try{
            setLoading(true);
            const response=await axios.get("https://hrms-lite-app-2.onrender.com/employees");
            setEmployees(response.data);
            setError("");
        }catch(err){
            setError("Failed to load employees");
        }finally{
            setLoading(false);
        }
        
    };

    useEffect(()=>{
        loadEmployees();
    },[]);

    return(
        <div>
            <h2>Employees</h2>
            <EmployeeForm refresh={loadEmployees}/>

            {loading && <p>Loading Employees...</p>}
            {error && <p style={{color:"red"}}>{error}</p>}

            {!loading && employees.length===0 && (
                <p>No Employees Found</p>
            )}
            <EmployeeList employees={employees} refresh={loadEmployees}/>
        </div>
    )
}

export default Employees;