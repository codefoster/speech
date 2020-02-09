let recognitionResult;
let key, appId, phrases;
let region;
let languageOptions;
let recognizer;
let recognizeButton;
let soundContext = new AudioContext();

document.addEventListener("DOMContentLoaded", () => {
    createBtn = document.getElementById("createBtn");
    recognizeButton = document.getElementById("recognizeButton");
    recognitionResult = document.getElementById("recognitionResult");
    key = document.getElementById("key");
    appId = document.getElementById("appId");
    languageOptions = document.getElementById("languageOptions");
    region = document.getElementById("region");

    // Demonstrates recognizing a single spoken phrase.
    recognizeButton.addEventListener("click", () => {
        recognitionResult.innerHTML = "";

        // use the microphone.
        const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(key.value, region.value);
        speechConfig.speechRecognitionLanguage = languageOptions.value;
        recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
        recognizer.recognizing = (s, e) => recognitionResult.innerHTML = e.result.text;
        recognizer.recognized = (s, e) => recognitionResult.innerHTML = e.result.text;
        recognizer.canceled = (s, e) => console.log("Recognition cancelled");
        recognizer.sessionStarted = (s, e) => console.info("Session started");
        recognizer.sessionStopped = (s, e) => console.log("Session ended");
        recognizer.speechStartDetected = (s, e) => console.log("Speech start detected");
        recognizer.speechEndDetected = (s, e) => console.log("Speech end detected");

        // process the result
        recognizer.recognizeOnceAsync(
            result => {
                recognitionResult.innerHTML = result.text + "\r\n";
                recognizer.close();
                recognizer = undefined;
                setButtonEnabled(recognizeButton, true);
            },
            err => {
                console.error("ERROR: " + err);
                recognitionResult.innerHTML += "ERROR: " + err;
                recognizer.close();
                recognizer = undefined;
                setButtonEnabled(recognizeButton, true);
            });

        setButtonEnabled(recognizeButton, false);
    });

    setButtonEnabled(recognizeButton, true);
});

function setButtonEnabled(button, enabled = true) {
    button.disabled = !enabled;
}