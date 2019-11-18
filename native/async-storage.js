import { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

/**
 * @param {string} store
 * @returns {{
 *  getItem: (item:string) => Promise<any>,
 *  setItem: (key: string, value: string) => Promise,
 *  removeItem: (key: string) => Promise
 * }}
 */
export const useAsyncStorage = store => ({
  async getItem(key) {
    try {
      return JSON.parse(
        await AsyncStorage.getItem(store ? `${store}:${key}` : key)
      );
    } catch (e) {
      return null;
    }
  },

  setItem(key, value) {
    return AsyncStorage.setItem(
      store ? `${store}:${key}` : key,
      JSON.stringify(value)
    );
  },

  removeItem(key) {
    return AsyncStorage.removeItem(store ? `${store}:${key}` : key);
  }
});

/**
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @param {(e) => void} onError
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]}
 */
export const useStoredState = (key, initialValue, onError = undefined) => {
  let [cachedValue, setCachedValue] = useState(initialValue);
  let [changed, setChanged] = useState(false);

  AsyncStorage.getItem(key, (error, result) => {
    if (!error && !changed)
      try {
        let value = JSON.parse(result);
        setCachedValue(value);
      } catch (e) {
        onError && onError(e);
      }
  });

  const setValue = value => {
    let _value;

    if (typeof value === "function") _value = value(cachedValue);
    else _value = value;

    _value = JSON.stringify(_value);

    AsyncStorage.setItem(key, _value, error => {});

    setCachedValue(_value);
    setChanged(true);
  };

  return [cachedValue, setValue];
};
