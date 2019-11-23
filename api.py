from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class Hello(Resource):
    def get(self, name):
        return {"Hello":name}
'''[]'''
@app.route('/data', methods = ['GET', 'POST'])

def data(self):
    if request.method == 'GET':
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

api.add_resource(Hello, '/hello/<name>')
'''
getallData

postdata
'''
if __name__ == '__main__':
 app.run(debug=True, host='0.0.0.0')
