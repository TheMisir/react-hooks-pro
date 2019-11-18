import { useState, useCallback } from "react";

/**
 * @returns {[{width: number, height:number}, ((event) => void)]} Size object and onLayout event callback
 * @example
 * var [size, onLayout] = useComponentSize();
 * 
 * return (
 *   <View onLayout={onLayout}>
 *     ...
 *   </View>
 * );
 */
export const useComponentSize = () => {
  const [size, setSize] = useState(null);

  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};
