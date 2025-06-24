import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {RootStackParamList} from '../../types/navigation';
import ControlledInput from '../../components/Contoroller/ControlledInput';
import {lightColors, darkColors} from '../../constants/colors';

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

interface FormValues {
  email: string;
  password: string;
}

// Yup Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const colors = isDarkMode ? darkColors : lightColors;

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormValues>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      await AsyncStorage.setItem('userEmail', data.email);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Main'}],
        }),
      );
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: 'Invalid credentials',
        position: 'top',
      });
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Theme Toggle */}
      <TouchableOpacity
        style={[styles.themeToggle, {backgroundColor: colors.secondary}]}
        onPress={() => setIsDarkMode(!isDarkMode)}>
        <Text style={[styles.themeToggleText, {color: colors.onSecondary}]}>
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.title, {color: colors.text}]}>Welcome Back</Text>
      {/* Email Input */}
      <ControlledInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        required
        isDarkMode={isDarkMode}
      />
      {/* Password Input */}
      <ControlledInput
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        error={errors.password}
        required
        isDarkMode={isDarkMode}
      />
      {/* Login Button */}
      <TouchableOpacity
        style={[
          styles.button,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: colors.primary,
            opacity: isSubmitting ? 0.7 : 1,
          },
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}>
        <Text style={[styles.buttonText, {color: colors.onPrimary}]}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 8,
    borderRadius: 20,
  },
  themeToggleText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginScreen;
