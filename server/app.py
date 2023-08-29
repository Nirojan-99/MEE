from flask import Flask, request, jsonify, redirect, url_for, request
from db import initDB
from flask_restful import Api, reqparse
from Utils.user import User

app = Flask(__name__)
api = Api(app)


api.add_resource(User, "/")
@app.route()
def call():
    
app.add_url_rule('/user/update_profile_picture', view_func=User.as_view('put_profile_picture'))


if __name__ == "__main__":
    app.run(debug=True)
