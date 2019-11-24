#!/usr/bin/python

import sys
import time
import Adafruit_DHT
import requests 
import datetime, json


sensor = Adafruit_DHT.DHT11
API_ENDPOINT = "http://craftyourvoice.tk:5000/postData"


pin = 23

try:	
	while True:
		humedad, temperatura = Adafruit_DHT.read_retry(sensor, pin)
		print('Temperatura={0:0.1f}*  Humedad={1:0.1f}%'.format(temperatura, humedad))
		data = {"temperature": temperatura,
		"humity": humedad,
		"time": str(datetime.datetime.now())
		}
		headers = {'Content-type': 'application/json'}
		r = requests.post(url = API_ENDPOINT, data = json.dumps(data), headers=headers)
		time.sleep(600)

except Exception,e:	
	print str(e)
