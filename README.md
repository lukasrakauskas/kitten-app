# Kitten app 🐱

## Prerequisites 📚

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.

## How to use 🚀

- Install packages with `yarn` or `npm install`.
- Run `npm start` to start the bundler.
- Open the project in a React runtime to try it:
  - iOS: [Client iOS](https://itunes.apple.com/app/apple-store/id982107779)
  - Android: [Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample)

## Available scripts 💻

- `npm start` to start the bundler.
- `npm run ios` to start to open in iOS emulator.
- `npm run android` to start to open in Android emulator.
- `npm run lint` to lint the source code.
- `npm run format` to format the source code.

## Notice 📌

- 2.2 ... using placekitten.com API (30/50/100).
  - It's not an API. It's a service for web designers to use while developing mockups without having placeholder images. Thus, I've used a REST API https://cataas.com.
- 3.5 When all data is fetched for the first time store data in AsyncStorage, to allow the user to review kittens when offline
  - This point is inherently wrong because AsyncStorge is key-value string storage and it is wrong to use it for caching images. Therefore I've used a redux persist with AsyncStorage for persisting state and a custom solution for caching image files and linking them with their URLs. Although it is not fully complete, it is working.
