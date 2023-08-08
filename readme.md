![branches](__badges__/badge-branches.svg)
![functions](__badges__/badge-functions.svg)
![lines](__badges__/badge-lines.svg)
![statements](__badges__/badge-statements.svg)

# Ignite Teams Application

Welcome to the Ignite Teams Application! This repository hosts a simple application designed to help you manage groups, teams, and players. Whether you're an aspiring developer looking to learn new skills or you simply want to explore the world of React Native, this project serves as a great starting point.

## Features

- **Create and Delete Groups**: You can easily create new groups, each with a unique
  name. If you find that a group is no longer needed, you can just as easily delete it.

- **Manage Teams**: Every group is comprised of two teams: Team A and Team B.
  You have the flexibility to assign players to each team as you see fit.

- **Player Management**: Within each team, you can add and remove players. Each
  player is unique by name, ensuring that your team compositions are accurate.

- **Local Storage**: The application utilizes local storage to save your groups
  and players, ensuring that your data is persisted across sessions.

- **Navigation**: Navigate seamlessly between screens, making it intuitive to
  manage your groups, teams, and players. Using the `Stack`` strategy and 
`react-navigation` library.

- **Styling with Styled-Components**: The user interface is designed using
  Styled-Components, allowing for easy styling and customization.

- **Layout Design**: The layout is based on the design available [here](<https://www.figma.com/file/mCivp8SO23BcaHN3RAvS7o/Ignite-Teams-(Community)?type=design&mode=design&t=UqLiHEKcXVBzya36-1>),
  ensuring a modern and engaging user experience.

## Additional features

The following features were added additionally, meaning that learning something new with this application or practice any tech that I'm not used with;

- Unity Testing using [Jest](https://jestjs.io/pt-BR/) and [Testing Library](https://testing-library.com/docs/ecosystem-jest-native);
- Implementation of [MMVK](https://github.com/mrousavy/react-native-mmkv) instead of AsyncStorage;
- Icons/Splash Screen customization;
- Control of components when the Keyboard opens and SafeKeyboardView usage;
- Integration with eslint, prettier, list-stage and husky; (pre-commit linting and testing);

---

<details>
  <summary>Study Notes</summary>
  
  ---

  <details>
    <summary>Testing</summary>

     In the course of developing this project, a deliberate testing approach was undertaken, focused primarily on learning and exploration rather than aiming for absolute code robustness. The goal was to gain insights into testing practices and learn about the testing tools and techniques available.

    While striving for 100% test coverage, it's important to acknowledge that the emphasis was on experimenting with different types of tests rather than solely ensuring code reliability. In some cases, unconventional scenarios were tested to understand how the testing frameworks behave and to explore the boundaries of the codebase.

    It's worth noting that the coverage metric may not always accurately represent the effectiveness of these learning tests. Some components or functionalities might have achieved full coverage but were tested with a learning-oriented mindset rather than guaranteeing bulletproof robustness.

    This approach provided an excellent opportunity to delve into the testing ecosystem and gather insights that may not have been apparent through other development activities. As a result, the project's testing suite is a testament to the learning journey taken during its creation.

  </details>

---

<details>
  <summary>Styled Components</summary>

During the development process, Styled Components were employed for styling, a choice that offered several advantages familiar from the web environment. This included the use of Semantic and Meaningful naming conventions for creating instances of elements/components, as well as the ability to craft custom attributes to facilitate style processing.

However, it's important to note that while Styled Components provided a seamless experience for styling in the React Native context, there were a few aspects that presented challenges or diverged from its web usage:

- **IDE Extension Compatibility**: The Styled Components IDE extension lacked differentiation between web and React Native usage. As a result, it often suggested CSS properties and units that were not supported in the React Native context.

- **Unit Declaration**: Styled Components required the explicit declaration of the `px` unit, even though this is not the case in React Native. This divergence added a layer of complexity when translating styles from web-oriented practices to the React Native environment.

- **Native Component Typing**: Challenges emerged when using Styled Components with default object instantiation for native components. Instances such as `styled.TextInput` often encountered issues with type incompatibility, necessitating the use of parameter instantiation `styled(TextInput)`. This complication sometimes arose when passing references from forward refs.

Despite these challenges, the utilization of Styled Components brought a consistent and familiar styling methodology to the React Native domain. By adapting existing web-oriented knowledge and practices, the project's user interface was crafted with a sense of cohesion and structure.

</details>

<details>
  <summary>Expo / React-Native</summary>

Due the fact that I choose to use `MMVK` storage and the `expo-go` doesn't support it, I had to use the bare version, that is a slower development environment, especially in the first build, and when is needed to make adjusts in the native/ app.json files it is required to rebuild.

Due the usage of a sync storage, It wasn't necessary to use the `Loading Indicators` used in the lesson, the only async processing happens on the app start when loading the fonts, then I choose to extend the `Slash screen` hide process until it's finished.

I did not like the default way of the screen behaves when the keyboard open shrinking the list and pushing things away, I spotted that android and iOS behaves differently, but due the hardware limitations I tested only in android, and I had the opportunity to use the component `KeyboardAvoidingView` to control what is kept in view in the `NewGroup` screen.

</details>

<details>
  <summary>Expo / React-Native</summary>

In the development of the project, I made the deliberate decision to work with the `MMKV` storage solution, foregoing the use of `AsyncStorage` in favor of testing and exploring `MMKV`'s capabilities.

- **Choosing `MMKV` for Storage**: The choice to use `MMKV` was driven by the desire to test and explore its potential as a storage solution. This decision presented a unique set of advantages and considerations, influencing various aspects of the development process.

- **Prebuild for `MMKV` Integration**: To accommodate `MMKV`, I opted to prebuild the project, enabling me to harness the features of `MMKV` without transitioning to the bare version of React Native entirely. This approach allowed for testing the chosen storage solution while still benefiting from Expo's development environment.

- **Development Environment and Build Speed**: Prebuilding the project introduced some nuances to the development environment. Notably, the initial build process was somewhat slower, particularly evident during the first build. Additionally, adjustments to native files like `app.json` required a rebuild.

- **Synchronous Storage and User Experience**: The use of `MMKV` for synchronous storage minimized the need for explicit loading indicators, unlike asynchronous storage solutions. The asynchronous processing mainly occurred during the app's startup, specifically during the font-loading phase. Consequently, I extended the splash screen's hide process until this processing was completed, ensuring a seamless user experience.

- **Keyboard Behavior and `KeyboardAvoidingView`**: An additional challenge involved managing the screen's behavior when the keyboard was activated. This was particularly relevant in the context of Android due to hardware limitations. In addressing this challenge, the `KeyboardAvoidingView` component proved to be a valuable tool for maintaining control over content visibility on the `NewGroup` screen.

By selecting `MMKV` over `AsyncStorage` for learning purposes, the project's development journey was enriched with insights and exploration. This choice highlighted the project's adaptability and willingness to experiment, ultimately contributing to a comprehensive understanding of different storage options within the React Native ecosystem.

</details>

</details>

## Running the Development Environment

In order to run this project, you will need to have Android Studio installed, as it utilizes adb to communicate with either emulated or connected devices.

Installation of Packages
First, install the required packages by running the following command:

```bash
npm install
```

### App Bundling and Device Installation

The subsequent steps involve bundling the app and installing it on either a connected device or an emulator. This process might take some time (a perfect opportunity for a ☕ break).

For Android:

```bash
npm run android
```

For iOS:

```bash
npm run ios
```

### Modifying Deeper Configurations

If you need to modify deeper configurations, such as those in app.json, execute the following command and remember to restart the server afterward. If you're only targeting Android, add the `--platform android` flag:

```bash
npx expo prebuild
```

These instructions guide you through the setup and execution of the development environment for the project. They ensure that you can easily get the app up and running on your desired devices or emulators.
