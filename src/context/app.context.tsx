import { createContext, useContext, useState } from "react";

interface AppContextType {
  theme: string;
  setTheme: (v: string) => void;
  appState: IUserLogin | null;
  setAppState: (v: any) => void;
}
interface IProps {
  children: React.ReactNode;
}
const AppContext = createContext<AppContextType | null>(null);
//custom Hook
export const useCurrentApp = () => {
  const currentTheme = useContext(AppContext);
  if (!currentTheme) {
    throw new Error("Theme Error !");
  }
  return currentTheme;
};
const AppProvider = (props: IProps) => {
  const [theme, setTheme] = useState<string>("");
  const [appState, setAppState] = useState<IUserLogin | null>(null);
  return (
    <AppContext.Provider value={{ theme, setTheme, appState, setAppState }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
