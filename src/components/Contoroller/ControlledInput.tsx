import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller, Control, FieldError } from 'react-hook-form';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ControlledInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: FieldError;
  required?: boolean;
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  control,
  name,
  label,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  required = false,
}) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.inputContainer}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label} {required && <Text style={{ color: theme.colors.error }}>*</Text>}
        </Text>
      )}
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  color: theme.colors.text,
                  borderColor: error ? theme.colors.error : theme.colors.border,
                  borderWidth: error ? 2 : 1,
                  paddingRight: secureTextEntry ? 50 : 16, // Add extra padding when secureTextEntry is true
                },
              ]}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry && !showPassword}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
            />
          )}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={toggleShowPassword}
            activeOpacity={0.7}
          >
            <Icon
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={24}
              color={theme.colors.placeholder}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    position: 'relative',
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    paddingLeft: 4,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 13,
    zIndex: 10,
  },
});

export default ControlledInput;

// import React, { useState } from 'react';
// import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
// import { Controller, Control, FieldError } from 'react-hook-form';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { lightColors, darkColors } from '../../context/ThemeContext';

// interface ControlledInputProps {
//   control: Control<any>;
//   name: string;
//   label?: string;
//   placeholder: string;
//   secureTextEntry?: boolean;
//   keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
//   autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
//   error?: FieldError;
//   required?: boolean;
//   isDarkMode?: boolean; // Add this prop to receive theme state
// }

// const ControlledInput: React.FC<ControlledInputProps> = ({
//   control,
//   name,
//   label,
//   placeholder,
//   secureTextEntry = false,
//   keyboardType = 'default',
//   autoCapitalize = 'none',
//   error,
//   required = false,
//   isDarkMode = false, // Default to light mode
// }) => {
//   const colors = isDarkMode ? darkColors : lightColors;
//   const [showPassword, setShowPassword] = useState(false);

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <View style={styles.inputContainer}>
//       {label && (
//         <Text style={[styles.label, { color: colors.text }]}>
//           {label} {required && <Text style={{ color: colors.error }}>*</Text>}
//         </Text>
//       )}
//       <View style={styles.inputWrapper}>
//         <Controller
//           control={control}
//           name={name}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <TextInput
//               style={[
//                 styles.input,
//                 {
//                   color: colors.text,
//                   borderColor: error ? colors.error : colors.border,
//                   borderWidth: error ? 2 : 1,
//                   paddingRight: secureTextEntry ? 50 : 16,
//                   backgroundColor: colors.inputBackground, // Added input background color
//                 },
//               ]}
//               placeholder={placeholder}
//               placeholderTextColor={colors.placeholder}
//               value={value}
//               onChangeText={onChange}
//               onBlur={onBlur}
//               secureTextEntry={secureTextEntry && !showPassword}
//               keyboardType={keyboardType}
//               autoCapitalize={autoCapitalize}
//             />
//           )}
//         />
//         {secureTextEntry && (
//           <TouchableOpacity
//             style={styles.eyeIcon}
//             onPress={toggleShowPassword}
//             activeOpacity={0.7}
//           >
//             <Icon
//               name={showPassword ? 'visibility-off' : 'visibility'}
//               size={24}
//               color={colors.placeholder}
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//       {error && (
//         <Text style={[styles.errorText, { color: colors.error }]}>
//           {error.message}
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   inputContainer: {
//     marginBottom: 16,
//   },
//   inputWrapper: {
//     position: 'relative',
//   },
//   label: {
//     marginBottom: 8,
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   input: {
//     height: 50,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     fontSize: 16,
//   },
//   errorText: {
//     marginTop: 4,
//     fontSize: 12,
//     paddingLeft: 4,
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 16,
//     top: 13,
//     zIndex: 10,
//   },
// });

// export default ControlledInput;
