var canvasWidth       = 1300;
var canvasTopMargin   = 100;
var canvasLeftMargin  = 30;
var keySigWidth       = 80;
var staveHeight       = 120;
var beatsValue        = 4;
var numStaves         = 2;
var canvas            = document.getElementById("canvasScore")
var renderer          = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
var ctxRenderer       = renderer.getContext();
var arrayVoices       = [numStaves / 2];
var arrayBraces       = [numStaves / 2];
var leftDecoration    = [numStaves / 2];
var rightDecoration   = [numStaves / 2];
var arrayNoteArrays   = [numStaves];
var arrayAccArrays    = [numStaves];
var arrayBeats        = [numStaves];
var arrayStaves       = [numStaves];
var VFS               = Vex.Flow.StaveNote;
arrayNoteArrays[0] =  [];
arrayNoteArrays[1] =  [];
arrayAccArrays[0] =   [];
arrayAccArrays[1] =   [];

showNotes();

// --------------------------------------------------------------------------------------------
// Functions follow
// --------------------------------------------------------------------------------------------
function addNote(strNote) {
  if (isUpper(strNote)) {
    var vfsNote = new VFS({ keys: [convertNote(strNote, true)], duration: "q" });
    var vfsRest = new VFS({ clef: "bass", keys: ["f/3"], duration: "qr" });
    arrayNoteArrays[0].push(vfsNote);
    arrayNoteArrays[1].push(vfsRest);
    arrayAccArrays[0].push(true);
    arrayAccArrays[1].push(true);
  } else {
    var vfsNote = new VFS({ clef: "bass", keys: [convertNote(strNote, false)], duration: "q" });
    var vfsRest = new VFS({ keys: ["b/4"], duration: "qr" });
    arrayNoteArrays[0].push(vfsRest);
    arrayNoteArrays[1].push(vfsNote);
    arrayAccArrays[0].push(true);
    arrayAccArrays[1].push(true);
  }
  if (noteLength(arrayNoteArrays, 0) % 4 == 0) {
    arrayNoteArrays[0].push(new Vex.Flow.BarNote());
    arrayNoteArrays[1].push(new Vex.Flow.BarNote());
    arrayAccArrays[0].push(true);
    arrayAccArrays[1].push(true);
  }
}

function noteLength(arr, index) {
  var noteCount = 0;
  for (var i=0; i<arr[index].length; i++) {
    if (arr[index][i].keys) noteCount++;
  }
  return noteCount;
}

function isUpper(strNote) {
  var octave =        parseInt(strNote.slice(-1));
  var noteOrdinal =   strNote.charAt(0) - 'A';
  if (octave < 4)  // A lower number means that more notes appear in the treble clef
    return false;
  return true;
}

