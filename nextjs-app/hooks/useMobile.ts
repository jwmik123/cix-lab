"use client";

import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";

export const useMobile = () => {
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? isMobile : false;
};
