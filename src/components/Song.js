import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const Song = ({currentSong})=>{
    return(<div className="song-container">
        <Link to='/library' className="libraryAnchor"><FontAwesomeIcon size="lg" style={{paddingRight:'0.5rem'}} icon={faMusic}/>Library</Link>
        <img className='songImage' src={`${currentSong.cover}`} alt={currentSong.name} />
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
    </div>)
}


export default Song;