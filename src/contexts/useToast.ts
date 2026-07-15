import { useContext } from "react";
import { ToastCntxt } from "./ToastCntxt";

export function useToast() {
  return useContext(ToastCntxt);
}