import { createContext } from "react";
import { useState, useContext } from "react";
import MySnackbar from "../components/MySnackBar";

type ToastContextType = {
  showHideToast: (message: string) => void;
};

const ToastCntxt = createContext<ToastContextType>({
  showHideToast: () => {},
});
type Props = {
  children: React.ReactNode;
};

export const ToastProvider = ({ children }: Props) => {
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
    <>
      <ToastCntxt.Provider value={{ showHideToast }}>
        <MySnackbar open={open} message={message} />
        {children}
      </ToastCntxt.Provider>
    </>
  );
};

export const useToast = () => {
  return useContext(ToastCntxt);
};
