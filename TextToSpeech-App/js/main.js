// Init speechsynth API
const synth = window.speechSynthesis;

// DOM elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');
// Init voices array
let voices =[];

const getVoices = () => {
    voices = synth.getVoices();
    
    // loop through voices and create an option for each one
    voices.forEach(voice => {
        // Create an option element
        const option = document.createElement('option');
        // fill the option with voice
        option.textContent = voice.name +'('+ voice.lang +')';

        //set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);

        voiceSelect.appendChild(option);
    
    });
};

getVoices();

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {
    // Check if speaking
    if(synth.speaking){
        console.log('Already speaking');
        return;
    }
    if(textInput.value !== ''){
        // Add background image
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 78.5%';

        // Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        // Speak end
        speakText.onend = e => {
            body.style.background = '#141414';
            console.log('Done Speaking..');
         };

        // Speak error
        speakText.onerror = e =>{
            console.error('Something gone wrong');           
        };

        //Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop Through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                    speakText.voice = voice;
            }
        });

        // set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // speak

        synth.speak(speakText);
    }
};

// Event Listeners

// Text from Submit

textForm.addEventListener('submit',e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// voice select chaneg
voiceSelect.addEventListener('change',e => speak());