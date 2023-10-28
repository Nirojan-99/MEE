from flask import Flask, request,  request, send_from_directory
from db import initDB
from flask_restful import Api
from db import initDB
from bson import ObjectId
from datetime import datetime
from Utils.token import generate_token
from flask_cors import CORS
from Utils.auth import authenticate
import joblib
from Utils.predict import predict_two, predict_one, predict_comment
from Utils.ner import make_prediction
import string
from Utils.image import extract_sentences

# global variable
app = Flask(__name__)
api = Api(app)
CORS(app)

# mongo collections
users = initDB().MEE.users
posts = initDB().MEE.posts
product_profile = initDB().MEE.productProfile
user_profile = initDB().MEE.userProfile

# static file upload folder
image_upload_path = "./Uploads/"


# config
app.config['SECRET_KEY'] = 'MEE-auth'

# update user


@app.route('/api/images', methods=['POST'])
def image():
    img = request.files['img']
    img.save(image_upload_path+img.filename)
    data = extract_sentences(img.filename)

    return {"ack": data}, 200

# update user


@app.route('/api/users', methods=['PUT'])
def update_user():
    user_iD = authenticate(request, app)
    if user_iD is False:
        return {"auth": False}, 404

    data = request.form.to_dict()
    query = {"_id": ObjectId(user_iD)}
    new_values = {"$set":  data}
    users.update_one(query, new_values)

    return {"ack": True}, 200

# get one user by id


@app.route('/api/users/<id>', methods=['GET'])
def get_user_by_id(id):
    user_id = authenticate(request, app)
    if user_id is False:
        return {"auth": False}, 404

    user_data = users.find_one({"_id": ObjectId(id)})

    if (user_data is None):
        return {"ack": False}, 400

    user_data['_id'] = str(user_data['_id'])

    return {"data": user_data}, 200

# register endpoint


@app.route('/api/auth/register', methods=['POST'])
def register_user():
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
def create_recommendation():
    user_id = authenticate(request, app)
    if user_id is False:
        return {"auth": False}, 404

    user_preference = user_profile.find_one({"userID": str(user_id)}, {
                                            "preference": {"$slice": -5}})

    prod = []
    for preference in user_preference['preference']:
        for key, value in preference.items():
            if key == "B-PROD" or key == "I-PROD":
                prod.append(value)

    product_profile_data = product_profile.find({
        '$or': [
            {"entities.B-PROD": {'$in': prod}},
            {"entities.I-PROD": {'$in': prod}}
        ]
    })

    if product_profile_data is not None:
        post_data = []
        preference = []
        data_list = []

        for doc in product_profile_data:
            preference.append(doc['entities'])

            data = posts.find(
                {"_id": ObjectId(doc['productID'])})

            for document in data:
                document['_id'] = str(document['_id'])
                post_data.append(document)

        for document in post_data:
            document['_id'] = str(document['_id'])
            data_list.append(document)

        return {"data": data_list}, 200
    else:
        return {"data": False}, 404

# get latest posts


@app.route('/api/posts', methods=['GET'])
def get_latest_posts():
    user_id = authenticate(request, app)
    if user_id is False:
        return {"auth": False}, 404

    data = posts.find().sort('date', -1).limit(20)

    data_list = []
    for document in data:
        document['_id'] = str(document['_id'])
        data_list.append(document)

    return {"data": data_list}, 200

# get sing post by id


@app.route('/api/posts/<id>', methods=['GET'])
def get_posts_by_id(id):
    user_id = authenticate(request, app)
    if user_id is False:
        return {"auth": False}, 404

    data = posts.find_one({"_id": ObjectId(id)})
    data['_id'] = str(data['_id'])

    return {"data": data}, 200

# interact with product/click


@app.route('/api/interact', methods=['POST'])
def interact_with_product():
    user_id = authenticate(request, app)
    if user_id is False:
        return {"auth": False}, 404

    productID = request.form['productID']

    profile_data = product_profile.find_one({"productID": str(productID)})

    user_profile.update_one({"userID": str(user_id)}, {
        "$addToSet": {"preference": profile_data['entities']}},  True)

    return {"ack": True}, 200

# like the post


@app.route('/api/posts/like', methods=['POST'])
def like_post():
    user_id = authenticate(request, app)
    if user_id is False:
        return {"auth": False}, 404

    product_id = request.form['productID']
    action = request.form['action']

    if action == "1":
        posts.update_one({"_id": ObjectId(product_id)}, {
            "$push": {"likes": user_id}})

        product_profile_data = product_profile.find_one(
            {"productID": str(product_id)})

        user_profile.update_one({"userID": str(user_id)}, {
            "$addToSet": {"preference": product_profile_data['entities']}}, True)
    else:
        res = posts.update_one({"_id": ObjectId(product_id)}, {
            "$pull": {"likes": user_id}})

    return {"ack": True}, 200

# search product


@app.route('/api/search', methods=['POST'])
def search_product():
    user_id = authenticate(request, app)
    if user_id is False:
        return {"auth": False}, 404

    query = request.form['query']

    extracted_keyWords = make_prediction(query)

    prod_data = []
    for key, value in extracted_keyWords:  # TODO
        prod_data.append(key)

    product_profile_data = product_profile.find({
        '$or': [
            {"entities.B-PROD": {'$in': prod_data}},
            {"entities.I-PROD": {'$in': prod_data}}
        ]
    })

    if product_profile_data is not None:
        post_data = []
        preference = []
        data_list = []

        for doc in product_profile_data:
            preference.append(doc['entities'])

            data = posts.find(
                {"_id": ObjectId(doc['productID'])})

            for document in data:
                document['_id'] = str(document['_id'])
                post_data.append(document)

        for document in post_data:
            document['_id'] = str(document['_id'])
            data_list.append(document)

        user_profile.update_one({"userID": str(user_id)}, {
            "$addToSet": {"preference": {"$each": preference}}}, True)

        return {"data": data_list}, 200

    else:
        return {"data": False}, 404

