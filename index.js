const { readdir } = require('fs').promises;
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const mm = require('music-metadata');
app.use(cors({origin: 'http://localhost:5173'}))

// seperation

async function getFiles(dir) {
	const files = await readdir(dir, {withFileTypes: true})
	return files.map((file) => ({name: file.name, isDir: file.isDirectory(), fullDir: dir + '/'}))
}

// seperation

app.use(express.static('dist'))

app.get('/fileExplorer', async (req, res) => {
	let dirContents = await getFiles(req.query.dir);
	res.json(dirContents);
})

const lockDownAccessRegex = new RegExp('../')

app.get('/download', (req, res) => {
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
