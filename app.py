from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()
client = MongoClient('mongodb+srv://sparta:test@cluster0.g7hmo1x.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/introduce", methods=["POST"])
def info_post():
    id_receive = request.form['_id_give']
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']
    img_receive = request.form['img_give']
    pw_receive = request.form['pw_give']

    doc = {
        '_id' : id_receive,
        'name' : name_receive,
        'comment' : comment_receive,
        'img' : img_receive,
        'pw' : pw_receive
    }

    db.introduce.insert_one(doc)

    return jsonify({'msg':'게시글 작성 완료!'})

@app.route("/introduce", methods=["GET"])
def info_get():
    all_info = list(db.introduce.find({},{'_id':True, 'name': True, 'img' : True, 'star' : True, 'comment' : True, 'pw' : True}))
    
    result = []
    for info in all_info:
        info['_id'] = str(info['_id']) # convert the ObjectId to a string
        result.append(all_info)

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)