import { createReadStream, existsSync, readFileSync, statSync, watch } from 'node:fs';
import { transform } from 'esbuild';
import { extname, join, normalize } from 'node:path';
import http from 'node:http';

const rootDir = process.cwd();
const defaultPort = 3000;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.ts': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

const reloadClients = new Set();

const reloadScript = `
<script>
  (function () {
    const source = new EventSource('/__reload');
    source.onmessage = function (event) {
      if (event.data === 'reload') {
        window.location.reload();
      }
    };
  })();
</script>
`;

function resolvePath(urlPath) {
  const safePath = normalize(urlPath).replace(/^([.][.][/\\])+/, '');
  const requestedPath = safePath === '/' || safePath === '\\'
    ? 'index.html'
    : safePath.replace(/^[/\\]/, '');
  return join(rootDir, requestedPath);
}

const server = http.createServer((request, response) => {
  if (request.url === '/__reload') {
    response.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    response.write('\n');
    reloadClients.add(response);
    request.on('close', () => {
      reloadClients.delete(response);
    });
    return;
  }

  const filePath = resolvePath(request.url || '/');

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const fileExtension = extname(filePath);
  response.writeHead(200, {
    'Content-Type': contentTypes[fileExtension] || 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  });

  if (fileExtension === '.html') {
    const html = readFileSync(filePath, 'utf-8');
    const injected = html.includes('</body>')
      ? html.replace('</body>', `${reloadScript}</body>`)
      : html + reloadScript;
    response.end(injected);
    return;
  }

  if (fileExtension === '.ts') {
    const source = readFileSync(filePath, 'utf-8');
    transform(source, { loader: 'ts' }).then(({ code }) => {
      response.end(code);
    }).catch((err) => {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(String(err));
    });
    return;
  }

  createReadStream(filePath).pipe(response);
});

function notifyReload() {
  for (const client of reloadClients) {
    client.write('data: reload\n\n');
  }
}

let reloadTimer = null;
function scheduleReload(filename) {
  if (filename?.startsWith('node_modules')) return;
  if (reloadTimer) clearTimeout(reloadTimer);
  reloadTimer = setTimeout(notifyReload, 50);
}

try {
  watch(rootDir, { recursive: true }, (_eventType, filename) => {
    scheduleReload(filename ? String(filename) : '');
  });
} catch (error) {
  console.warn('File watching is unavailable:', error.message);
}

let currentPort = Number(process.env.PORT) || defaultPort;
const maxPortAttempts = 20;
let portAttempts = 0;

function startServer(port) {
  currentPort = port;
  server.listen(port);
}

server.on('listening', () => {
  console.log(`Open http://localhost:${currentPort} in your browser.`);
});

server.on('error', (error) => {
  if (error.code !== 'EADDRINUSE') {
    throw error;
  }

  portAttempts += 1;
  if (portAttempts > maxPortAttempts) {
    console.error(`Could not find a free port after ${maxPortAttempts} attempts.`);
    process.exit(1);
  }

  const nextPort = currentPort + 1;
  console.log(`Port ${currentPort} is busy. Retrying on ${nextPort}...`);
  startServer(nextPort);
});

startServer(currentPort);