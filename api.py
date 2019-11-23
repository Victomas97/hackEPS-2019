from flask import Flask, Response, json, request
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

'''[]'''
class getAllData(Resource):
    def get(self):
        return {"data":[
                    {"temperature":29,
                    "humity": 50,
                    "time":"07:30"},
                    {"temperature":25,
                    "humity": 80,
                    "time":"08:30"},
                    {"temperature":20,
                    "humity": 20,
                    "time":"09:30"},
                ]}

class postData(Resource):
    def post(self):
        print(json.dumps(request))
        return "ok"

api.add_resource(getAllData, '/getAllData')
api.add_resource(postData, '/postData')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
