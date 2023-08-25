
from pymongo.mongo_client import MongoClient

def initDB():
    uri = "mongodb+srv://siliconV:siliconV@cluster0.gqjk2dk.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri)

    return client
