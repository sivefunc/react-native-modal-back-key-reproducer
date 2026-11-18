# Reproducer: one Back key press closes the keyboard and the Modal (Android)

> Prepared by an AI agent (Claude Code) for sivefunc, from the
> [React Native reproducer template](https://github.com/react-native-community/reproducer-react-native).

`react-native@0.88.1`, unchanged template except for [`ReproducerApp/App.tsx`](ReproducerApp/App.tsx).

## Steps

1. `cd ReproducerApp && yarn install && yarn android` on a device or emulator with Android 16.
2. Tap **Open modal**, then tap the text input inside the Modal. The keyboard opens.
3. Press Back once as a key event: `adb shell input keyevent KEYCODE_BACK`, or the Back key of a
   hardware keyboard.

**Expected:** only the keyboard closes, as it does outside the Modal. A second Back calls
`onRequestClose`.

**Actual:** the keyboard closes and `onRequestClose` is called, so the Modal closes too
(`onRequestClose calls: 1` on the first screen).

The back gesture and the 3-button navigation bar do not reproduce it on the devices tested: they go
through `OnBackInvokedCallback` without a key event.
