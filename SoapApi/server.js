const soap = require('soap');
const http = require('http');

// Define your SOAP service implementation
const service = {
  MyService: {
    MyPort: {
      MyFunction: function (args) {
        // Implement your logic here
        return {
          response: 'Hello ' + args.name + '!'
        };
      }
    }
  }
};

// Create a SOAP server
const server = http.createServer(function (request, response) {
  response.end('404: Not Found: ' + request.url);
});

const wsdlPath = './learn.wsdl';

// Start the SOAP server by providing the service implementation and WSDL path
soap.listen(server, '/wsdl', service, wsdlPath);

const port = 8000;
server.listen(port, function () {
  console.log('SOAP server listening on port ' + port);
});