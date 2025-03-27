import { MD3DarkTheme } from 'react-native-paper';

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#43d9e7',
    primaryContainer: '#43d9e7',
    secondary: '#43d9e7',
    secondaryContainer: '#43d9e7',
    accent: '#43d9e7',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    error: '#CF6679',
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
    border: '#2A2A2A',
    card: '#2A2A2A',
    notification: '#43d9e7',
    ripple: '#43d9e7',
    placeholder: '#757575',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    elevation: {
      level0: '#1E1E1E',
      level1: '#2A2A2A',
      level2: '#333333',
      level3: '#3D3D3D',
    },
  },
  roundness: 8,
  animation: {
    scale: 1.0,
  },
}; 