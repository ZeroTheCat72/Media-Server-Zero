const { readdir } = require('fs').promises;
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const mm = require('music-metadata');
const path = require('path');
const ROOTX = path.resolve('root') + '/';
// seperation

async function getFiles(dir) {
	const files = await readdir(dir, {withFileTypes: true})
	return files.map((file) => ({name: file.name, isDir: file.isDirectory(), fullDir: dir + '/'}))
}

// seperation


app.use(express.static('dist'))

app.get('/fileExplorer', async (req, res) => {
	const requestedPath = path.resolve(req.query.dir) + '/';
	console.log(requestedPath)
	if (!requestedPath.startsWith(ROOTX)) throw new Error('Hell no.');
	let dirContents = await getFiles(req.query.dir);
	res.json(dirContents);
})

app.get('/download', (req, res) => {
	const requestedPath = path.resolve(req.query.path) + '/';
	if (!requestedPath.startsWith(ROOTX)) throw new Error('No.')
	res.download(req.query.path, undefined)
})

// seperation

app.use(express.static('root'));

app.get('/', (req, res) => {
	res.sendfile('dist/index.html')
})

app.listen(port, () => {
	console.log(`listening on ${port}`)
})