# next word prediction for comments


@app.route('/api/word-prediction/comments', methods=['POST'])
def predict_comment_next_word():
    print(request.form['previousWords'])
    array_of_words = request.form['previousWords'].strip().split(" ")

    if array_of_words is None:
        return {"data": False}, 404

    next_word = predict_comment(array_of_words)

    if next_word is None:
        return {"data": False}, 404

    # Remove None values and duplicates
    filtered_list = [item for item in next_word if item is not None]
    filtered_list = list(dict.fromkeys(filtered_list))

    # Remove words containing only punctuation and numbers
    filtered_list = [item for item in filtered_list if not all(
        char in string.punctuation or char.isdigit() for char in item)]

    return {"nextWord": filtered_list}, 200

# next word prediction for post


@app.route('/api/word-prediction', methods=['POST'])
def predict_next_word():
    array_of_words = request.form['previousWords'].strip().split(" ")

    if array_of_words is None:
        return {"data": False}, 404

    if len(array_of_words) == 2:
        next_word_one = predict_one([array_of_words[-1]])
        next_word_two = predict_two(array_of_words)

        if not isinstance(next_word_one, list):
            next_word_one = list()
        if not isinstance(next_word_two, list):
            next_word_two = list()
        res = next_word_one+next_word_two
    else:
        next_word_one = predict_one([array_of_words[-1]])
        res = next_word_one

    # Remove None values and duplicates
    filtered_list = [item for item in res if item is not None]
    filtered_list = list(dict.fromkeys(filtered_list))

    # Remove words containing only punctuation and numbers
    filtered_list = [item for item in filtered_list if not all(
        char in string.punctuation or char.isdigit() for char in item)]

    return {"nextWord": filtered_list}, 200

# add comment


@app.route('/api/sentiment-analysis', methods=['POST'])
def add_comment():
    user_id = authenticate(request, app)
    if user_id is False:
        return {"auth": False}, 404

    comment = request.form['comment']
    postID = request.form['postID']

    today = datetime.now()
    date = today.strftime("%m/%d/%y")
    time = today.strftime("%H:%M:%S")

    loaded_model = joblib.load('../Model/IT20202422/sentiment.joblib')
    loaded_tfidf_vectorizer = joblib.load(
        '../Model/IT20202422/tfidf_vectorizer.pkl')

    data = loaded_tfidf_vectorizer.transform([comment])

    sentiment = loaded_model.predict(data)
    if (sentiment[0] == 0):
        sentiment = "Negative"
    else:
        sentiment = "Positive"

    user = users.find_one({"_id": ObjectId(user_id)})
    user_name = user['userName']

    posts.update_one({"_id": ObjectId(postID)}, {"$push":  {"comments": {
                     "comment": comment, "sentiment": sentiment, "userName": user_name, "date": date, "time": time}}})

    product_profile_data = product_profile.find_one(
        {"productID": str(postID)})

    user_profile.update_one({"userID": str(user_id)}, {
        "$addToSet": {"preference": product_profile_data['entities']}},  True)

    return {"ack": True, "userName": user_name}, 200

# save post


@app.route('/api/posts', methods=['POST'])
def save_post():
    user_id = authenticate(request, app)
    if user_id is False:
        return {"auth": False}, 404

    description = request.form.get('description', "")

    if description.strip() == "":
        return {"ask": False}, 404

    extracted_keyWords = make_prediction(description)

    grouped_data = {}
    for key, value in extracted_keyWords:
        if value in grouped_data:
            grouped_data[value].append(key)
        else:
            grouped_data[value] = [key]

    today = datetime.now()
    date = today.strftime("%m/%d/%y")
    time = today.strftime("%H:%M:%S")

    post_data = posts.insert_one({"url": " ", "description": description,
                                  "date": date, "time": time, "userID": user_id})

    product_profile.insert_one(
        {"productID": str(post_data.inserted_id), 'entities': grouped_data, "index": 0})

    return {"ack": True}, 200

# save post by image


@app.route('/api/posts/image', methods=['POST'])
def track_image():
    user_id = authenticate(request, app)
    if user_id is False:
        return {"auth": False}, 404

    description = request.form.get('description', "")

    image = request.files['image']
    image.save(image_upload_path+image.filename)
    data = extract_sentences(image.filename)
    detected_sentence = data.replace("\n", " ")

    if description.strip() == "":
        return {"ask": False}, 404

    extracted_keyWords_from_description = make_prediction(description)
    extracted_keyWords_from_image = make_prediction(detected_sentence)

    grouped_data = {}
    for key, value in extracted_keyWords_from_description:
        if value in grouped_data:
            grouped_data[value].append(key)
        else:
            grouped_data[value] = [key]

    for key, value in extracted_keyWords_from_image:
        if value in grouped_data:
            grouped_data[value].append(key)
        else:
            grouped_data[value] = [key]

    today = datetime.now()
    date = today.strftime("%m/%d/%y")
    time = today.strftime("%H:%M:%S")

    post_data = posts.insert_one({"url": "api/images/"+image.filename,
                                 "description": description, "date": date, "time": time, "userID": user_id})

    product_profile.insert_one(
        {"productID": str(post_data.inserted_id), 'entities': grouped_data, "index": 0, "detected_sentence": detected_sentence})

    return {"ack": True}, 200

# serve image statically


@app.route('/api/images/<image_name>', methods=['GET'])
def serve_image(image_name):
    return send_from_directory(image_upload_path, image_name)


if __name__ == "__main__":
    app.run(debug=True)
