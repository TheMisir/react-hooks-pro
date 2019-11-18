import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

/**
 * @param {boolean} initialValue
 * @param {readonly any[]?} deps
 * @returns {boolean}
 */
export const useKeyboardState = (initialValue = false, deps = []) => {
  var [value, setValue] = useState(initialValue);

  useEffect(() => {
    let subs = [
      Keyboard.addListener("keyboardDidShow", () => setValue(true)),
      Keyboard.addListener("keyboardDidHide", () => setValue(false))
    ];

    return () => {
      subs.forEach(sub => sub.remove());
    };
  }, deps);

  return value;
};
