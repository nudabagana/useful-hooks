import { useEffect, useState } from "react";

const browserNaming = [
  {
    hidden: "hidden",
    event: "visibilitychange",
    state: "visibilityState",
  },
  {
    hidden: "webkitHidden",
    event: "webkitvisibilitychange",
    state: "webkitVisibilityState",
  },
  {
    hidden: "mozHidden",
    event: "mozvisibilitychange",
    state: "mozVisibilityState",
  },
  {
    hidden: "msHidden",
    event: "msvisibilitychange",
    state: "msVisibilityState",
  },
  {
    hidden: "oHidden",
    event: "ovisibilitychange",
    state: "oVisibilityState",
  },
];

const naming = browserNaming.find(
  ({ hidden }) => document && (document as any)[hidden] !== undefined
);

const getVisible = (key?: string) => {
  if (key === undefined) {
    return true;
  }
  const isHidden = (document as any)[key];
  if (isHidden !== true && isHidden !== false) {
    return true;
  }
  return !isHidden;
};

const useWindowVisible = () => {
  const [visible, setVisible] = useState(getVisible(naming?.hidden));
  const onChange = () => setVisible(getVisible(naming?.hidden));

  useEffect(() => {
    if (naming && !!document.addEventListener) {
      document.addEventListener(naming.event, onChange);
    }
    return () => {
      if (naming && !!document.removeEventListener) {
        document.removeEventListener(naming.event, onChange);
      }
    };
  }, []);

  return visible;
};

export default useWindowVisible;
