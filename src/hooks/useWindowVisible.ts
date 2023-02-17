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
] as const;

type DocumentType = Document & typeof browserNaming[number];

const getVisible = (key?: string) => {
  if (key === undefined) {
    return true;
  }
  const isHidden = (document as DocumentType)?.[key];
  if (isHidden !== true && isHidden !== false) {
    return true;
  }
  return !isHidden;
};

const useWindowVisible = (defaultValue?: boolean) => {
  const [visible, setVisible] = useState(defaultValue ?? true);

  useEffect(() => {
    const naming = browserNaming.find(
      ({ hidden }) =>
        document && (document as DocumentType)[hidden] !== undefined
    );

    const onChange = () => setVisible(getVisible(naming?.hidden));

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
