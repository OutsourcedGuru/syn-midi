# syn-midi
A JavaScript- & synesthetic-based client-side app for rendering a digital piano and tablature in color, suitable for teaching and learning music theory and piano

> synesthesia: a cross-wiring of different senses in the brain, sometimes experienced as seeing different notes as different colors (for example, composer Franz Liszt)
>
> vexflow by 0xfe is the basis for the tablature-rendering code for HTML5 canvas; my own work from [vexflow-syn](https://github.com/OutsourcedGuru/vexflow-syn) was re-used here to add the synesthetic effects
>  
> Navigator-MIDI-Visuals by ScottMorse is the basis for the visual keyboard I'm using but I'm so many commits ahead that I've broken away from that fork, to be honest

![Screen Shot 2019-05-18 at 7 20 24 PM](https://user-images.githubusercontent.com/15971213/57977024-322dc000-79a3-11e9-829b-d49ce4d731ef.png)

## Overview
The Chrome browser has a bleeding-edge feature that allows access to a MIDI device. As of this version, there is no support in any other browser so this is a requirement.

## Installation (assuming macOS)
First create an alias so that you can run Chrome URLs from the command line. Make sure that you've installed Chrome, of course.

```
nano ~/.bash_profile
```

**Add this:**
```
alias cchrome='/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir="/tmp/chrome_dev_session" --disable-web-security'
```
...and start a new Terminal session to have this new alias available.

```
cd ~/sites
git clone --depth=1 https://github.com/OutsourcedGuru/syn-midi.git
cd syn-midi
cchrome index.html
```

## Current limitations
* At the moment, it will accept a single note at a time, rendering this as a quarter note
* I haven't added any of the black notes for v1.1 (expected next version)
* For practical reasons for this version, I'm limiting the upper range of notes

## vexflow-syn
The underlying vexflow-syn code fully supports some great-looking tablature, as seen below.

![vexflow-syn](https://user-images.githubusercontent.com/15971213/57977034-77ea8880-79a3-11e9-843b-a6ff22824d03.png)

![9crimes](https://user-images.githubusercontent.com/15971213/57977042-ad8f7180-79a3-11e9-9d0b-f80662dd0231.png)

|Description|Version|Author|Last Update|
|:---|:---|:---|:---|
|syn-midi|v1.1|OutsourcedGuru|May 18, 2019|

|Donate||Cryptocurrency|
|:-----:|---|:--------:|
| ![eth-receive](https://user-images.githubusercontent.com/15971213/40564950-932d4d10-601f-11e8-90f0-459f8b32f01c.png) || ![btc-receive](https://user-images.githubusercontent.com/15971213/40564971-a2826002-601f-11e8-8d5e-eeb35ab53300.png) |
|Ethereum||Bitcoin|
