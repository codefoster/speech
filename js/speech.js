let recognitionResult, intentResult;
let key, appId, phrases;
let region;
let languageOptions;
let recognizer;
let recognizeButton, stopButton, getIntentsButton;
let soundContext = new AudioContext();

document.addEventListener("DOMContentLoaded", () => {
    createBtn = document.getElementById("createBtn");
    recognizeButton = document.getElementById("recognizeButton");
    stopButton = document.getElementById("stopButton");
    getIntentsButton = document.getElementById("getIntentsButton");
    recognitionResult = document.getElementById("recognitionResult");
    intentResult = document.getElementById("intentResult");
    key = document.getElementById("key");
    appId = document.getElementById("appId");
    phrases = document.getElementById("phrases");
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

        // add  phrases
        if (phrases !== "") {
            let phraseListGrammar = SpeechSDK.PhraseListGrammar.fromRecognizer(recognizer);
            phraseListGrammar.addPhrase(phrases.value.split(";"));
        }

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
                stopButton.click();
            },
            err => {
                console.error("ERROR: " + err);
                recognitionResult.innerHTML += "ERROR: " + err;
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

    getIntentsButton.addEventListener("click", async () => {
        try {
            let query = encodeURIComponent(recognitionResult.value);
            let response = await fetch(
                `https://westus2.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/${appId.value}/slots/staging/predict?query=${query}&verbose=true`,
                { headers: { "Ocp-Apim-Subscription-Key": "b393ca1b09fd454f9870525f7efd9c41" } }
            )
            let data = await response.json();

            intentResult.innerHTML = data.prediction.topIntent;

            console.log("Fetched intents...")
            console.dir(data);
        }
        catch (exc) {
            console.log(exc);
        }
    })

    setButtonEnabled(recognizeButton, true);
});

function setButtonEnabled(button, enabled = true) {
    button.disabled = !enabled;
    if (enabled) button.classList.remove("sb-button--black");
    else button.classList.add("sb-button--black");
}