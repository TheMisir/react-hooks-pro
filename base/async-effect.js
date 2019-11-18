import { useEffect } from "react";

/**
 * @param {(unsubscribed: () => boolean) => Promise<void | (() => void | undefined)>} effect
 * @param {readonly any[]} deps
 */
export const useAsyncEffect = (effect, deps) => {
  useEffect(() => {
    let unsubscribe;
    let unsubscribed = false;

    var result = effect(() => unsubscribed);
    if (result) {
      if ("then" in result) {
        result.then(unsubscriber => {
          unsubscribe = unsubscriber;
        });
      } else {
        unsubscribe = result;
      }
    }

    return () => {
      unsubscribe && unsubscribe();
      unsubscribed = true;
    };
  }, deps);
};
