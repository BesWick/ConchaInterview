class Audio {
    static context = new (window.AudioContext || window.webkitAudioContext)()

    static masterGainNode = Audio.context.createGain()

    // the 3 filters
    static lowFilter = Audio.context.createBiquadFilter()
    static midFilter = Audio.context.createBiquadFilter()
    static highFilter = Audio.context.createBiquadFilter()
}

export default Audio
