# Overview

This project challenges to help you learn the basics of using the Azure Speech Service.

Clone the repository and then switch to a challenge branch to get started.

# Challenges

This project is organized into 6 challenges. Each has its own branch for getting started. Switch to a challenge branch by using `git checkout challengeX`.

## Challenge 1 - A Working Website

The simple goal of this challenge is to get a website up and running to give yourself a playground for learning the Azure Speech SDK.

The `challenge1` branch contains a static HTML website. You can serve this website very easily by either launching the `index.html` file with your favorite browser or using some static website server software. I've configured the project with one such tool called `lite-server`. It runs in Node.js, so to use it, do the following...

  * Make sure you have npm installed
  * From the root directory run the following commands...

    ``` bash
    npm install
    npm start
    ```
  * Open `http://localhost:3000` in your browser

> Note that running a website in localhost which itself calls an API from another domain requires a CORS configuration. To bypass this browser requirement, I recommend installing [this](https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc) Chrome extension.

## Challenge 2 - Making Text out of Speech

Now that you have a website up and running, it's time to listen to the microphone and turn it into text.

We have most of the code written for you, so go ahead and `git checkout challenge2` and take a look at it to get familiar with what's going on.

You'll need a key for your Azure Speech instance. We'll show you how to do that in the workshop. If you don't have any way of spinning up an Azure Speech instance, let us know and you can borrow ours ;)

## Challenge 3 - Deriving the Speaker's Intent



## Challenge 4 - Using Phrase Lists to Improve Quality

## Challenge 5 - Using Custom Speech
