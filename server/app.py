from flask import Flask, request, jsonify, redirect, url_for, request, send_from_directory
from db import initDB
from flask_restful import Api, reqparse
from Utils.user import User
from db import initDB
from bson import ObjectId
from datetime import datetime

# global variable
app = Flask(__name__)
api = Api(app)
users = initDB().MEE.users
posts = initDB().MEE.posts
productProfile = initDB().MEE.productProfile
userProfile = initDB().MEE.userProfile
imageUploadPath = "./Uploads/"


api.add_resource(User, "/users")

# make recommendation list


@app.route('/api/recommend', methods=['GET'])
def createRecommendation():
    userID = request.form['userID']

    res = userProfile.find_one({"_id": ObjectId(userID)})

    resData = productProfile.find({})  # TODO

    data = posts.find({})  # TODO

    return {"data": data}  # TODO

# interact with product/click


@app.route('/api/interact', methods=['POST'])
def interactWithProduct():
    productID = request.form['productID']
    userID = request.form['userID']

    data = productProfile.find_one({"_id": ObjectId(productID)})

    userProfile.update_one({"_id": ObjectId(userID)}, {
                           "$push": {}}, {"upsert": True})  # TODO

    return {"ack": True}, 200

# search product


@app.route('/api/search', methods=['POST'])
def searchProduct():
    query = request.form['query']
    userID = request.form['userID']

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
    comment = request.form['comment']
    postID = request.form['postID']
    userID = request.form['userID']

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
    userID = request.form['userID']
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
    image = request.files['image']
    userID = request.form['userID']
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