function convertNote(strNote, isUpper) {
  if (isUpper) {
    switch (strNote) {
      case 'C4':   return 'c/4';      case 'Db4':  return 'c#/4';     case 'D4':   return 'd/4';      case 'Eb4':  return 'eb/4';
      case 'E4':   return 'e/4';      case 'F4':   return 'f/4';      case 'Gb4':  return 'f#/4';     case 'G4':   return 'g/4';
      case 'Ab4':  return 'g#/4';     case 'A4':   return 'a/4';      case 'Bb4':  return 'bb/4';     case 'B4':   return 'b/4';
      case 'C5':   return 'c/5';      case 'Db5':  return 'c#/5';     case 'D5':   return 'd/5';      case 'Eb5':  return 'eb/5';
      case 'E5':   return 'e/5';      case 'F5':   return 'f/5';      case 'Gb5':  return 'f#/5';      case 'G5':   return 'g/5';
      case 'Ab5':  return 'g#/5';     case 'A5':   return 'a/5';      case 'Bb5':  return 'bb/5';     case 'B5':   return 'b/5';
      case 'C6':   return 'c/6';      case 'Db6':  return 'c#/6';     case 'D6':   return 'd/6';      case 'Eb6':  return 'eb/6';
      case 'E6':   return 'e/6';      case 'F6':   return 'f/6';      case 'Gb6':  return 'f#/6';     case 'G6':   return 'g/6';
      case 'Ab6':  return 'g#/6';     case 'A6':   return 'a/6';      case 'Bb6':  return 'bb/6';     case 'B6':   return 'b/6';
      case 'C7':   return 'c/7';      case 'Db7':  return 'c#/7';     case 'D7':   return 'd/7';      case 'Eb7':  return 'eb/7';
      case 'E7':   return 'e/7';      case 'F7':   return 'f/7';      case 'Gb7':  return 'f#/7';     case 'G7':   return 'g/7';
      case 'Ab7':  return 'g#/7';     case 'A7':   return 'a/7';      case 'Bb7':  return 'bb/7';     case 'B7':   return 'b/7';
      case 'C8':   return 'c/8';
    }
  } else {
    switch (strNote) {
      case 'A0':   return 'a/0';      case 'Bb0':  return 'bb/0';     case 'B0':   return 'b/0';      case 'C1':   return 'c/1';
      case 'Db1':  return 'c#/1';     case 'D1':   return 'd/1';      case 'Eb1':  return 'eb/1';     case 'E1':   return 'e/1';
      case 'F1':   return 'f/1';      case 'Gb1':  return 'f#/1';     case 'G1':   return 'g/1';      case 'Ab1':  return 'g#/1';
      case 'A1':   return 'a/1';      case 'Bb1':  return 'bb/1';     case 'B1':   return 'b/1';      case 'C2':   return 'c/2';
      case 'Db2':  return 'c#/2';     case 'D2':   return 'd/2';      case 'Eb2':  return 'eb/2';     case 'E2':   return 'e/2';
      case 'F2':   return 'f/2';      case 'Gb2':  return 'f#/2';     case 'G2':   return 'g/2';      case 'Ab2':  return 'g#/2';
      case 'A2':   return 'a/2';      case 'Bb2':  return 'bb/2';     case 'B2':   return 'b/2';      case 'C3':   return 'c/3';
      case 'Db3':  return 'c#/3';     case 'D3':   return 'd/3';      case 'Eb3':  return 'eb/3';     case 'E3':   return 'e/3';
      case 'F3':   return 'f/3';      case 'Gb3':  return 'f#/3';     case 'G3':   return 'g/3';      case 'Ab3':  return 'g#/3';
      case 'A3':   return 'a/3';      case 'Bb3':  return 'bb/3';     case 'B3':   return 'b/3';
    }  
  }
}

