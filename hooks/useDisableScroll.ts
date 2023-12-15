"use client";

import { useEffect } from "react";

const useDisableScroll = (disabled: boolean) => {
  useEffect(() => {
    if (disabled) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [disabled]);
};

export default useDisableScroll;
