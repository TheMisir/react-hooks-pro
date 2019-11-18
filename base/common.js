import { useState } from "react";
import uuid from 'uuid';

/**
 * @returns {[string, () => void]} Random token which changed when second item - function is called
 * @example
 * var [refreshToken, refresh] = useRefreshToken();
 * 
 * useAsyncEffect(async () => {
 *   // fetch content
 * }, [refreshToken]);
 * 
 * return <button onClick={refresh}>Refresh</button;
 */
export const useRefreshToken = () => {
  var [token, setToken] = useState(() => uuid());

  const refresh = () => {
    setToken(uuid());
  }

  return [token, refresh];
}