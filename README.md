# Overview

This project provides challenges to help you learn the basics of using the Azure Speech Service.

Clone the repository and then switch to the `challenge1` branch to get started.

# Challenges

This project is organized into 6 challenges. Each has its own branch for getting started. Switch to a challenge branch by using `git checkout challengeX`.

## Challenge 1 - A Working Website

The simple goal of this challenge is to get a website up and running to give yourself a playground for learning the Azure Speech SDK. The Speech SDK obviously supports a variety of languages, but I'll use JavaScript in the browser because it should work for all of us.

The `challenge1` branch contains a static HTML website. You can serve this website very easily by either launching the `index.html` file with your favorite browser or using some static website server software. I've configured the project with one such tool called `lite-server`. It runs in Node.js, so to use it, do the following...

  * Make sure you have npm installed
    > If you don't have npm installed and want to do that now, I suggest starting with [nvs](https://github.com/jasongin/nvs).

  * From the root directory run the following commands...

    ``` bash
    npm install
    npm start
    ```
  * Open `http://localhost:3000` in your browser
    > Note that running a website in localhost which itself calls an API from another domain requires a CORS configuration. To bypass this browser requirement, I recommend installing [this](https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc) Chrome extension.

## Challenge 2 - Making Text out of Speech

Now that you have a website up and running, it's time to listen to the microphone and turn speech into text.

We have most of the code written for you, so go ahead and `git checkout challenge2` and take a look at it to get familiar with what's going on.

You'll need a key for your Azure Speech instance. We'll show you in the workshop how to go to the [Azure Portal](http://portal.azure.com) to get one. If you don't have any way of spinning up an Azure Speech instance, let us know and you can borrow ours ;)

Once you have your key, launch your website, enter your key and region, hit Recognize, and start speaking. Hopefully everything worked and your speech is transformed like magic into text.

Try to use some jargon or domain specific language. How well does it work?

What if you speak quickly or use a strong accent?

## Challenge 3 - Deriving the Speaker's Intent

Speech that has turned into text may or may not be helpful in your business scenario. What you really want to do is figure out what the user is trying to say - what they _intend_.

That's where _intent recognition_ or _language understanding_ comes into play. Language understanding is a relatively difficult problem, though, and pretty much requires a machine learning model. Thankfully, Microsoft has a service for that, and it's called LUIS ([luis.ai](http://luis.ai)).

To get started, go to [luis.ai](http://luis.ai) and sign in _using the same email address you use in the Azure portal_.

We'll show you in the workshop how to define intents, train your model with sample utterances, publish your model, and grab the app ID and key.

Now, to wire up your UI to not only translate speech to text, but to then send that resulting text to LUIS to make sense of it. Checkout the `challenge3` branch to get the code. When you run it, you'll see field in your UI to enter your app ID and key.

Try it out and see if your intents get triggered!

## Challenge 4 - Using Phrase Lists to Improve Quality

When you wire up speech recognition using Azure Speech the way we have, it uses what we call the _Unified Speech_ model. That's a very general model that was optimized for conversation and transcription. It has _not_, however, been trained using your company's jargon, using your accent, or using the noisy environment you might be using it in. Hopefully, in testing your speech in challenges 1 and 2, you've discoverd some words that it doesn't do such a great job on.

There are a lot of ways to improve recognition, but in this challenge, we're going to use one simple method called _phrase lists_. Phrase lists allow you to still use the Unified Speech model, but send in some phrases that the model will essentially learn from.

Checkout the `challenge4` branch, and then look at the UI and code that have been added.

In the UI, you now have a text field to enter phrases (separated by a semicolon). Enter your particular jargon as phrases and then try your speech recognition again. You should see a dramatic improvement.

Don't forget to look at the changes in the `js/speech.js` file to see how phrases are implemented through the SDK.

## Challenge 5 - Using Custom Speech

Another more powerful step you can take to increase speech recognition quality is to train your own custom model.

Training a model involves providing some text and voice recordings that essentially better inform Azure Speech about not only your particular, but also precisely how your voice sounds and even what your environment sounds like.

We're going to work together in Challenge 5 to train a model. I'll ask you to record some audio clips, transcribe that audio, and then use the [Speech Studio portal](http://speech.microsoft.com) to upload that audio and use it to train a custom model. There are no code changes in the `challenge5` branch, but I did add some audio files in case you're not able to record your own today.

