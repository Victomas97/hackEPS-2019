#!/usr/bin/python

import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import requests, json
from time import sleep # Import the sleep function from the time module
GPIO.setwarnings(False) # Ignore warning for now
GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
GPIO.setup(37, GPIO.OUT, initial=GPIO.LOW) # Set pin 8 to be an output pin and set initial value to low (off)
GPIO.setup(35, GPIO.OUT, initial=GPIO.LOW) # Set pin 8 to be an output pin and set initial value to low (off)
GPIO.setup(33, GPIO.OUT, initial=GPIO.LOW) # Set pin 8 to be an output pin and set initial value to low (off)
GPIO.setup(31, GPIO.OUT, initial=GPIO.LOW) # Set pin 8 to be an output pin and set initial value to low (off)
GPIO.setup(29, GPIO.OUT, initial=GPIO.LOW) # Set pin 8 to be an output pin and set initial value to low (off)

GPIO.setup(13, GPIO.OUT, initial=GPIO.LOW) # Set pin 8 to be an output pin and set initial value to low (off)
GPIO.setup(15, GPIO.OUT, initial=GPIO.LOW) # Set pin 8 to be an output pin and set initial value to low (off)
GPIO.setup(19, GPIO.OUT, initial=GPIO.LOW) # Set pin 8 to be an output pin and set initial value to low (off)
GPIO.setup(21, GPIO.OUT, initial=GPIO.LOW) # Set pin 8 to be an output pin and set initial value to low (off)
GPIO.setup(23, GPIO.OUT, initial=GPIO.LOW) # Set pin 8 to be an output pin and set initial value to low (off)

GPIO.setup(11, GPIO.OUT, initial=GPIO.HIGH) # Set pin 8 to be an output pin and set initial value to low (off)

def calor():
	while(get() == "hot"):
		for x in range (0, 3):
			GPIO.output(23, GPIO.HIGH) # Turn on
			sleep(0.3) # Sleep for 1 second
			GPIO.output(23, GPIO.LOW) # Turn off
			GPIO.output(21, GPIO.HIGH) # Turn on
			sleep(0.3) # Sleep for 1 second
			GPIO.output(21, GPIO.LOW) # Turn off
			GPIO.output(19, GPIO.HIGH) # Turn on 
			sleep(0.3) # Sleep for 1 second
			GPIO.output(19, GPIO.LOW) # Turn off
			GPIO.output(15, GPIO.HIGH) # Turn on 
			sleep(0.3) # Sleep for 1 second
			GPIO.output(15, GPIO.LOW) # Turn off
			GPIO.output(13, GPIO.HIGH) # Turn on 
			sleep(0.3) # Sleep for 1 second
			GPIO.output(13, GPIO.LOW) # Turn off

 
def frio():
	while(get() == "cold"):
		for x in range (0, 3):
			GPIO.output(37, GPIO.HIGH) # Turn on
			sleep(0.3) # Sleep for 1 second
			GPIO.output(37, GPIO.LOW) # Turn off
			GPIO.output(35, GPIO.HIGH) # Turn on
			sleep(0.3) # Sleep for 1 second
			GPIO.output(35, GPIO.LOW) # Turn off
			GPIO.output(33, GPIO.HIGH) # Turn on 
			sleep(0.3) # Sleep for 1 second
			GPIO.output(33, GPIO.LOW) # Turn off
			GPIO.output(31, GPIO.HIGH) # Turn on 
			sleep(0.3) # Sleep for 1 second
			GPIO.output(31, GPIO.LOW) # Turn off
			GPIO.output(29, GPIO.HIGH) # Turn on 
			sleep(0.3) # Sleep for 1 second
			GPIO.output(29, GPIO.LOW) # Turn off


def get():
	r = requests.get('http://craftyourvoice.tk:5000/controlTemp')
	return(r.text[1:-2])
	
def stop():
	GPIO.output(37, GPIO.LOW)
	GPIO.output(35, GPIO.LOW)
	GPIO.output(33, GPIO.LOW)
	GPIO.output(31, GPIO.LOW)
	GPIO.output(29, GPIO.LOW)
	GPIO.output(13, GPIO.LOW)
	GPIO.output(15, GPIO.LOW)
	GPIO.output(19, GPIO.LOW)
	GPIO.output(21, GPIO.LOW)
	GPIO.output(23, GPIO.LOW)
	GPIO.output(11, GPIO.HIGH)

	
while True:
	stop()
	while(get() == "nothing"):
		sleep(5)
	if(get() == "cold"):
		GPIO.output(11, GPIO.LOW)
		frio()
	if(get() == "hot"):
		GPIO.output(11, GPIO.LOW)
		calor()
	


