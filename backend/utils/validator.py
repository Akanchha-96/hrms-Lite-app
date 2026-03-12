import re

def validate_fields(data,fields):
    missing=[]

    for f in fields:
        if not data.get(f):
            missing.append(f)
    return missing

def validate_email(email):
    pattern=r'^[\w\.-]+@[\w\.-]+\.\w+$'

    if not re.match(pattern,email):
        return False
    return True