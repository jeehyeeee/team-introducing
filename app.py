from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()
client = MongoClient('mongodb+srv://sparta:test@cluster0.mtueuqd.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

#   게시글 작성
@app.route("/introduce", methods=["POST"])
def info_post():
    name_receive = request.form['name_give']
    img_receive = request.form['img_give']
    comment_receive = request.form['comment_give']

    doc = {
        'name' : name_receive,
        'img' : img_receive,
        'comment' : comment_receive
    }

    db.introduce.insert_one(doc)

    return jsonify({'msg':'게시글 작성 완료!'})

#   게시글 수정
@app.route("/introduce/update", methods=["POST"])
def modify_info():
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']
    img_receive = request.form['img_give']
    id_receive = request.form['_id_give']
    
    doc = {
        'name' : name_receive,
        'comment' : comment_receive,
        'img' : img_receive
    }
    print("확인", id_receive, doc)

    db.introduce.update_one({"_id": ObjectId(id_receive)}, {"$set" : doc})

    return jsonify({'msg':'게시글 수정 완료!'})



#   게시글 불러오기
from bson.objectid import ObjectId

@app.route("/introduce", methods=["GET"])
def info_get():
    all_info = list(db.introduce.find({}))
    
    result = []
    for info in all_info:
        info['_id'] = str(ObjectId(info['_id'])) # convert the ObjectId to a string
        result.append(info)

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)