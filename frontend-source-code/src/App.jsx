import { useState, useEffect } from 'react'
import './App.css'


async function fetchFiles(dir, includeFolders=true) {
	const response = await fetch(`/fileExplorer?dir=${dir}`)
	let resJSed = await response.json()
	if (!includeFolders) return resJSed.filter((file) => !file.isDir)
	return resJSed
}



function App() {

	const [tab, setTab] = useState(false)
	const [images, setImages] = useState([]);
	const [movies, setMovies] = useState([]);
	const [music, setMusic] = useState([])
	const [dirContents, setDirContents] = useState([]);
	const [dirPath, setDirPath] = useState('root')

	function goToParentFolder(path,setState=false, includeRoot=true) {
		const pathArr = path.split('/')
		includeRoot ? pathArr.pop() : pathArr.shift()
		let newDirPath = pathArr.join('/')
		if (setState) {
			setDirPath(newDirPath);
			loadFiles(setDirContents, newDirPath, true)
		}
		return newDirPath == 'root' ? '' : newDirPath
	}

	function toggleExplorer(whatSire = true, refresh=false) {
	  const root = document.getElementById('root');
	  const tab = document.getElementById('fileExplorerTab');
		
  	if (whatSire) {
  		root.style.display = 'none';
  		tab.style.display = 'block';
  	} else {
		root.style.display = 'block'
		tab.style.display = 'none'
	  }
	
	}


	useEffect(() => {
  		loadFiles(setImages, 'root/pictures');
		loadFiles(setMovies, 'root/movies/artwork')
		loadFiles(setDirContents, 'root', true)
		loadFiles(setMusic, 'root/music')
	}, [])


async function loadFiles(state, what, wantFolders=false) {
    		const files = await fetchFiles(what, wantFolders);
    		state(files);
}


function File({format, file}) {
	if (format == 'file explorer') {
		if (/\.mp3$/.test(file.name) || /\.ogg$/.test(file.name)) {
			return (
				<>
				<audio controls style={{display: 'flex'}} src={`/${goToParentFolder(file.fullDir, false, false)}${file.name}`} />
				</>
			)
		}
		return (
			<div onClick={() => {
					if (file.isDir) {
						setDirPath(dirPath + '/' + file.name);
						loadFiles(setDirContents, dirPath + '/' + file.name, true)
					} else  window.open(`/download?path=${dirPath + '/' + file.name}`, '_blank')}} className={file.isDir ? 'folder' : 'file'
			}>
			<h3>{file.isDir ? `📁 ${file.name}` : `📄 ${file.name}`}</h3>
			</div>)
	} else if (format == 'picture') {
		if (!file.isDir) return (
			<div className='pictureTile'>
			{/.mp4$/.test(file.name) ? <video key={file.name} controls src={`/pictures/${file.name}`} /> :  <img src={`/pictures/${file.name}`} />}
			</div>
		)
	} else if (format == 'movie'){
		return (
			<a href={`/movies/${file.name.replace(/\..+$/, '.mp4')}`} target='_blank'><div className='movieTile' key={file.name}>
			<img src={`/movies/artwork/${file.name}`} />
			</div></a>
		)
	} else if (format == 'music'){
		return (
			<div className='musicTile' key={file.name}>
			<audio controls  src={`/music/${file.name}`} />
			</div>
		)
	}

}


  return (
  	<>
		<nav id='navbar'>
			<a href='#Movies'><h2 onClick={() => {toggleExplorer(false)}} >Movies</h2></a>
	  		<a href='#Music'><h2  onClick={() => {toggleExplorer(false)}} >Music</h2></a>
	  		<a href='#Pictures'><h2  onClick={() => {toggleExplorer(false)}}>Pictures</h2></a>
	  		<h2 onClick={toggleExplorer} id='fileExplorerBtn' >File Explorer</h2>
	    </nav>
	  	<hr />
	  	<div id='root' style={{display: tab ? 'none' : 'block'}}>
			<h1 id='Movies'>Movies</h1>
	  		<div className='section'>
	  		{movies.length > 0 ? movies.map((movie) => <File key={movie.name} format='movie' file={movie} />) : ''}
	   	 	</div>
			<h1 id='Music'>Music</h1>
	  		<div className='section'>
				{music.map((audio) => <File format='music' file={audio} key={audio.name} />)}
	  		</div>
	  		<h1 id='Pictures'>Pictures</h1>
	  		<div className='section'>
	  		{images.map((image) => <File format='picture' file={image} key={image.name} />)}
	  		</div>
	  	</div>
	  	<div id='fileExplorerTab' style={{display: !tab ? 'none' : 'block'}}>
	  		<h1>{'Directory: /' + dirPath}</h1>
	  		<div id='directoryContents'>
	  			{dirContents.map((iFile) => <File key={iFile.name} format='file explorer' file={iFile} />)}
	  			{dirContents.length <= 0 ? <h1>No Files in directory.</h1> : ''}
	  			<div className='dirBtn' style={{display: dirPath === 'root' ? 'none': 'flex'}} onClick={() => {goToParentFolder(dirPath, true)}}><h3>↩️ Back</h3></div>
	  		</div>	
	  </div>
	</>
  )
}



export default App
