import { useEffect } from "react";

/**
 * @param {Function} callback Handler
 * @param {number} ms Delay
 * @param {any[]} deps Effect dependencies
 * @param  {...any} args Callback arguments
 */
export const useTimeoutEffect = (callback, ms, deps, ...args) => {
  useEffect(() => {
    let handle = setTimeout(callback, ms, ...args);
    return () => clearTimeout(handle);
  }, deps);
};

/**
 * @param {Function} callback Handler
 * @param {number} ms Interval
 * @param {any[]} deps Effect dependencies
 * @param  {...any} args Callback arguments
 */
export const useIntervalEffect = (callback, ms, deps, ...args) => {
  useEffect(() => {
    let handle = setInterval(callback, ms, ...args);
    return () => clearInterval(handle);
  }, deps);
};

/**
 *
 * @param {Function} callback Handler
 * @param {number} delay Delay
 * @param {number} interval Interval
 * @param {any[]} deps Effect dependencies
 * @param  {...any} args Callback arguments
 */
export const useTimer = (callback, delay, interval, deps, ...args) => {
  useEffect(() => {
    let timeout, interval;

    if (delay > 0) {
      timeout = setTimeout(() => {
        interval = setInterval(callback, interval, ...args);
        callback(...args);
      }, delay);
    } else {
      interval = setInterval(callback, interval, ...args);
      callback(...args);
    }

    return () => {
      timeout !== undefined && clearTimeout(timeout);
      interval !== undefined && clearInterval(interval);
    };
  }, deps);
};
