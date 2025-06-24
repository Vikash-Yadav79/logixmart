// styles.ts
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },

  // Control buttons styles
  controls: {
    position: 'absolute',
    top: 40,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  finishButton: {
    backgroundColor: '#FF5722',
  },
  finishText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 12,
  },

  // Line type selector styles
  lineTypeContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineTypeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginHorizontal: 4,
  },
  activeLineTypeButton: {
    backgroundColor: '#4CAF50',
  },
  lineTypeButtonText: {
    fontWeight: 'bold',
    fontSize: 12,
  },

  // Marker styles
  marker: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 25,
    alignItems: 'center',
  },
  markerText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 8,
  },
  pointMarker: {
    backgroundColor: '#FF0000',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  pointText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },

  // Area list item styles
  areaItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  areaInfo: {
    flex: 1,
  },
  areaName: {
    fontWeight: 'bold',
  },
  areaSize: {
    color: '#666',
    fontSize: 12,
  },
  deleteButton: {
    padding: 4,
  },

  // Button styles
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#9E9E9E',
    padding: 12,
    borderRadius: 5,
    marginTop: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Input styles
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },

  // Dialog button styles
  dialogButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveBtn: {
  flex: 1,
  backgroundColor: '#2196F3',
  paddingVertical: 10,
  borderRadius: 8,
  alignItems: 'center',
  opacity: 1, // Default opacity
},
disabledSaveBtn: {
  opacity: 0.6, // Lower opacity when disabled
},
});
