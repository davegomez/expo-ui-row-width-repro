# @expo/ui: a universal Column inside a universal Row no longer lets its children fill its width on iOS

Since `@expo/ui` 58.0.23, a universal `Column` placed between 2 flexible `Spacer`s in a universal `Row` lays out at its ideal width on iOS. Children that ask for `frame(maxWidth: .infinity)` (here, two outlined `Button`s) shrink to their own labels, so they no longer share one width. In 58.0.22 the `Row` was a SwiftUI `HStack`, and the buttons filled the width with equal widths.

The whole UI is in [`App.js`](App.js). Block A has the bug. Block B is a control: the same `Column` without the `Row` around it.

## Steps

Uses npm and a local native build. Expo Go ships one fixed native version of `@expo/ui`, so it cannot compare versions.

```sh
npm install
npx expo run:ios                                # @expo/ui 58.0.25 (pinned)
npm install @expo/ui@58.0.22 --save-exact
rm -rf ios && npx expo run:ios                  # the last good version
```

## Expected

Block A looks like block B: both buttons have the same width and fill the width that the Row gives the Column, as with a SwiftUI `HStack { Spacer(); VStack { ... }; Spacer() }`.

## Actual

| `@expo/ui` | Block A (Column in a Row) | Block B (Column only) |
|---|---|---|
| 58.0.22 | Equal widths, full width | Equal widths, full width |
| 58.0.23, 58.0.24, 58.0.25 | Each button as wide as its label; the block sits left of center | Equal widths, full width |

Only iOS was checked. The `frame` modifier is iOS-only, so on other platforms the button content does not ask for the full width.

## Versions

expo 58.0.21, @expo/ui 58.0.25, react-native 0.88.0, Xcode 27.1, iPhone 17 simulator on iOS 26.5.
