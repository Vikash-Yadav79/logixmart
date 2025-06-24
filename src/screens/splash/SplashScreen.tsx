import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import {RootStackParamList} from '../../types/navigationTypes';
import {useTheme} from '../../context/ThemeContext';

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {theme} = useTheme();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Wait for animation to complete (4 seconds total)
        await new Promise(resolve => setTimeout(resolve, 4000));

        const userEmail = await AsyncStorage.getItem('userEmail');

        if (userEmail) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Main'}],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Login'}],
            }),
          );
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      }
    };

    checkAuthStatus();
  }, [navigation]);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {/* Animated Background Gradient (using Lottie) */}
      <View style={styles.backgroundAnimation}>
        <LottieView
          source={{
            uri: 'https://assets6.lottiefiles.com/packages/lf20_6sxyjyjj.json',
          }}
          autoPlay
          loop
          style={styles.lottieFullscreen}
        />
      </View>

      {/* Main Content Container */}
      <View style={styles.contentContainer}>
        {/* Animated Logo */}
        <Animatable.View
          animation="zoomIn"
          duration={1000}
          delay={300}
          style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2965/2965300.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animatable.View>

        {/* App Name with Typing Animation Effect */}
        <Animatable.Text
          animation={{
            from: {opacity: 0, translateX: -50},
            to: {opacity: 1, translateX: 0},
          }}
          duration={800}
          delay={800}
          style={[styles.appName, {color: theme.colors.text}]}>
          Welcome to AppName
        </Animatable.Text>

        {/* Tagline with Fade Animation */}
        <Animatable.Text
          animation="fadeIn"
          duration={1000}
          delay={1500}
          style={[styles.tagline, {color: theme.colors.textSecondary}]}>
          Your perfect productivity partner
        </Animatable.Text>

        {/* Modern Loading Indicator */}
        <Animatable.View
          animation="fadeIn"
          duration={800}
          delay={2000}
          style={styles.loadingContainer}>
          <LottieView
            source={{
              uri: 'https://assets9.lottiefiles.com/packages/lf20_h9kds1my.json',
            }}
            autoPlay
            loop
            style={styles.loadingAnimation}
          />
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundAnimation: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  lottieFullscreen: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  logoContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 40,
    textAlign: 'center',
    opacity: 0.8,
  },
  loadingContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  loadingAnimation: {
    width: 120,
    height: 120,
  },
});

export default SplashScreen;
