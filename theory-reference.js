const NOTE_NAMES = ['A','Bb','B','C','Db','D','Eb','E','F','Gb','G','Ab']

const A0_NUM = 21
const MAX_MIDI_NUM = 127

class NoteReference{
  constructor(){
    const midiReference = {}

    const numNotes =  NOTE_NAMES.length
    for(let x = A0_NUM; x <= MAX_MIDI_NUM; x++){
      const letter = NOTE_NAMES[(x - A0_NUM) % numNotes]
      const octave = Math.floor((x - numNotes) / numNotes)
      const name = letter + octave 
      midiReference[x] = { letter, octave, name }
    }

    this.midiRef = midiReference
    this.letterHierarchy = {
      'C': 0, 'Db': 1, 'D': 2,
      'Eb': 3, 'E': 4, 'F': 5,
      'Gb': 6, 'G': 7, 'Ab': 8,
      'A': 9, 'Bb': 10, 'B': 11
    }
  }
}