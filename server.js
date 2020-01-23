const {Server} = require('net');
const {stdout, stderr} = require('process');
const {readFileSync, existsSync} = require('fs');

const STATIC_FOLDER = `${__dirname}/public`;

const badRequestResponse = function() {
  return [
    'HTTP/1.0 404 file not found ',
    'content-type: text/html',
    'content-length: 0',
    '',
    ''
  ].join('\n');
};

const getUrlAndExtn = function(resource) {
  let url = resource;
  const lookUp = {
    js: 'application/javascript',
    css: 'text/css',
    html: 'text/html'
  };
  if (url === '/') {
    url = '/html/index.html';
  }

  const [, extn] = url.split('.');
  return {type: lookUp[extn], url: `${STATIC_FOLDER}${url}`};
};

const generateResourceRes = function(resource) {
  const {type, url} = getUrlAndExtn(resource);
  let content = '';
  if (existsSync(url)) {
    content = readFileSync(`${url}`, 'utf8');
  }
  return [
    'HTTP/1.0 200 OK',
    `content-type: ${type}`,
    `content-length: ${content.length}`,
    '',
    content
  ].join('\n');
};

const generateResponseText = function(method, resource) {
  if (method === 'GET') {
    return generateResourceRes(resource);
  }
  return badRequestResponse();
};

const handleText = function(text) {
  const [request] = text.split('\n');
  const [method, resource, protocol] = request.split(' ');
  stdout.write(`${protocol.slice(0, -1)} ${method} 200 OK`);
  return {method, resource};
};

const respondOnConnect = function(socket) {
  const remote = {address: socket.remoteAddress, port: socket.remotePort};
  'new connection', remote;
  socket.setEncoding('utf8');
  socket.on('data', text => {
    const {method, resource} = handleText(text);
    socket.write(generateResponseText(method, resource));
  });
  socket.on('end', () =>
    stderr.write(`${JSON.stringify(remote)}\ndisconnected`)
  );
  socket.on('error', () =>
    stderr.write(`${JSON.stringify(remote)}\nsomething went wrong`)
  );
};

const main = function() {
  const server = new Server();
  server.on('listening', () => {
    stdout.write(`start listening\n ${JSON.stringify(server.address())}`);
  });

  server.on('connection', respondOnConnect);
  server.listen(4000);
};

main();
