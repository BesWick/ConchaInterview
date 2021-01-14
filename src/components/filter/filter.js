import { useState } from 'react'
import Audio from '../AudioNodes'
import './filter.css'

function Filter({ frequency, filter }) {
    const [filterGain, setFilterGain] = useState(0)

    const changeFilterGain = (e) => {
        filter.gain.value = e.target.value
        console.log(`Filter ${filter} Gain:` + filter.gain.value)
        console.log('LOWFILTER', Audio.lowFilter.gain.value)
        console.log('MIDFILTER', Audio.midFilter.gain.value)
        console.log('HIGHFILTER', Audio.highFilter.gain.value)
        setFilterGain(e.target.value)
    }

    return (
        <div className='filter'>
            <div className='col'>
                <label htmlFor='fader'>{frequency}</label>
                <input
                    type='range'
                    id='fader'
                    min={-40}
                    max={40}
                    value={filterGain}
                    onChange={changeFilterGain}
                    orient='vertical'
                />
                <div className='num'>{filterGain}</div>
            </div>
        </div>
    )
}

export default Filter
