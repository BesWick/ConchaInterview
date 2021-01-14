// the 3 filters
// const low = audioCtx.createBiquadFilter()
// low.type = 'lowshelf'
// low.frequency.value = 1000.0
// low.gain.value = 0.0
// low.connect(this.xfadeGain) //connect to audio soource
// const mid = audioCtx.createBiquadFilter()
// mid.type = 'peaking'
// mid.frequency.value = 2500.0
// mid.Q.value = 1500.0
// mid.gain.value = 0.0
// mid.connect(high)
// const high = audioCtx.createBiquadFilter()
// high.type = 'highshelf'
// high.frequency.value = 4000.0
// high.gain.value = 0.0
// high.connect(mid)

//Phase 1; get a audio player
//Phase 2: pass audio to web audio
import starwar from '../assets/starwars.wav'
import React, { useEffect, useRef, useState } from 'react'
import './audioLayer.css'

const context = new (window.AudioContext || window.webkitAudioContext)()
const masterGainNode = context.createGain()

function AudioLayer() {
    const audioElement = useRef()

    //set state to represent initial value of masterGainNode
    const [masterGainValue, setMasterGainValue] = useState(0)

    const initializeMasterGain = () => {
        const track = context.createMediaElementSource(audioElement.current)
        // Connect the masterGainNode to the audio context to allow it to output sound.
        track.connect(masterGainNode)
        masterGainNode.connect(context.destination)
        masterGainNode.gain.value = 0
    }

    //initialize masterGainNode on first render
    useEffect(initializeMasterGain, [])

    const changeMasterVolume = (e) => {
        masterGainNode.gain.value = e.target.value
        console.log('GAIN ' + masterGainNode.gain.value + ' ' + e.target.value)
        setMasterGainValue(e.target.value)
    }

    return (
        <div className='audio'>
            <div className='pl'>
                <audio controls src={starwar} ref={audioElement}>
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </div>
            <div className='sliders'>
                <div className='col'>
                    <label htmlFor='fader'>&lt;1k</label>
                    <input
                        type='range'
                        id='fader'
                        min={0}
                        max={1}
                        step={0.01}
                        value={masterGainValue}
                        onChange={changeMasterVolume}
                        orient='vertical'
                    />
                    <div className='num'>{masterGainValue}</div>
                </div>
            </div>
        </div>
    )
}

export default AudioLayer
