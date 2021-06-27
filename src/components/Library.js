import React from 'react';
import LibrarySong from './LibrarySong';
import { Link } from 'react-router-dom';

const Library = ({songs,setSongs,setCurrentSong,audioRef})=>{
   
    return(<div className='library'>
        <h2>Library</h2>
        <Link to='/' className="goBack">🙌Go Back</Link>
        <div className="library-song">
        {songs.map(song=>(
            
            <LibrarySong 
            audioRef={audioRef} 
            key={song.name} 
            songs={songs} setSongs={setSongs} 
            setCurrentSong={setCurrentSong} song={song} 
            id={song.id}/>
        ))}
        </div> 
        
    </div>)
}


export default Library;