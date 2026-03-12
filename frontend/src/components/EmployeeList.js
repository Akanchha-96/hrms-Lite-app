import { deleteEmployees } from "../api";

function EmployeeList({employees,refresh}){
    return(
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(e=>(
                    <tr key={e.employee_id}>
                        <td>{e.employee_id}</td>
                        <td>{e.full_name}</td>
                        <td>{e.email}</td>
                        <td>{e.department}</td>
                        <td>
                            <button className="delete-btn" onClick={()=>{deleteEmployees(e.employee_id);refresh();}}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default EmployeeList;