class DomPiano {
  constructor(minOctave, maxOctave, noteReference){
    const { midiRef } = noteReference

    const pianoKeysEl = document.getElementById('piano-keys')
    const pianoKeyElReference = {}

    const keyScoresEl = document.getElementById('key-scores')
    const keyScoreElReference = {}

    let previousEl
    for( const midiVal in midiRef ){
      const { octave, name } = midiRef[midiVal]
      if(octave >= minOctave && octave <= maxOctave){
        if (octave < maxOctave) {
          // Standard (full) octaves
          const el = document.createElement('div')
          pianoKeyElReference[name] = el
          el.id = 'piano-key-' + name
          el.className = 'piano-key'
          if(name.includes('b')){
            el.className += ' black'
            el.dataset.color = 'black'
            el.appendChild(document.createElement('div'))
            previousEl && previousEl.appendChild(el)
          }
          else{
            el.className += ' white'
            el.dataset.color = 'white'
            if(name.match(/[EB]\d/)){
              el.className += ' eb'
            }
            pianoKeysEl.appendChild(el)
            previousEl = el
          }  
        } else {
          // Single C note at the end to make 88 keys
          const el = document.createElement('div')
          pianoKeyElReference[name] = el
          el.id = 'piano-key-' + name
          el.className = 'piano-key'
          el.className += ' white'
          el.dataset.color = 'white'
          pianoKeysEl.appendChild(el)
          previousEl = el
          break
        }
      }
    }

    const numWhiteKeys = Object.values(pianoKeyElReference).filter(v => v.className.includes('white')).length
    const prctPerWhiteKey = 100 / numWhiteKeys

    let pos = 0;
    for(const key in pianoKeyElReference){
      const el = pianoKeyElReference[key]

      const keyScoreEl = document.createElement('div')
      keyScoreEl.className = "key-score"

      let offset
      if(el.dataset.color === "black"){
        offset = prctPerWhiteKey * .6
        pos += offset
        el.style.transform = `translateX(${prctPerWhiteKey * .7 + 'vw'})`
        el.dataset.bPos = -pos + 'vw'
      }
      else{
        offset = prctPerWhiteKey
        pos += offset / 2
      }
      keyScoreEl.style.minWidth = keyScoreEl.style.maxWidth = el.style.minWidth = el.style.maxWidth = offset + 'vw'

      keyScoresEl.appendChild(keyScoreEl)
      keyScoreElReference[key] = keyScoreEl
    }

    this.elRef = pianoKeyElReference
    this.noteRef = noteReference
    this.keyScoreElRef = keyScoreElReference
    this.score = 0
    this.scoreTrackerEl = document.getElementById('score-tracker')
    this.noteTracker = new NoteTracker(noteReference)
  }

  getNoteColor = (note) => {
    switch (note) {
      case 'C':   return 'rgb(255,0,0)';         break;
      case 'Db':  return 'rgb(204,102,102)';     break;
      case 'D':   return 'rgb(255,153,0)';       break;
      case 'Eb':  return 'rgb(248,204,153)';     break;
      case 'E':   return 'rgb(255,255,0)';       break;
      case 'F':   return 'rgb(0,255,0)';         break;
      case 'Gb':  return 'rgb(102,204,102)';     break;
      case 'G':   return 'rgb(0,0,255)';         break;
      case 'Ab':  return 'rgb(102,102,204)';     break;
      case 'A':   return 'rgb(102,51,204)';      break;
      case 'Bb':  return 'rgb(153,85,208)';      break;
      case 'B':   return 'rgb(255,102,255)';     break;
    }
  }

  getNote = (noteName, isBlack) => {
    return noteName.substr(0, isBlack ? 2 : 1)
  }

  noteOn = (noteName,velocity) => {
    const el = this.elRef[noteName]

    this.score += velocity
    this.scoreTrackerEl.innerHTML = `Jazz Points: ` + this.score

    this.noteTracker.add(noteName)
  
    if(el.dataset.color === 'black'){
      el.style.backgroundSize = '100vw'
      el.style.backgroundPositionX = el.dataset.bPos
      el.style.animation = 'fadeIn .15s ease'
      el.style.backgroundColor = this.getNoteColor(this.getNote(noteName, true))
      setTimeout(() => el.style.animation = '',150)
    }
    else{
      el.style.animation = 'fadeIn .15s ease'
      el.style.backgroundColor = this.getNoteColor(this.getNote(noteName, false))
      setTimeout(() => el.style.animation = '',150)
    }
    addNote(noteName);
    showNotes();
  }

  noteOff = (noteName) => {
    const el = this.elRef[noteName]

    this.noteTracker.remove(noteName)

    if(el.dataset.color === 'black'){
      el.style.background = 'black'
      el.style.animation = 'fadeOut .15s ease'
      setTimeout(() => el.style.animation = '',150)
    }
    else{
      el.style.backgroundColor = 'rgb(228, 216, 209)'      // See also style.css .piano-key
    }
  }

  blinkNote = (noteName, velocity) => {
    const keyScoreEl = this.keyScoreElRef[noteName]

    keyScoreEl.innerHTML = "+" + velocity
    keyScoreEl.style.transition = ''
    keyScoreEl.style.transform = 'translateY(0vh)'
    keyScoreEl.style.opacity = 0
    keyScoreEl.innerHTML = "+" + velocity
    void keyScoreEl.offsetWidth
    keyScoreEl.style.transition = 'opacity 0.5s ease, transform 1s ease'
    keyScoreEl.style.transform = `translateY(-${velocity / 2}vh)`
    keyScoreEl.style.opacity = 1
    setTimeout(() => {
      keyScoreEl.style.opacity = 0
      keyScoreEl.style.transform =  'translateY(0vh)'
      keyScoreEl.style.transition = ''
    },1000)
  }
}

class NoteTracker {

  constructor(noteReference){
    this.el = document.getElementById('note-tracker')  
    this.notesOn = []
    this.noteRef = noteReference
  }

  add = (noteName) =>{
    if(!this.notesOn.includes(noteName)){
      this.notesOn.push(noteName)
      this.update()
    }
  }

  remove = (noteName) => {
    this.notesOn.splice(this.notesOn.indexOf(noteName),1) 
    this.update()
  }

  update = () => {
    let notesOnCopy = this.notesOn.slice()
    const { letterHierarchy } = this.noteRef

    notesOnCopy.sort((a,b) => {
      const aoct = a.replace(/[A-Gb]/g,'') 
      const boct = b.replace(/[A-Gb]/g,'')
      const alet = a.replace(/\d/g,'')
      const blet = b.replace(/\d/g,'')
      if(aoct > boct){
        return 1
      }
      else if(boct > aoct){
        return -1
      }
      else if(letterHierarchy[alet] > letterHierarchy[blet]){
        return 1
      }
      else{
        return -1
      }
    })
    this.el.innerHTML = notesOnCopy.join(' ')
    this.notesOn = notesOnCopy
  }
}