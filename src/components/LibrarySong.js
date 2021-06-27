import React from "react";

const LibrarySong = ({ songs,setSongs,song,id,setCurrentSong,audioRef }) => {
   
  

  const selectSong = ()=>{
    setCurrentSong(song);
    if(song.active){
      audioRef.current.play();
    }else{
      audioRef.current.pause();
    }
    
    const modifySongs =  songs.map((song)=>{
      if(song.id === id){
        return{
          ...song,
          active:true
        }
      }else{
        return{
          ...song,
          active:false
        }
      }
    })

    setSongs(modifySongs);
    // console.log(song);
    // console.log(song.audio)
  }
  return (
    <div onClick={selectSong}   className={`librarySong ${song.active ? 'selectedSOng' : ''}`}>
      <img  src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
