import React from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { initApiKey } from "../../store/settings/settings";

export const InitAppData: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(initApiKey());
  }, [dispatch]);

  return null;
};
