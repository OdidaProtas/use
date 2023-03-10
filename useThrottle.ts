import React from "react";

export default function useThrottle(
  changeEvent,
  delay = 700,
  onFinishThrottle = () => {},
  onStartThrottle = () => {}
) {
  const [_timeOut, _setTimeout] = React.useState(null);
  const [throttling, setThrottling] = React.useState(false);

  function handler() {
    onFinishThrottle();
    setThrottling(false);
  }

  function startThrottle() {
    cleanUp();
    onStartThrottle();
    setThrottling(true);
    _setTimeout(() => setTimeout(handler, delay));
  }

  function cleanUp() {
    if (_timeOut) {
      clearTimeout(_timeOut);
      _setTimeout(null);
      setThrottling(false);
    }
  }

  const clear = () => cleanUp();

  React.useEffect(() => {
    if (changeEvent) startThrottle();
    else cleanUp();
    return () => cleanUp();
  }, [changeEvent, delay, onStartThrottle, onFinishThrottle]);

  return [throttling, clear];
}