function showNotes() {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  // ------------------------------------------------------------------------------------------
  // Walk each stave's notes to adjust their color, to add accidentals and at the
  // end of each outermost iteration, draw them onto the respective stave.
  // ------------------------------------------------------------------------------------------
  var i, j, staveIterator
  for (var z=0; z<numStaves; z++) arrayBeats[z] = 0;

  // ------------------------------------------------------------------------------------------
  // Create the staves and draw them
  // ------------------------------------------------------------------------------------------
  // Each of these are pairs of staves (treble/bass). Even-numbered stave lookups then will be
  // treble; odd are bass clef staves.
  arrayStaves[0]        = new Vex.Flow.Stave(canvasLeftMargin, canvasTopMargin, canvasWidth);
  arrayStaves[0].addClef("treble").addTimeSignature("4/4").setContext(ctxRenderer).draw();
  arrayStaves[1]        = new Vex.Flow.Stave(canvasLeftMargin, canvasTopMargin + staveHeight, canvasWidth);
  arrayStaves[1].addClef("bass").addTimeSignature("4/4").setContext(ctxRenderer).draw();

  for (var z=0; z<numStaves; z+=2) {
    arrayBraces[z]        = new Vex.Flow.StaveConnector(arrayStaves[z], arrayStaves[z+1]).setType(3);
    leftDecoration[z]     = new Vex.Flow.StaveConnector(arrayStaves[z], arrayStaves[z+1]).setType(1);
    rightDecoration[z]    = new Vex.Flow.StaveConnector(arrayStaves[z], arrayStaves[z+1]).setType(6);
    arrayBraces[z].setContext(ctxRenderer).draw();
    leftDecoration[z].setContext(ctxRenderer).draw();
    rightDecoration[z].setContext(ctxRenderer).draw();
  };

  // ------------------------------------------------------------------------------------------
  // The variable staveIterator is used to walk through the outermost array of the
  // arrays of notes.  arrayNoteArrays[staveIterator] (for staveIterator=0) then
  // points to the notes of the first note array.
  // ------------------------------------------------------------------------------------------
  for (staveIterator=0; staveIterator<arrayNoteArrays.length; staveIterator++) {
    // ----------------------------------------------------------------------------------------
    // The variable i is used to walk through a particular notes array like
    // arrayNoteArrays[0][], for example.  notesArray[staveIterator][i]
    // (for staveIterator=0, i=0) then points to the initial B note of the first
    // stave's note array.
    // ----------------------------------------------------------------------------------------
    for (i=0; i < arrayNoteArrays[staveIterator].length; i++) {
      if (staveIterator == 0 && arrayNoteArrays[staveIterator][i].keys)
        console.log(arrayNoteArrays[staveIterator][i].keys[0]);
      if (arrayNoteArrays[staveIterator][i].keys) { // Returns false if this isn't a key/rest
        switch (arrayNoteArrays[staveIterator][i].duration) {
          case 'w':
            arrayBeats[staveIterator] += arrayNoteArrays[staveIterator][i].isDotted() ? 24 : 16;
            break;
          case 'h':
            arrayBeats[staveIterator] += arrayNoteArrays[staveIterator][i].isDotted() ? 12 : 8;
            break;
          case 'q':
            arrayBeats[staveIterator] += arrayNoteArrays[staveIterator][i].isDotted() ? 6 : 4;
            break;
          case '8':
            arrayBeats[staveIterator] += arrayNoteArrays[staveIterator][i].isDotted() ? 3 : 2;
            break;
        }

        // ------------------------------------------------------------------------------------
        // The variable j is used to walk through each key in a particular chord
        // for a particular arrayNoteArrays[staveIterator][i][] array element.
        // ------------------------------------------------------------------------------------
        for (j=0; j < arrayNoteArrays[staveIterator][i].keys.length; j++) {
          // Here's where all the colorization happens, to include the application
          // of accidentals
          switch (arrayNoteArrays[staveIterator][i].keys[j]) {
            // --------------------------------------------------------------------------------
            // C = red
            // --------------------------------------------------------------------------------
            case "c/8":   case "c/7":   case "c/6":   case "c/5":   case "c/4":   case "c/3":   case "c/2":   case "c/1":
              if (arrayNoteArrays[staveIterator][i].keys.length == 1)
                arrayNoteArrays[staveIterator][i].setStyle({strokeStyle: "#ff0000"});
              arrayNoteArrays[staveIterator][i].setKeyStyle(j, {fillStyle: "#ff0000"});
              if (arrayNoteArrays[staveIterator][i].isDotted())
                arrayNoteArrays[staveIterator][i].addDotToAll();
              break;
            // --------------------------------------------------------------------------------
            // C# = pastel red
            // --------------------------------------------------------------------------------
            case "c#/7":  case "c#/6":  case "c#/5":  case "c#/4":  case "c#/3":  case "c#/2":  case "c#/1":
              if (arrayNoteArrays[staveIterator][i].keys.length == 1)
                arrayNoteArrays[staveIterator][i].setStyle({strokeStyle: "#cc6666"});
              arrayNoteArrays[staveIterator][i].setKeyStyle(j, {fillStyle: "#cc6666"});
              if (arrayAccArrays[staveIterator][i]) {
                arrayNoteArrays[staveIterator][i].addAccidental(j, new Vex.Flow.Accidental("#"));
                arrayAccArrays[staveIterator][i] = false;  
              }
              if (arrayNoteArrays[staveIterator][i].isDotted())
                arrayNoteArrays[staveIterator][i].addDotToAll();
              break;
            // --------------------------------------------------------------------------------
            // D = orange
            // --------------------------------------------------------------------------------
            case "d/7":   case "d/6":   case "d/5":   case "d/4":   case "d/3":   case "d/2":   case "d/1":
              if (arrayNoteArrays[staveIterator][i].keys.length == 1)
                arrayNoteArrays[staveIterator][i].setStyle({strokeStyle: "#ff9900"});
              arrayNoteArrays[staveIterator][i].setKeyStyle(j, {fillStyle: "#ff9900"});
              if (arrayNoteArrays[staveIterator][i].isDotted())
                arrayNoteArrays[staveIterator][i].addDotToAll();
              break;
            // --------------------------------------------------------------------------------
            // Eb = pastel orange
            // --------------------------------------------------------------------------------
            case "eb/7":  case "eb/6":  case "eb/5":  case "eb/4":  case "eb/3":  case "eb/2":  case "eb/1":
              if (arrayNoteArrays[staveIterator][i].keys.length == 1)
                arrayNoteArrays[staveIterator][i].setStyle({strokeStyle: "#f8cc99"});
              arrayNoteArrays[staveIterator][i].setKeyStyle(j, {fillStyle: "#f8cc99"});
              if (arrayAccArrays[staveIterator][i]) {
                arrayNoteArrays[staveIterator][i].addAccidental(j, new Vex.Flow.Accidental("b"));
                arrayAccArrays[staveIterator][i] = false;  
              }
              if (arrayNoteArrays[staveIterator][i].isDotted())
                arrayNoteArrays[staveIterator][i].addDotToAll();
              break;
            // --------------------------------------------------------------------------------
            // E = yellow
            // --------------------------------------------------------------------------------
            case "e/7":   case "e/6":   case "e/5":   case "e/4":   case "e/3":   case "e/2":   case "e/1":
              if (arrayNoteArrays[staveIterator][i].keys.length == 1)
                arrayNoteArrays[staveIterator][i].setStyle({strokeStyle: "#ffff00"});
              arrayNoteArrays[staveIterator][i].setKeyStyle(j, {fillStyle: "#ffff00"});
              if (arrayNoteArrays[staveIterator][i].isDotted())
                arrayNoteArrays[staveIterator][i].addDotToAll();
              break;
            // --------------------------------------------------------------------------------
            // F = green
            // --------------------------------------------------------------------------------
            case "f/7":   case "f/6":   case "f/5":   case "f/4":   case "f/3":   case "f/2":   case "f/1":
              if (arrayNoteArrays[staveIterator][i].isRest())
                break;  // Since quarter, half and whole-note rests in bass cleff sit on the F line
              if (arrayNoteArrays[staveIterator][i].isRest())
                break;  // Since rests sit on the F space in the bass clef
              if (arrayNoteArrays[staveIterator][i].keys.length == 1)
                arrayNoteArrays[staveIterator][i].setStyle({strokeStyle: "#00ff00"});
              arrayNoteArrays[staveIterator][i].setKeyStyle(j, {fillStyle: "#00ff00"});
              if (arrayNoteArrays[staveIterator][i].isDotted())
                arrayNoteArrays[staveIterator][i].addDotToAll();
              break;
            // --------------------------------------------------------------------------------
            // F# = pastel green
            // --------------------------------------------------------------------------------
            case "f#/7":  case "f#/6":  case "f#/5":  case "f#/4":  case "f#/3":  case "f#/2":  case "f#/1":
              if (arrayNoteArrays[staveIterator][i].keys.length == 1)
                arrayNoteArrays[staveIterator][i].setStyle({strokeStyle: "#66cc66"});
              arrayNoteArrays[staveIterator][i].setKeyStyle(j, {fillStyle: "#66cc66"});
              if (arrayAccArrays[staveIterator][i]) {
                arrayNoteArrays[staveIterator][i].addAccidental(j, new Vex.Flow.Accidental("#"));
                arrayAccArrays[staveIterator][i] = false;  
              }
              if (arrayNoteArrays[staveIterator][i].isDotted())
                arrayNoteArrays[staveIterator][i].addDotToAll();
              break;
            // --------------------------------------------------------------------------------
            // G = blue
            // --------------------------------------------------------------------------------
            case "g/7":   case "g/6":   case "g/5":   case "g/4":   case "g/3":   case "g/2":   case "g/1":
              if (arrayNoteArrays[staveIterator][i].keys.length == 1)
                arrayNoteArrays[staveIterator][i].setStyle({strokeStyle: "#0000ff"});
              arrayNoteArrays[staveIterator][i].setKeyStyle(j, {fillStyle: "#0000ff"});
              if (arrayNoteArrays[staveIterator][i].isDotted())
                arrayNoteArrays[staveIterator][i].addDotToAll();
              break;
            // --------------------------------------------------------------------------------
            // G# = pastel blue
            // --------------------------------------------------------------------------------
            case "g#/7":  case "g#/6":  case "g#/5":  case "g#/4":  case "g#/3":  case "g#/2":  case "g#/1":
              if (arrayNoteArrays[staveIterator][i].keys.length == 1)
                arrayNoteArrays[staveIterator][i].setStyle({strokeStyle: "#6666cc"});
              arrayNoteArrays[staveIterator][i].setKeyStyle(j, {fillStyle: "#6666cc"});
              if (arrayAccArrays[staveIterator][i]) {
                arrayNoteArrays[staveIterator][i].addAccidental(j, new Vex.Flow.Accidental("#"));
                arrayAccArrays[staveIterator][i] = false;  
              }
              if (arrayNoteArrays[staveIterator][i].isDotted())
                arrayNoteArrays[staveIterator][i].addDotToAll();
              break;
            // --------------------------------------------------------------------------------
            // A = purple
            // --------------------------------------------------------------------------------
            case "a/7":   case "a/6":   case "a/5":   case "a/4":   case "a/3":   case "a/2":   case "a/1":   case "a/0":
              if (arrayNoteArrays[staveIterator][i].keys.length == 1)
                arrayNoteArrays[staveIterator][i].setStyle({strokeStyle: "#6633cc"});
              arrayNoteArrays[staveIterator][i].setKeyStyle(j, {fillStyle: "#6633cc"});
              if (arrayNoteArrays[staveIterator][i].isDotted())
                arrayNoteArrays[staveIterator][i].addDotToAll();
              break;
            // --------------------------------------------------------------------------------
            // Bb = pastel violet
            // --------------------------------------------------------------------------------
            case "bb/7":  case "bb/6":  case "bb/5":  case "bb/4":  case "bb/3":  case "bb/2":  case "bb/1":  case "bb/0":
              if (arrayNoteArrays[staveIterator][i].keys.length == 1)
                arrayNoteArrays[staveIterator][i].setStyle({strokeStyle: "#9955d0"});
              arrayNoteArrays[staveIterator][i].setKeyStyle(j, {fillStyle: "#9955d0"});
              if (arrayAccArrays[staveIterator][i]) {
                arrayNoteArrays[staveIterator][i].addAccidental(j, new Vex.Flow.Accidental("b"));
                arrayAccArrays[staveIterator][i] = false;  
              }
              if (arrayNoteArrays[staveIterator][i].isDotted())
                arrayNoteArrays[staveIterator][i].addDotToAll();
              break;
            // --------------------------------------------------------------------------------
            // B = violet
            // --------------------------------------------------------------------------------
            case "b/7":   case "b/6":   case "b/5":   case "b/4":   case "b/3":   case "b/2":   case "b/1":   case "b/0":
              if (arrayNoteArrays[staveIterator][i].isRest())
                break;  // Since half-note rests sit on the B line
              if (arrayNoteArrays[staveIterator][i].keys.length == 1)
                arrayNoteArrays[staveIterator][i].setStyle({strokeStyle: "#ff66ff"});
              arrayNoteArrays[staveIterator][i].setKeyStyle(j, {fillStyle: "#ff66ff"});
              if (arrayNoteArrays[staveIterator][i].isDotted())
                arrayNoteArrays[staveIterator][i].addDotToAll();
              break;

            default:
              break;
          }
        }
      }
    }
  }

  arrayVoices[0] = [
    new Vex.Flow.Voice({num_beats: arrayBeats[0], beat_value: 16}).addTickables(arrayNoteArrays[0]),
    new Vex.Flow.Voice({num_beats: arrayBeats[1], beat_value: 16}).addTickables(arrayNoteArrays[1])
  ];
  if (arrayNoteArrays[0].length > 0) {
    // The formatter does not appear to compensate for the width of the key signature, so we fudge this
    // below with the number 80.
    var formatter = new Vex.Flow.Formatter().joinVoices(arrayVoices[0]).format(arrayVoices[0], canvasWidth - keySigWidth);
    // Draw the first two voices on the first set of staves
    arrayVoices[0][0].draw(ctxRenderer, arrayStaves[0]);
    arrayVoices[0][1].draw(ctxRenderer, arrayStaves[1]);
  }
}
