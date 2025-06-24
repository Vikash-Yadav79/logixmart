import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../context/ThemeContext';

const HomeScreen: React.FC = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.card, {backgroundColor: theme.colors.card}]}>
        <Icon name="home-outline" size={40} color={theme.colors.text} />
        <Text style={[styles.title, {color: theme.colors.text}]}>
          Welcome Back!
        </Text>
        <Text style={[styles.subtitle, {color: theme.colors.text}]}>
          Dive into your dashboard and explore the app.
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.colors.text}]}>
          <Icon
            name="notifications-outline"
            size={22}
            color={theme.colors.background}
          />
          <Text style={[styles.buttonText, {color: theme.colors.background}]}>
            Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.colors.text}]}>
          <Icon
            name="settings-outline"
            size={22}
            color={theme.colors.background}
          />
          <Text style={[styles.buttonText, {color: theme.colors.background}]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Theme toggle button */}
      <TouchableOpacity
        style={[styles.themeToggle, {backgroundColor: theme.colors.card}]}
        onPress={toggleTheme}>
        <Text style={[styles.themeToggleText, {color: theme.colors.text}]}>
          Switch to {theme.dark ? 'Light' : 'Dark'} Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 8,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 6,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '600',
    marginLeft: 8,
  },
  themeToggle: {
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  themeToggleText: {
    fontWeight: '600',
  },
});

export default HomeScreen;
