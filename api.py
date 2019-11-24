from flask import Flask, Response, json, request
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

'''[]@'''
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

class controlTemp(Resource):
    def get(self):
        f=open("termostato.txt", "r")
        termostato = f.read()
        f2 = open("lastTemperature.txt", "r")
        lastTemperature = f2.read()
        f.close()
        f2.close()
        print(lastTemperature)
        print(termostato)

        if termostato == "-1.0":
            return "nothing"
        elif lastTemperature > termostato:
            return "cold"
        elif lastTemperature < termostato:
            return "hot"
        return "nothing"



@app.route("/postTemperature", methods=['POST'])
def postTemperature():
    print(request.json['temperature'])
    f=open("termostato.txt", "w+")
    f.write(str(float(request.json['temperature'])))
    f.close()
    return Response(status=200)

@app.route("/postData", methods=['POST'])
def postData():
    print(request.json)
    f=open("data.txt", "a+")
    f.write("holaaaa")
    f.close()

    rw = open("lastTemperature.txt", "w+")
    rw.write(str(request.json['temperature']))
    rw.close()
    return Response(status=200)

api.add_resource(getAllData, '/getAllData')
api.add_resource(controlTemp, '/controlTemp')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
