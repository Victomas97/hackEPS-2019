from flask import Flask, Response, json, request
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

'''[]@\ '''
class getAllData(Resource):
    def get(self):
        data = []
        with open('data.txt') as f:
            line = f.readline()
            while line:
                h = line.split("\t")
                t = {}
                t['humity'] = h[0]
                t['temperature'] = h[1]
                t['time'] = h[2].split(" ")[1][:-8]
                data.append(t)
                line = f.readline()
        print(data)
        return {"data": data}


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
    humity = str(request.json['humity'])
    temperature = str(request.json['temperature'])
    time = str(request.json['time'])
    f=open("data.txt", "a+")
    f.write(humity+"\t"+temperature+"\t"+time+"\n")#humity, temperature, time
    f.close()

    rw = open("lastTemperature.txt", "w+")
    rw.write(str(request.json['temperature']))
    rw.close()
    return Response(status=200)

api.add_resource(getAllData, '/getAllData')
api.add_resource(controlTemp, '/controlTemp')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
