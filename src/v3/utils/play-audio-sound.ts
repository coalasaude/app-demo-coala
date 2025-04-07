export const playAudioSound = (audioSong: any) => {
  const audio = new Audio(audioSong)
  audio.setAttribute(
    'allow',
    'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
  )
  audio.volume = 0.7
  audio.play()
}
