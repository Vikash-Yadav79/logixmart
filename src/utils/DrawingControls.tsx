import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface DrawingControlsProps {
  isDrawing: boolean;
  onListPress: () => void;
  onFinishPress: () => void;
}

const DrawingControls: React.FC<DrawingControlsProps> = ({
  isDrawing,
  onListPress,
  onFinishPress,
}) => {
  return (
    <>
      <TouchableOpacity style={styles.listButton} onPress={onListPress}>
        <Icon name="list" size={30} color="#000" />
      </TouchableOpacity>

      {isDrawing && (
        <TouchableOpacity style={styles.finishButton} onPress={onFinishPress}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  finishButton: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  finishButtonText: {
    fontWeight: 'bold',
  },
});

export default DrawingControls;
