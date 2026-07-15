import { useState } from "react";
import MySnackbar from "../components/MySnackBar";
import { ToastCntxt } from "./ToastCntxt";

type Props = {
  children: React.ReactNode;
};

export default function ToastProvider({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message: string) {
    setOpen(true);
    setMessage(message);

    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ToastCntxt.Provider value={{ showHideToast }}>
      <MySnackbar open={open} message={message} />
      {children}
    </ToastCntxt.Provider>
  );
}