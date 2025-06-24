// import React from 'react';
// import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// interface MapControlsProps {
//   isDrawing: boolean;
//   currentPolygonLength: number;
//   currentLineType: 'eave' | 'rake';
//   onShowList: () => void;
//   onStartDrawing: () => void;
//   onFinishDrawing: () => void;
//   onSetLineType: (type: 'eave' | 'rake') => void;
// }

// const MapControls: React.FC<MapControlsProps> = ({
//   isDrawing,
//   currentPolygonLength,
//   currentLineType,
//   onShowList,
//   onStartDrawing,
//   onFinishDrawing,
//   onSetLineType,
// }) => {
//   return (
//     <View style={styles.controls}>
//       {!isDrawing ? (
//         <TouchableOpacity onPress={onShowList} style={styles.iconButton}>
//           <Icon name="list" size={28} color="#000" />
//         </TouchableOpacity>
//       ) : (
//         <>
//           {currentPolygonLength >= 2 && (
//             <View style={styles.lineTypeContainer}>
//               <TouchableOpacity
//                 onPress={() => onSetLineType('eave')}
//                 style={[
//                   styles.lineTypeButton,
//                   currentLineType === 'eave' && styles.activeLineTypeButton,
//                 ]}>
//                 <Text style={styles.lineTypeButtonText}>Eave</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => onSetLineType('rake')}
//                 style={[
//                   styles.lineTypeButton,
//                   currentLineType === 'rake' && styles.activeLineTypeButton,
//                 ]}>
//                 <Text style={styles.lineTypeButtonText}>Rake</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           <TouchableOpacity
//             onPress={onFinishDrawing}
//             style={[styles.iconButton, styles.finishButton]}>
//             <Text style={styles.finishText}>Finish</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   controls: {
//     position: 'absolute',
//     top: 40,
//     right: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   iconButton: {
//     backgroundColor: '#fff',
//     padding: 8,
//     borderRadius: 24,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: {width: 0, height: 2},
//   },
//   finishButton: {
//     backgroundColor: '#FF5722',
//   },
//   finishText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//     paddingHorizontal: 12,
//   },
//   lineTypeContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 8,
//     elevation: 3,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   lineTypeButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 15,
//     marginHorizontal: 4,
//   },
//   activeLineTypeButton: {
//     backgroundColor: '#4CAF50',
//   },
//   lineTypeButtonText: {
//     fontWeight: 'bold',
//     fontSize: 12,
//   },
// });

// export default MapControls;

import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface MapControlsProps {
  isDrawing: boolean;
  currentPolygonLength: number;
  currentLineType: 'eave' | 'rake';
  onShowList: () => void;
  onStartDrawing: () => void;
  onFinishDrawing: () => void;
  onSetLineType: (type: 'eave' | 'rake') => void;
  onUndo?: () => void; // Only new prop
  canUndo?: boolean; // Only new prop
}

const MapControls: React.FC<MapControlsProps> = ({
  isDrawing,
  currentPolygonLength,
  currentLineType,
  onShowList,
  onStartDrawing,
  onFinishDrawing,
  onSetLineType,
  onUndo,
  canUndo,
}) => {
  return (
    <View style={styles.controls}>
      {!isDrawing ? (
        <TouchableOpacity onPress={onShowList} style={styles.iconButton}>
          <Icon name="list" size={28} color="#000" />
        </TouchableOpacity>
      ) : (
        <>
          {currentPolygonLength >= 2 && (
            <View style={styles.lineTypeContainer}>
              <TouchableOpacity
                onPress={() => onSetLineType('eave')}
                style={[
                  styles.lineTypeButton,
                  currentLineType === 'eave' && styles.activeLineTypeButton,
                ]}>
                <Text style={styles.lineTypeButtonText}>Eave</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSetLineType('rake')}
                style={[
                  styles.lineTypeButton,
                  currentLineType === 'rake' && styles.activeLineTypeButton,
                ]}>
                <Text style={styles.lineTypeButtonText}>Rake</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Only new addition - Undo Button */}
          {canUndo && (
            <TouchableOpacity onPress={onUndo} style={styles.iconButton}>
              <Icon name="undo" size={24} color="#000" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={onFinishDrawing}
            style={[styles.iconButton, styles.finishButton]}>
            <Text style={styles.finishText}>Finish</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

// Styles remain exactly the same as your original
const styles = StyleSheet.create({
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
});

export default MapControls;
