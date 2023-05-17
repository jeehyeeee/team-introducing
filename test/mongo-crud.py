from bson.objectid import ObjectId
from pymongo import MongoClient
import certifi

ca = certifi.where()
client = MongoClient('mongodb+srv://sparta:test@cluster0.ghgs9cw.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

print("mongo-crud 테스트 시작!")

print("모든 건 조회 ##################")
for item in db.comment.find():
    print(item)

comment = db.comment.find_one({'name': 'jeehye'})
print()
print("단 건 조회 ##################")
print(comment)

objectId = comment['_id']

# 업데이트
print()
print("단 건 업데이트 ##################")
db.comment.update_one({'_id': objectId}, {'$set': {'comment': 'old~!'}})
comment = db.comment.find_one({'_id': objectId})
print(comment)

# 삭제
print()
print("단 건 삭제 ##################")
db.comment.delete_one({'_id': objectId})
comment = db.comment.find_one({'_id': objectId})
print(comment)

# 인서트
print()
print("단 건 추가 ##################")
doc = {'name':'jeehye','comment':'new~!'}
db.comment.insert_one(doc)
for item in db.comment.find():
    print(item)