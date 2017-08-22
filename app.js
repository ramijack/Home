const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
  // Method Verb, URL and Headers can be accessed from request as below.
  const { headers, method, url } = request;
  console.log(`Method: ${method}`);
  console.log(`URL: ${url}`);
  for(key in headers){
    console.log(`Header ${key}: ${headers[key]}`);
  }

  // The request object that's passed in to a handler implements the ReadableStream interface.
  // This stream can be listened to or piped elsewhere just like any other stream.
  // We can grab the data right out of the stream by listening to the stream's 'data' and 'end' events.
  // Applicable on Post/Put Requests

  // let body = [];
  // request.on('data', (chunk) => {
  //   body.push(chunk);
  // }).on('end', () => {
  //   body = Buffer.concat(body).toString();
  //   // at this point, `body` has the entire request body stored in it as a string
  // });

  // Since the request object is a ReadableStream, it's also an EventEmitter and behaves like one when an error happens.
  // An error in the request stream presents itself by emitting an 'error' event on the stream.
  // If you don't have a listener for that event, the error will be thrown, which could crash your Node.js program.
  request.on('error', (err) => {
    // This prints the error message and stack trace to `stderr`.
    console.error(err.stack);
  });

  // Status code of an HTTP Response can be set as below.
  response.statusCode = 200;

  // Headers can be sent as a Response to a request as below.
  response.setHeader('Content-Type', 'text/plain');

  // The response stream can also emit 'error' events
  response.on('error', (err) => {
      console.error(err);
    });

  // The end function on streams can also take in some optional data to send as the last bit of data on the stream
  response.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
