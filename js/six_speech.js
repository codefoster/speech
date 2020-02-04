let result;
let key, appId, phrases;
let region;
let languageOptions;
let recognizer;
let recognizeButton, stopButton;
let soundContext = new AudioContext();

document.addEventListener("DOMContentLoaded", () => {
    createBtn = document.getElementById("createBtn");
    recognizeButton = document.getElementById("recognizeButton");
    stopButton = document.getElementById("stopButton");
    result = document.getElementById("result");
    key = document.getElementById("key");
    appId = document.getElementById("appId");
    phrases = document.getElementById("phrases");
    languageOptions = document.getElementById("languageOptions");
    region = document.getElementById("region");

    // Demonstrates recognizing a single spoken phrase.
    recognizeButton.addEventListener("click", () => {
        result.innerHTML = "";

        // use the microphone.
        const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(key.value, region.value);
        speechConfig.speechRecognitionLanguage = languageOptions.value;
        recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        // add  phrases
        if (phrases !== "") {
            let phraseListGrammar = SpeechSDK.PhraseListGrammar.fromRecognizer(recognizer);
            phraseListGrammar.addPhrase(phrases.value.split(";"));
        }
        
        // handle intermediate results
        recognizer.recognizing = (s, e) => {
            window.console.log(e);
            result.innerHTML = e.result.text;
        };
        
        // handle final recognition
        recognizer.recognized = (s, e) => {
            window.console.log(e);
            result.innerHTML = e.result.text;
        };
        
        recognizer.canceled = (s, e) => window.console.log(e);
        recognizer.sessionStarted = (s, e) => window.console.log(e);
        recognizer.sessionStopped = (s, e) => window.console.log(e);
        recognizer.speechStartDetected = (s, e) => window.console.log(e);
        recognizer.speechEndDetected = (s, e) => window.console.log(e);

        // process the result
        recognizer.recognizeOnceAsync(
            result => {
                window.console.log(result);
                result.innerHTML = result.text + "\r\n";
                stopButton.click();
            },
            err => {
                window.console.log(err);
                result.innerHTML += "ERROR: " + err;
                stopButton.click();
            });

        setButtonEnabled(recognizeButton, false);
        setButtonEnabled(stopButton, true);
    });

    stopButton.addEventListener("click", () => {
        setButtonEnabled(recognizeButton, true);
        setButtonEnabled(stopButton, false);
        recognizer.close();
        recognizer = undefined;
    });

    setButtonEnabled(recognizeButton, true);
});

function setButtonEnabled(button, enabled = true) {
    button.disabled = !enabled;
    if(enabled)button.classList.remove("sb-button--black");
    else button.classList.add("sb-button--black");
}