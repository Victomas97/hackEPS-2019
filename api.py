from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

class Hello(Resource):
    def get(self, name):
        return {"Hello":name}
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
        print("hola dani")
        args = parser.parse_args()
        print(args)
        todo_id = int(max(TODOS.keys()).lstrip('todo')) + 1
        todo_id = 'todo%i' % todo_id
        TODOS[todo_id] = {'task': args['task']}
        return TODOS[todo_id], 201

api.add_resource(Hello, '/hello/<name>')
api.add_resource(getAllData, '/getAllData')
api.add_resource(postData, '/postData')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
