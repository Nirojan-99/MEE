from flask import Flask, request, jsonify, redirect, url_for, request, send_from_directory
from db import initDB
from flask_restful import Api, reqparse
from Utils.user import User
from db import initDB
from bson import ObjectId
from datetime import datetime
from Utils.token import generate_token, decode_token
from flask_cors import CORS
from Utils.auth import authenticate

# global variable
app = Flask(__name__)
CORS(app)
api = Api(app)
users = initDB().MEE.users
posts = initDB().MEE.posts
productProfile = initDB().MEE.productProfile
userProfile = initDB().MEE.userProfile
imageUploadPath = "./Uploads/"


# config
app.config['SECRET_KEY'] = 'MEE-auth'


# user resource

# api.add_resource(User, "/api/users")

# update user


@app.route('/api/users', methods=['PUT'])
def updateUser():
    userID = authenticate(request, app)
    if userID is False:
        return {"auth": False}, 404

    data = request.form.to_dict()
    query = {"_id": ObjectId(userID)}
    newValues = {"$set":  data}
    users.update_one(query, newValues)

    return {"ack": True}, 200

# get one user


@app.route('/api/users/<id>', methods=['GET'])
def getUser(id):
    userID = authenticate(request, app)
    if userID is False:
        return {"auth": False}, 404

    userData = users.find_one({"_id": ObjectId(id)})

    if (userData is None):
        return {"ack": False}, 400

    print(userData)
    userData['_id'] = str(userData['_id'])

    return {"data": userData}, 200

# register endpoint


@app.route('/api/auth/register', methods=['POST'])
def register():
    print(request.form.to_dict())
    res = users.insert_one(request.form.to_dict())

    if res.inserted_id:
        token = generate_token(str(res.inserted_id), app)

        return {"token": token, "userID": str(res.inserted_id)}, 200
    else:
        return {"ack": False}, 404

# login endpoint


@app.route('/api/auth/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    res = users.find_one({"email": email, "password": password})

    if res and res.get("email") == email:
        token = generate_token(str(res.get("_id")), app)

        return {"token": token, "userID": str(res.get("_id"))}
    else:
        return {"auth": False}, 404


# make recommendation list


@app.route('/api/recommend', methods=['GET'])
def createRecommendation():
    userID = authenticate(request, app)
    if userID is False:
        return {"auth": False}, 404

    res = userProfile.find_one({"_id": ObjectId(userID)})

    resData = productProfile.find({})  # TODO

    data = posts.find({})  # TODO

    data_list = []
    for document in data:
        document['_id'] = str(document['_id'])
        data_list.append(document)

    return {"data": data_list}  # TODO

# get latest posts


@app.route('/api/posts', methods=['GET'])
def getLatestPosts():
    userID = authenticate(request, app)
    if userID is False:
        return {"auth": False}, 404

    data = posts.find().sort('date', -1).limit(20)

    data_list = []
    for document in data:
        document['_id'] = str(document['_id'])
        data_list.append(document)

    return {"data": data_list}, 200

# interact with product/click


@app.route('/api/interact', methods=['POST'])
def interactWithProduct():
    userID = authenticate(request, app)
    if userID is False:
        return {"auth": False}, 404

    productID = request.form['productID']

    data = productProfile.find_one({"_id": ObjectId(productID)})

    userProfile.update_one({"_id": ObjectId(userID)}, {
                           "$push": {}}, {"upsert": True})  # TODO

    return {"ack": True}, 200

# like the post


# @app.route('/api/posts/like', methods=['POST'])
# def likePost():
#     userID = authenticate(request, app)
#     if userID is False:
#         return {"auth": False}, 404

#     productID = request.form['productID']

#     data = productProfile.find_one({"_id": ObjectId(productID)})

#     userProfile.update_one({"_id": ObjectId(userID)}, {
#                            "$push": {}}, {"upsert": True})  # TODO

#     return {"ack": True}, 200

# search product


@app.route('/api/search', methods=['POST'])
def searchProduct():
    userID = authenticate(request, app)
    if userID is False:
        return {"auth": False}, 404

    query = request.form['query']

    extractedKeyWords = []  # nirojan model

    res = productProfile.find_one()  # TODO
    res = posts.find_one()  # TODO

    userProfile.update_one({"_id": ObjectId(userID)}, {
                           "$push": {}}, {"upsert": True})  # TODO

    return {"date": res}, 200


# next word prediction


@app.route('/api/word-prediction', methods=['POST'])
def predictNextWord():
    arrayOfWords = request.form['previousWords']
    # abiramy model
    return {"nextWord": ""}

# add comment


@app.route('/api/sentiment-analysis', methods=['POST'])
def addComment():
    userID = authenticate(request, app)
    if userID is False:
        return {"auth": False}, 404

    comment = request.form['comment']
    postID = request.form['postID']

    today = datetime.now()
    date = today.strftime("%m/%d/%y")
    time = today.strftime("%H:%M:%S")

    sentiment = ""  # lavaniya model

    userName = users.find_one({"_id": ObjectId(userID)})['name']

    posts.update_one({"_id": ObjectId(postID)}, {"$push":  {"comments": {
                     "comment": comment, "sentiment": sentiment, "userName": userName, "date": date, "time": time}}})

    res = posts.find_one({"_id": ObjectId(postID)})

    userProfile.update_one({"_id": ObjectId(userID)}, {
                           "$push": {}}, {"upsert": True})  # TODO

    return {"ack": True}, 200

# save post


@app.route('/api/posts', methods=['POST'])
def savePost():
    userID = authenticate(request, app)
    if userID is False:
        return {"auth": False}, 404

    description = request.form.get('description', "")

    extractedKeyWords = []  # nirojan model

    today = datetime.now()
    date = today.strftime("%m/%d/%y")
    time = today.strftime("%H:%M:%S")

    posts.insert_one({"url": " ", "description": description,
                     "date": date, "time": time, "userID": userID})

    productProfile.insert_one({})  # TODO

    return {"ack": True}, 200

# save post by image


@app.route('/api/posts/image', methods=['POST'])
def trackImage():
    userID = authenticate(request, app)
    if userID is False:
        return {"auth": False}, 404

    image = request.files['image']
    description = request.form.get('description', "")

    image.save(imageUploadPath+image.filename)

    detectedSentence = ""  # hithushi model
    extractedKeyWords = []  # nirojan model

    today = datetime.now()
    date = today.strftime("%m/%d/%y")
    time = today.strftime("%H:%M:%S")

    posts.insert_one({"url": "api/images/"+image.filename,
                     "description": description, "date": date, "time": time, "userID": userID})

    productProfile.insert_one({})  # TODO

    return {"ack": True}, 200


@app.route('/api/posts', methods=['POST'])
def newPost():
    pass

# serve image statically


@app.route('/api/images/<image_name>', methods=['GET'])
def serve_image(image_name):
    return send_from_directory(imageUploadPath, image_name)


if __name__ == "__main__":
    app.run(debug=True)
