import { createContext, useContext, useState } from "react";

interface AppContextType {
  theme: string;
  setTheme: (v: string) => void;
}
interface IProps {
  children: React.ReactNode;
}
const AppContext = createContext<AppContextType | null>(null);
//custom Hook
export const useCurrentTheme = () => {
  const currentTheme = useContext(AppContext);
  if (!currentTheme) {
    throw new Error("Theme Error !");
  }
  return currentTheme;
};
const AppProvider = (props: IProps) => {
  const [theme, setTheme] = useState<string>("");
  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
