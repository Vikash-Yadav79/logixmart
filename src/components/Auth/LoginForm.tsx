// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Input } from '../Common/Input';
// import { Button } from '../Common/Button';
// import { validateEmail, validatePassword } from '../../utils/validators';
// import { useThemedStyles } from '../../hooks/useThemedStyles';

// type LoginFormProps = {
//   onLoginSuccess: () => void;
// };

// export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const styles = useThemedStyles(createStyles);
//   const { colors } = useTheme();

//   const handleLogin = () => {
//     const isEmailValid = validateEmail(email);
//     const isPasswordValid = validatePassword(password);

//     setEmailError(isEmailValid ? '' : 'Please enter a valid email');
//     setPasswordError(isPasswordValid ? '' : 'Password must be at least 6 characters');

//     if (isEmailValid && isPasswordValid) {
//       // Simulate successful login
//       onLoginSuccess();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome Back</Text>
      
//       <Input
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         error={emailError}
//         icon="email"
//       />
      
//       <Input
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         error={passwordError}
//         icon="lock"
//       />
      
//       <Button 
//         title="Login" 
//         onPress={handleLogin} 
//         style={styles.button} 
//         textColor={colors.onPrimary}
//       />
      
//       <TouchableOpacity>
//         <Text style={styles.forgotPassword}>Forgot Password?</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const createStyles = (colors: typeof lightColors) => ({
//   container: {
//     width: '100%',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 32,
//     color: colors.text,
//     textAlign: 'center',
//   },
//   button: {
//     marginTop: 24,
//     backgroundColor: colors.primary,
//   },
//   forgotPassword: {
//     marginTop: 16,
//     color: colors.primary,
//     textAlign: 'center',
//     fontSize: 14,
//   },
// });

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from '../Common/Input';
import { Button } from '../Common/Button';
import { validateEmail, validatePassword } from '../../utils/validators';
import { useTheme } from '../../context/ThemeContext';

type LoginFormProps = {
  onLoginSuccess: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const handleLogin = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setEmailError(isEmailValid ? '' : 'Please enter a valid email');
    setPasswordError(isPasswordValid ? '' : 'Password must be at least 6 characters');

    if (isEmailValid && isPasswordValid) {
      onLoginSuccess();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={emailError}
        icon="email"
      />

      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={passwordError}
        icon="lock"
      />

      <Button
        title="Login"
        onPress={handleLogin}
        style={styles.button}
        textColor={colors.onPrimary}
      />

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: {
  text: string;
  primary: string;
}) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 32,
      color: colors.text,
      textAlign: 'center',
    },
    button: {
      marginTop: 24,
      backgroundColor: colors.primary,
    },
    forgotPassword: {
      marginTop: 16,
      color: colors.primary,
      textAlign: 'center',
      fontSize: 14,
    },
  });
