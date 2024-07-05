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
      src="https://streams.fluxfm.de/Chillhop/mp3-128/streams.fluxfm.de/"
      loop
    />
  );
};

export default AudioPlayer;