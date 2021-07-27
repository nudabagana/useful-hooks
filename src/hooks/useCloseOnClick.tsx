import { useEffect, useState } from "react";

const useCloseOnClick = (): [
  boolean,
  (e?: React.MouseEvent<Element, MouseEvent> | undefined) => void
] => {
  const [open, setOpen] = useState(false);

  const onClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setOpen(!open);
  };

  useEffect(() => {
    const handleOnDocumentClick = (e: MouseEvent) => {
      if (!e.defaultPrevented) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleOnDocumentClick, false);
    return () => {
      document.removeEventListener("click", handleOnDocumentClick);
    };
  }, []);

  return [open, onClick];
};

export default useCloseOnClick;
