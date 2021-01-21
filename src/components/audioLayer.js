//Phase 1; get a audio player
//Phase 2: pass audio to web audio
import soundFile from '../assets/starwars.wav'
import React, { useEffect, useRef } from 'react'
import Audio from './AudioNodes'
import Filter from './filter/filter'

import './audioLayer.css'

function AudioLayer() {
    const audioElement = useRef()

    //set state to represent initial value of masterGainNode
    // const [masterGainValue, setMasterGainValue] = useState(0)

    const initializeFilters = () => {
        Audio.lowFilter.type = 'lowshelf'
        Audio.lowFilter.frequency.value = 1000.0
        Audio.lowFilter.gain.value = 0.0

        Audio.midFilter.type = 'peaking'
        Audio.midFilter.frequency.value = 2500.0
        Audio.midFilter.Q.value = 10.0
        Audio.midFilter.gain.value = 0.0

        Audio.highFilter.type = 'highshelf'
        Audio.highFilter.frequency.value = 4000.0
        Audio.highFilter.gain.value = 0.0
    }

    const initializeMasterGain = () => {
        const track = Audio.context.createMediaElementSource(
            audioElement.current,
        )
        initializeFilters()

        // Connect the masterGainNode to the audio context to allow it to output sound.
        track.connect(Audio.lowFilter)
        Audio.lowFilter.connect(Audio.midFilter)
        Audio.midFilter.connect(Audio.highFilter)
        Audio.highFilter.connect(Audio.masterGainNode)
        Audio.masterGainNode.connect(Audio.context.destination)

        // track.connect(Audio.masterGainNode)
        // Audio.masterGainNode.connect(Audio.context.destination)
        Audio.masterGainNode.gain.value = 1
    }

    //initialize masterGainNode on first render
    useEffect(initializeMasterGain, [])

    // const changeMasterVolume = (e) => {
    //     Audio.masterGainNode.gain.value = e.target.value
    //     console.log(
    //         'GAIN ' + Audio.masterGainNode.gain.value + ' ' + e.target.value,
    //     )
    //     // setMasterGainValue(e.target.value)
    // }

    return (
        <div className='audio'>
            <div className='player'>
                <audio
                    controls
                    src={soundFile}
                    ref={audioElement}
                    onPlay={() => Audio.context.resume()}>
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </div>
            <div className='sliders'>
                {/* <div className='col'>
                    <label htmlFor='fader'>Volume</label>
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
                </div> */}
                <Filter frequency='&lt;1k' filter={Audio.lowFilter} />
                <Filter
                    frequency='&ge;1K and &lt;4k'
                    filter={Audio.midFilter}
                />
                <Filter frequency='&ge;4k' filter={Audio.highFilter} />
            </div>
        </div>
    )
}

export default AudioLayer
