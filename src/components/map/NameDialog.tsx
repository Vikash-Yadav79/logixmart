import React from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

interface NameDialogProps {
  visible: boolean;
  areaName: string;
  onNameChange: (name: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const NameDialog: React.FC<NameDialogProps> = ({
  visible,
  areaName,
  onNameChange,
  onSave,
  onCancel,
  isEditing = false,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {isEditing ? 'Edit Area Name' : 'Name Your Area'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter area name"
            value={areaName}
            onChangeText={onNameChange}
            autoFocus
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    maxWidth: 350,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    fontWeight: '600',
    color: '#333',
    fontSize: 16,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default NameDialog;
