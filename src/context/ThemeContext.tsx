import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'APP_THEME';

const lightTheme = {
  dark: false,
  colors: {
    background: '#ffffff',
    text: '#000000',
    card: '#f0f0f0',
    primary: '#BB86FC',
    secondary: '#03DAC6',
    error: '#CF6679',
    onError: '#FFFFFF',
    onPrimary: '#000000',
    border: '#333333',
    textSecondary: '#666666',
  },
};

const darkTheme = {
  dark: true,
  colors: {
    background: '#000000',
    text: '#ffffff',
    card: '#1e1e1e',
  },
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({children}: any) => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem(THEME_KEY);
      if (stored === 'dark') setTheme(darkTheme);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme.dark ? lightTheme : darkTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme.dark ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
