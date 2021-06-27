import React,{useState,useRef} from "react";
import './styles/style.scss'
import Song from "./components/Song";
import Player from "./components/Player";
//import data
import data from './util'
import Library from "./components/Library";
import {Route} from 'react-router-dom'


function App() {
  const [songs,setSongs] = useState(data())
  const [currentSong,setCurrentSong] = useState(songs[0])
  const [playing,setPlaying] = useState(false)
  //Ref choose html element
  const audioRef = useRef(null)
  return (
    <div className="App">
      <Route path='/library'>
      <Library audioRef={audioRef} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong}/>
      </Route>
      <Song currentSong={currentSong}/>
      <Player audioRef={audioRef} playing={playing} setPlaying={setPlaying} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} currentSong={currentSong}/>
      
    </div>
  );
}

export default App;
