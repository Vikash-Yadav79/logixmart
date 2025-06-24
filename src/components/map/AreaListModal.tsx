import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Area {
  id: string;
  name: string;
  areaSF: number;
  coordinates: Array<{latitude: number; longitude: number}>;
}

interface AreaListModalProps {
  visible: boolean;
  areas: Area[];
  onClose: () => void;
  onStartDrawing: () => void;
  onZoomToArea: (area: Area) => void;
  onDeleteArea: (id: string) => void;
  onEditArea: (area: Area) => void;
}

const {height} = Dimensions.get('window');

const AreaListModal: React.FC<AreaListModalProps> = ({
  visible,
  areas,
  onClose,
  onStartDrawing,
  onZoomToArea,
  onDeleteArea,
  onEditArea,
}) => {
  const formatArea = (area: number) => {
    return Math.round(area).toLocaleString();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Saved Areas</Text>
            <Button
              mode="contained"
              onPress={onStartDrawing}
              style={styles.createButton}
              labelStyle={styles.createButtonLabel}>
              Create Area
            </Button>
          </View>

          {areas.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No areas created yet</Text>
            </View>
          ) : (
            <View style={styles.scrollableList}>
              <FlatList
                data={areas}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({item}) => (
                  <View style={styles.listItem}>
                    <View style={styles.areaInfo}>
                      <Text style={styles.areaName}>{item.name}</Text>
                      <Text style={styles.areaSF}>
                        {formatArea(item.areaSF)}
                      </Text>
                    </View>
                    <View style={styles.actions}>
                      <TouchableOpacity
                        onPress={() => onZoomToArea(item)}
                        style={styles.iconButton}
                        accessibilityLabel={`Zoom to area ${item.name}`}>
                        <Icon name="zoom-in" size={20} color="#00796b" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => onEditArea(item)}
                        style={styles.iconButton}
                        accessibilityLabel={`Edit area ${item.name}`}>
                        <Icon name="edit" size={20} color="#1976d2" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => onDeleteArea(item.id)}
                        style={styles.iconButton}
                        accessibilityLabel={`Delete area ${item.name}`}>
                        <Icon name="delete" size={20} color="#d32f2f" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    maxHeight: height * 0.7,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  createButton: {
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  createButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  listContent: {
    paddingBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  areaInfo: {
    flex: 1,
    marginRight: 12,
  },
  areaName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  areaSF: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  scrollableList: {
    maxHeight: height * 0.5,
  },
});

export default AreaListModal;
