const {Server} = require('net');
const {readFileSync, existsSync} = require('fs');
const Request = require('./request.js');
const Response = require('./response.js');

const STATIC_FOLDER = `/${__dirname}/../public`;
const CONTENT_TYPE = {
  js: 'application/javascript',
  css: 'text/css',
  html: 'text/html'
};

const serveStaticFiles = function(req) {
  const [, extn] = req.resource.split('.');
  const contentType = CONTENT_TYPE[extn];
  const content = readFileSync(`${req.resource}`, 'utf8');
  const res = new Response();
  res.setHeader('content-type', contentType);
  res.setHeader('content-length', content.length);
  res.statusCode = 200;
  res.msg = 'OK';
  res.body = content;
  return res;
};

const fileHandler = function(req) {
  if (req.resource === '/') {
    req.resource = '/html/index.html';
  }
  req.resource = `${STATIC_FOLDER}${req.resource}`;
  if (req.method === 'GET' && existsSync(req.resource)) {
    return serveStaticFiles;
  }
  return () => new Response();
};

const respondOnConnect = function(socket) {
  const remote = `${socket.remoteAddress}: ${socket.remotePort}`;
  console.warn('new connection', remote);
  socket.setEncoding('utf8');
  socket.on('close', hadErr =>
    console.error(`${remote} closed ${hadErr ? 'with error' : ''}`)
  );
  socket.on('error', err => console.warn('socket error', err));
  socket.on('drain', () => console.log(`${remote} drained`));
  socket.on('end', () => console.warn(remote, 'disconnected'));
  socket.on('data', text => {
    console.warn(`${remote} data:\n`);
    const req = Request.parse(text);
    const handler = fileHandler(req);
    const res = handler(req);
    res.writeTo(socket);
  });
};

const main = function() {
  const server = new Server();
  server.on('error', err => console.error('server error', err));
  server.on('connection', respondOnConnect);
  server.on('listening', () => {
    console.log('start listening', server.address());
  });
  server.listen(4000);
};

main();
