import { create } from 'zustand'

export const useStore = create((set) => ({
  isPlaying: false,
  audioElement: null,
  setAudioElement: (audio) => set({ audioElement: audio }),
  togglePlay: () => set((state) => {
    if (state.audioElement) {
      if (state.isPlaying) {
        state.audioElement.pause();
      } else {
        state.audioElement.play();
      }
    }
    return { isPlaying: !state.isPlaying };
  }),
}));