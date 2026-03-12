import axios from "axios";

const API= axios.create({
    baseURL:"http://localhost:5000/api"
});

export const getEmployees=()=> API.get("/employees");
export const addEmployees=(data)=> API.post("/employees",data);
export const deleteEmployees=(id)=> API.delete(`/employees/${id}`);
export const markAttendance=(data)=> API.post("/attendance",data);
export const getAttendance=(id)=> API.get(`/attendance/${id}`);
