import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';

import {useTheme} from '../../context/ThemeContext';
import {showToast} from '../../utils/toast';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const {theme, toggleTheme} = useTheme();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userEmail');
      showToast(
        'success',
        'Logged Out',
        'You have been successfully logged out.',
        'top',
      );
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    } catch (error) {
      console.error('Logout error:', error);
      showToast(
        'error',
        'Logout Failed',
        'Something went wrong while logging out.',
        'bottom',
      );
    }
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {/* Theme Toggle Switch */}
      <View
        style={[styles.settingItem, {borderBottomColor: theme.colors.border}]}>
        <Text style={[styles.text, {color: theme.colors.text}]}>Dark Mode</Text>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.themeToggle,
            {
              backgroundColor: theme.dark
                ? theme.colors.primary
                : theme.colors.secondary,
            },
          ]}>
          <Text
            style={[styles.themeToggleText, {color: theme.colors.onPrimary}]}>
            {theme.dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.logoutButton, {backgroundColor: theme.colors.error}]}
        onPress={handleLogout}>
        <Text style={[styles.logoutText, {color: theme.colors.onError}]}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 18,
  },
  themeToggle: {
    padding: 10,
    borderRadius: 5,
  },
  themeToggleText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
