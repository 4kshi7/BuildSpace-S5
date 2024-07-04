import React, { useEffect, useRef } from 'react';
import { useStore } from './store';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const { setAudioElement } = useStore();

  useEffect(() => {
    if (audioRef.current) {
      setAudioElement(audioRef.current);
    }
  }, [setAudioElement]);

  return (
    <audio
      ref={audioRef}
      src="https://fluxfm.streamabc.net/flx-chillhop-mp3-128-8581707?sABC=6686r6n0%230%236o0ss9q4o6o5o4920p98s838o4r6on9n%23fgernzf.syhksz.qr&aw_0_1st.playerid=streams.fluxfm.de&amsparams=playerid:streams.fluxfm.de;skey:1720116896"
      loop
    />
  );
};

export default AudioPlayer;