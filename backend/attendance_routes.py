from flask import Blueprint,request,jsonify
from db import get_db_connection
from utils.validator import validate_email,validate_fields

attendance_bp=Blueprint('attendance',__name__,url_prefix="/api")

@attendance_bp.route('/attendance',methods=['POST'])
def markAttendance():
    try:

        data=request.json
        if not data:
            return jsonify({
                "error":"Invalid body"
            }),400
        req=["employee_id","date","status"]
        missing=validate_fields(data,req)
        if missing:
            return jsonify({
                "error":f"missing required fields:{','.join(missing)}"
            }),400
        
        if data["status"] not in ["Present","Absent"]:
            return jsonify({
                "error":"Status must be Present or Absent"
            }),400

        con=get_db_connection()
        cursor=con.cursor()

        cursor.execute(
            "select * from employees where employee_id=%s",
            (data["employee_id"],)
        )

        avail=cursor.fetchone()
        if not avail:
            return jsonify({
                "error":"Employee does not exist"
            }),404
        
        cursor.execute(
            """Insert into attendance(employee_id,date,status) 
            VALUES(%s,%s,%s)
            """,
            (
                data["employee_id"],
                data["date"],
                data["status"]
            )
        )
        con.commit()

        return jsonify({
            "message":"Attendance marked"
        }),201
    
    except Exception as e:
        return jsonify({
            "error":"Internal Server error",
            "details":str(e)
        }),500
    
    finally:
        cursor.close()
        con.close()

@attendance_bp.route('/attendance/<employee_id>',methods=['GET'])
def getAttendance(employee_id):
    con=get_db_connection()
    cursor=con.cursor(dictionary=True)

    cursor.execute(
        "Select * from attendance where employee_id=%s",(employee_id,)
    )

    record=cursor.fetchall()
    cursor.close()
    con.close()

    return jsonify(record)