import os
from flask import Flask,jsonify
from flask_cors import CORS
from employee_routes import employee_bp
from attendance_routes import attendance_bp

app=Flask(__name__)
CORS(app, origins=["https://hrms-app-lite.netlify.app"], supports_credentials=True)

app.register_blueprint(employee_bp,)
app.register_blueprint(attendance_bp)

@app.route("/")
def home():
    return jsonify({
        "message": "HRMS API is running"
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error":"API not found!"
    }),404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        "error":"HTTP method not allowed!"
    }),405

@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "error":"Bad Request!"
    }),400

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({
        "error":"Internal Server Error!"
    }),500

@app.errorhandler(Exception)
def handle_exception(error):
    return jsonify({
        "error":"Unexpected error occurred",
        "details":str(error)
    }),500

if __name__=="__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)