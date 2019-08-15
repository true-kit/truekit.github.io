const {
	readFileSync,
} = require('fs');

const {
	createServer,
} = require('http');

const MAX = 3;
const PORT = process.env.PORT || 8080;
const FILES = Array.from({length: MAX}).map((_, idx) => readFileSync(`./logo/${idx}.png`));

const server = createServer((req, response) => {
	if (req.url === '/logo.png') {
		const file = FILES[Math.round(Math.random() * MAX)];

		response.writeHead(200, {
			'Content-Type': 'image/png',
			'Expires': 'off',
		});

		response.end(file);
	} else {
		response.end(req.url);
	}
});

server.listen(PORT, (err) => {
    if (err) {
        console.error('Failed:', err);
	} else {
		console.log(`Server started:`);
		console.log(` - http://localhost:${PORT}/`);
		console.log(` - http://truekit.openode.io/`)
	}
});