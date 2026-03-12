import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";

function Attendance(){
    return(
        <div style={{padding:"20px"}}>
            <h2>Attendance Portal</h2>
            <AttendanceForm/>
            <AttendanceList/>
        </div>
    );
}

export default Attendance;