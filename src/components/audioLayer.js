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
import React, { useState } from 'react'
function AudioLayer() {
    const [state, setState] = useState({
        filter: 0,
    })

    return (
        <div className='audio'>
            <div className='pl'>
                <audio controls src={starwar}>
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </div>

            <input
                type='range'
                min={-40}
                max={40}
                value={state.filter}
                orient='vertical'
                onChange={(e) =>
                    setState({ ...state, filter: Number(e.target.value) })
                }
            />
            <div className='num'>{state.filter}</div>
        </div>
    )
}

export default AudioLayer
