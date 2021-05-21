import {useState, useEffect, useRef} from 'react'
import prev from './icons/rewind.png'
import play from './icons/play.png'
import pause from './icons/pause.png'
import next from './icons/forward.png'


const Player = ({songs}) => {
    const [songIndex,setIndex] = useState (0)
    const [isPlaying,setStatus] = useState (false)
    const [trackTime,setTrackTime] = useState(0)
    const {title, src} = songs[songIndex]
    //References
    const audioRef = useRef(new Audio(src))
    const isReady = useRef(false)
    const interalRef = useRef()

    const {duration} = audioRef.current

    useEffect(() =>{
        audioRef.current.pause()
        setStatus(false)
        audioRef.current = new Audio(src)
        setTrackTime(0)
        if(isReady.current){
            setStatus(true)
            audioRef.current.play()
        }else{
            isReady.current = true
        }
    },[songIndex])

    useEffect(() =>{
        if(isPlaying){
            audioRef.current.play()
            timer()
        }else{
            clearInterval(interalRef.current)
            audioRef.current.pause()
        }
    },[isPlaying])

    
    const prevSong = () =>{
        if(songIndex-1 < 0){
            setIndex(songs.length-1)
        }else{
            setIndex(songIndex-1)
        }
    }

    const nextSong = () =>{
        if(songIndex +1 > songs.length-1){
            setIndex(0)
        }else{
            setIndex(songIndex+1)
        }
    }
    
    const songStatus = () =>{
        if(isPlaying){
            setStatus(false)
        }else{
            setStatus(true)
        }
    }

    const timer =  () =>{
        clearInterval(interalRef.current)

        interalRef.current = setInterval(() => {
            if(audioRef.current.ended){
                nextSong()
            }else{
                setTrackTime(audioRef.current.currentTime)
            }
            
        },[1000])
    }

    const onChangeTimer = (value) =>{
        clearInterval(interalRef.current)
        audioRef.current.currentTime = value
        setStatus(true)
        timer()
        test(value)
    }

    const test = (value) => {
        let time = ''
        if(value%60 < 10){
            time = Math.floor(value/60) + ': 0' + value%60
        }else{
            time = Math.floor(value/60) + ': ' + value%60
        }
    }

    return (
        <div>
            
            <div className="player-controller">
                <h3>{title}</h3>
                <div className="buttons">
                    <button className="btn-control" onClick={prevSong}><img src={prev} /></button>
                    { isPlaying? 
                        <button 
                            className="btn-control" 
                            onClick={songStatus}>
                                <img src={pause} 
                        /></button> : 
                        <button 
                            className="btn-control" 
                            onClick={songStatus}>
                                <img src={play} 
                        /></button>}
                    <button className="btn-control" onClick={nextSong}><img src={next} /></button>
                </div>
                <input 
                    className="duration"
                    type="range" 
                    value={trackTime} 
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    onChange={(e) => onChangeTimer(e.target.value)}
                    >
                </input>
            </div>
            
        </div>
    )
}

export default Player