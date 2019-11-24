// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const http = require('http');
const {
    getSlotValue,
}= require('ask-sdk-core');

const getRemoteData = function(url){
    return new Promise((resolve,reject)=>{
        const client= url.startsWith('https') ? require('https') : require('http');
        const request = client.get(url,(response)=>{
            //faltan cosas
            const body=[];
            response.on('data',(chunk)=> body.push(chunk));
            response.on('end',()=> resolve(body.join('')));
        })
    })
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const speakOutput = 'Hola! En que puedo ayudarte?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};



const getAlldataHandler = {
        canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'getAlldata';
    },
    async handle(handlerInput) {
        var speakOutput = ' nada';
        speakOutput="Generando modelo";
        await getRemoteData('http://craftyourvoice.tk:5000/getLast')
        .then((response)=>{
            const data= JSON.parse(response);
            speakOutput= "Actualmente hay"+data["temperature"]+"grados centígrados"+data["humity"]+"por ciento de humedad";
        })
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const TemperaturaHandler = {
        canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Temperatura';
    },
    async handle(handlerInput) {
        var speakOutput = ' nada';
        await getRemoteData('http://craftyourvoice.tk:5000/getLast')
        .then((response)=>{
            const data= JSON.parse(response);
            speakOutput= data["temperature"]+"grados centígrados";
        })
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const SendTempHandler = {
        canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SendTemp';
    },
   async handle(handlerInput) {
        var speakOutput = ' nada';
        const temp = getSlotValue(handlerInput.requestEnvelope,'grados');
        await getRemoteData('http://craftyourvoice.tk:5000/alexa?temperature='+temp+".0")
        .then((response)=>{
            const data= JSON.parse(response);
            speakOutput= "Termostato programado";
        })
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const ConsultarUltimaHandler = {
        canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsultarUltima';
    },
   async handle(handlerInput) {
        var speakOutput = ' nada';
        await getRemoteData('http://craftyourvoice.tk:5000/getLast')
        .then((response)=>{
            const data= JSON.parse(response);
            speakOutput= "Ahora hay un"+data["humity"]+"por ciento de humedad";
        })
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Qué quieres consultar? Tengo sensor de temperatura i de humedad';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Adios!, esperamos verle de nuevo. Muchas gracias.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Lo siento, Tengo problemas para hacer lo que me pides. Por favor prueba de nuevo.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

