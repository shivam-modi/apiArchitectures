const soap = require("soap");
const _ = require("lodash");
const yargs = require("yargs");
const {API_URL, OPERATIONS} = require("./constants");

const url = API_URL;

const myArgs = yargs
  .option("operation", {
    alias: "o",
    description: "Please choose the operation to perform",
    type: String,
  }).option("intA", {
    alias: "a",
    description: "Please enter the first integer",
    type: Number,
  }).option("intB", {
    alias: "b",
    description: "Please enter the second integer",
    type: Number,
    })
  .parse();

console.log(`operation: ${myArgs.operation} ${JSON.stringify(myArgs)}`);

const callbackHandler = (err, result) => {
    if(!_.isEmpty(err)) {
        console.log(`error calling operation: ${err}`);
    } else {
        console.log(`result of calling operation: ${JSON.stringify(result)}`);
    }
};

soap.createClient(url, (err, client) => {
    if(!_.isEmpty(err)) {
        console.log(`error creating client: ${err}`);
    } else {
        const args = { intA: myArgs.intA, intB: myArgs.intB };
        const operation = myArgs.operation;
        if( operation === OPERATIONS.ADD) {
            client.Add(args, (err, result) => {
                callbackHandler(err, result);
            })
        } else if( operation === OPERATIONS.SUBTRACT) {
            client.Subtract(args, (err, result) => {
                callbackHandler(err, result);
            })
        } else if( operation === OPERATIONS.MULTIPLY) { 
            client.Multiply(args, (err, result) => {
                callbackHandler(err, result);
            })
        } else if( operation === OPERATIONS.DIVIDE) {
            client.Divide(args, (err, result) => {
                callbackHandler(err, result);
            })
        } else {
            console.log(`operation: ${operation} is not supported`);
        }
    }
})