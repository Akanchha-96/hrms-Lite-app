from flask import Blueprint,request,jsonify
from db import get_db_connection
from utils.validator import validate_email,validate_fields

employee_bp=Blueprint('employees',__name__,url_prefix="/api")

@employee_bp.route('/employees',methods=['GET'])
def getEmployees():
    con=get_db_connection()
    cursor=con.cursor(dictionary=True)
    cursor.execute("SELECT * From employees")
    employees=cursor.fetchall()
    cursor.close()
    con.close()
    return jsonify(employees)

@employee_bp.route('/employees',methods=['POST'])
def addEmployees():
    try:

        data=request.json

        if not data:
            return jsonify({
                "error":"Invalid request body"
            }),400
        
        req=["employee_id","full_name","email","department"]
        missing=validate_fields(data,req)

        if missing:
            return jsonify({
                "error":f"Missing required fields:{','.join(missing)}"
            }),400
        
        if not validate_email(data["email"]):
            return jsonify({
                "error":"Invalid email format"
            }),400
        
        con=get_db_connection()
        cursor=con.cursor(dictionary=True)
        
        cursor.execute(
            "select * from employees where employee_id=%s or email=%s",(data["employee_id"],data["email"])
        )

        duplicate=cursor.fetchone()
        if duplicate:
            return jsonify({
                "error":"Employee with same ID or email already exists"
            }),409
        
        cursor.execute(
            """
            Insert into employees(employee_id,full_name,email,department)
            values(%s,%s,%s,%s)
            """,
            (
                data["employee_id"],
                data["full_name"],
                data["email"],
                data["department"]
            )
        )
        con.commit()
        return jsonify({"message":"Employee added"}),201
    
    except Exception as e:
        return jsonify({"error":str(e)}),409
    
    finally:
        cursor.close()
        con.close()

        

@employee_bp.route('/employees/<employee_id>',methods=['DELETE'])
def delEmployees(employee_id):
    try:

        con=get_db_connection()
        cursor=con.cursor(dictionary=True)

        cursor.execute(
            "Select * from employees where employee_id=%s",
            (employee_id,)
        )

        avail=cursor.fetchone()

        if not avail:
            return jsonify({
                "error":"Employee not found"
            }),404

        cursor.execute("Delete from employees where employee_id=%s",(employee_id,))
        con.commit()
        return jsonify({
            "message":"Employee Deleted successfully"
        }),200
    
    except Exception as e:
        return jsonify({
            "error":"Internal server error",
            "details":str(e)
        }),500
    finally:
        cursor.close()
        con.close()




    

