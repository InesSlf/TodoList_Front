import { createContext } from "react";

export type ToastContextType = {
  showHideToast: (message: string) => void;
};

export const ToastCntxt = createContext<ToastContextType>({
  showHideToast: () => {},
});