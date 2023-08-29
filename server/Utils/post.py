from flask_restful import Resource, reqparse
from db import initDB
from flask import jsonify, request
from bson import ObjectId


class Post(Resource):
    client = initDB().MEE.users

    def get(self):
        pass

    def post(self):
        pass

    def put(self):
        pass

    def delete(self):
        pass
