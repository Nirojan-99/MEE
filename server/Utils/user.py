from flask_restful import Resource, reqparse
from db import initDB
from flask import jsonify, request
from bson import ObjectId


class User(Resource):
    client = initDB().MEE.users

    def get(self):
        data_list = []
        for document in self.client.find():
            document['_id'] = str(document['_id'])
            data_list.append(document)
            
        return {"data": data_list}, 200

    def post(self):
        self.client.insert_one(request.form.to_dict())

    def put(self):
        _id = request.form['id']
        data = {key: value for key, value in request.form.to_dict().items()
                if key != 'id'}
        query = {"_id": ObjectId(_id)}
        newvalues = {"$set":  data}
        self.client.update_one(query, newvalues)

    def delete(self):
        query = {"_id": ObjectId(request.args.get("id"))}
        self.client.delete_one(query)
