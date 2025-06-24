// import React from 'react';
// import {View, Text} from 'react-native';
// import {Marker, Polyline} from 'react-native-maps';

// import {LinePoint} from '../../types/types';

// interface MapDrawingProps {
//   isDrawing: boolean;
//   currentPolygon: LinePoint[];
//   draggedIndex: number | null;
//   onDragStart: (index: number) => void;
//   onDragEnd: (e: any, index: number) => void;
// }

// const MapDrawing: React.FC<MapDrawingProps> = ({
//   isDrawing,
//   currentPolygon,
//   draggedIndex,
//   onDragStart,
//   onDragEnd,
//   currentLineType,
// }) => {
//   if (!isDrawing || currentPolygon.length === 0) return null;

//   const lines = [];
//   for (let i = 1; i < currentPolygon.length; i++) {
//     lines.push(
//       <Polyline
//         key={`segment-${i}`}
//         coordinates={[
//           currentPolygon[i - 1].coordinate,
//           currentPolygon[i].coordinate,
//         ]}
//         strokeColor="#FF0000"
//         strokeWidth={2}
//         lineDashPattern={
//           currentPolygon[i - 1].lineType === 'rake' ? [5, 5] : undefined
//         }
//       />,
//     );
//   }

//   // For the current unfinished segment (last point to finger position)
//   if (currentPolygon.length > 0) {
//     lines.push(
//       <Polyline
//         key="current-segment"
//         coordinates={[
//           currentPolygon[currentPolygon.length - 1].coordinate,
//           // This would need the current finger position - you might need to add state for this
//         ]}
//         strokeColor="#FF0000"
//         strokeWidth={2}
//         lineDashPattern={currentLineType === 'rake' ? [5, 5] : undefined}
//       />,
//     );
//   }

//   if (currentPolygon.length >= 3) {
//     lines.push(
//       <Polyline
//         key="closing-line"
//         coordinates={[
//           currentPolygon[currentPolygon.length - 1].coordinate,
//           currentPolygon[0].coordinate,
//         ]}
//         strokeColor="#FF0000"
//         strokeWidth={2}
//         lineDashPattern={
//           currentPolygon[currentPolygon.length - 1].lineType === 'rake'
//             ? [5, 5]
//             : undefined
//         }
//       />,
//     );
//   }

//   return (
//     <>
//       {lines}
//       {currentPolygon.map((point, index) => (
//         <Marker
//           key={`point-${index}`}
//           coordinate={point.coordinate}
//           draggable
//           onDragStart={() => onDragStart(index)}
//           onDragEnd={e => onDragEnd(e, index)}>
//           <View
//             // eslint-disable-next-line react-native/no-inline-styles
//             style={{
//               backgroundColor: '#FF0000',
//               padding: 4,
//               borderRadius: 12,
//             }}>
//             <Text style={{color: '#fff'}}>{index + 1}</Text>
//           </View>
//         </Marker>
//       ))}
//     </>
//   );
// };

// export default MapDrawing;

// working one

// import React from 'react';
// import {View, Text} from 'react-native';
// import {Marker, Polyline} from 'react-native-maps';

// import {LinePoint} from '../../types/types';

// interface MapDrawingProps {
//   isDrawing: boolean;
//   currentPolygon: LinePoint[];
//   draggedIndex: number | null;
//   onDragStart: (index: number) => void;
//   onDragEnd: (e: any, index: number) => void;
//   currentLineType: 'eave' | 'rake';
//   isEditingMode: boolean;
//   isAddingPoint: boolean;
//   onAddPointBetween: (
//     index: number,
//     coordinate: {latitude: number; longitude: number},
//   ) => void;
//   onDeletePoint: (index: number) => void;
// }

// const MapDrawing: React.FC<MapDrawingProps> = ({
//   isDrawing,
//   currentPolygon,
//   draggedIndex,
//   onDragStart,
//   onDragEnd,
//   currentLineType,
//   isEditingMode,
//   isAddingPoint,
//   onAddPointBetween,
//   onDeletePoint,
// }) => {
//   if (!isDrawing || currentPolygon.length === 0) return null;

//   const lines = [];

//   for (let i = 1; i < currentPolygon.length; i++) {
//     lines.push(
//       <Polyline
//         key={`segment-${i}`}
//         coordinates={[
//           currentPolygon[i - 1].coordinate,
//           currentPolygon[i].coordinate,
//         ]}
//         strokeColor="#FF0000"
//         strokeWidth={2}
//         lineDashPattern={
//           currentPolygon[i - 1].lineType === 'rake' ? [5, 5] : undefined
//         }
//       />,
//     );
//   }

//   // Draw closing line visually (without adding an extra point)
//   if (currentPolygon.length >= 3) {
//     lines.push(
//       <Polyline
//         key="closing-line"
//         coordinates={[
//           currentPolygon[currentPolygon.length - 1].coordinate,
//           currentPolygon[0].coordinate,
//         ]}
//         strokeColor="#FF0000"
//         strokeWidth={2}
//         lineDashPattern={
//           currentPolygon[currentPolygon.length - 1].lineType === 'rake'
//             ? [5, 5]
//             : undefined
//         }
//       />,
//     );
//   }

//   return (
//     <>
//       {lines}
//       {currentPolygon.map((point, index) => (
//         <Marker
//           key={`point-${index}`}
//           coordinate={point.coordinate}
//           draggable
//           onDragStart={() => onDragStart(index)}
//           onDragEnd={e => onDragEnd(e, index)}>
//           <View
//             style={{
//               backgroundColor: '#FF0000',
//               padding: 4,
//               borderRadius: 12,
//             }}>
//             <Text style={{color: '#fff'}}>{index + 1}</Text>
//           </View>
//         </Marker>
//       ))}
//     </>
//   );
// };

// export default MapDrawing;

// running code

// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {Marker, Polyline} from 'react-native-maps';
// import {LinePoint} from '../../types/types';

// interface MapDrawingProps {
//   isDrawing: boolean;
//   currentPolygon: LinePoint[];
//   draggedIndex: number | null;
//   onDragStart: (index: number) => void;
//   onDragEnd: (e: any, index: number) => void;
//   currentLineType: 'eave' | 'rake';
//   isEditingMode: boolean;
//   isAddingPoint: boolean;
//   onAddPointBetween: (
//     index: number,
//     coordinate: {latitude: number; longitude: number},
//   ) => void;
//   onDeletePoint: (index: number) => void;
// }

// const MapDrawing: React.FC<MapDrawingProps> = ({
//   isDrawing,
//   currentPolygon,
//   draggedIndex,
//   onDragStart,
//   onDragEnd,
//   currentLineType,
//   isEditingMode,
//   isAddingPoint,
//   onAddPointBetween,
//   onDeletePoint,
// }) => {
//   if (!isDrawing || currentPolygon.length === 0) return null;

//   const lines = [];

//   for (let i = 1; i < currentPolygon.length; i++) {
//     lines.push(
//       <Polyline
//         key={`segment-${i}`}
//         coordinates={[
//           currentPolygon[i - 1].coordinate,
//           currentPolygon[i].coordinate,
//         ]}
//         strokeColor="#FF0000"
//         strokeWidth={2}
//         lineDashPattern={
//           currentPolygon[i - 1].lineType === 'rake' ? [5, 5] : undefined
//         }
//       />,
//     );
//   }

//   if (currentPolygon.length >= 3) {
//     lines.push(
//       <Polyline
//         key="closing-line"
//         coordinates={[
//           currentPolygon[currentPolygon.length - 1].coordinate,
//           currentPolygon[0].coordinate,
//         ]}
//         strokeColor="#FF0000"
//         strokeWidth={2}
//         lineDashPattern={
//           currentPolygon[currentPolygon.length - 1].lineType === 'rake'
//             ? [5, 5]
//             : undefined
//         }
//       />,
//     );
//   }

//   return (
//     <>
//       {lines}
//       {currentPolygon.map((point, index) => (
//         <Marker
//           key={`point-${index}`}
//           coordinate={point.coordinate}
//           anchor={{x: 0.5, y: 0.5}} // Center the custom view exactly on the coordinate
//           draggable
//           onDragStart={() => onDragStart(index)}
//           onDragEnd={e => onDragEnd(e, index)}>
//           <View style={styles.markerCircle}>
//             <Text style={styles.markerText}>{index + 1}</Text>
//           </View>
//         </Marker>
//       ))}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   markerCircle: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#FF0000',
//     borderColor: '#fff',
//     borderWidth: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 4, // For Android shadow
//   },
//   markerText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });

// export default MapDrawing;

// with memo

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Marker, Polyline} from 'react-native-maps';
import {LinePoint} from '../../types/types';

interface MapDrawingProps {
  isDrawing: boolean;
  currentPolygon: LinePoint[];
  draggedIndex: number | null;
  onDragStart: (index: number) => void;
  onDragEnd: (e: any, index: number) => void;
  currentLineType: 'eave' | 'rake';
  isEditingMode: boolean;
  isAddingPoint: boolean;
  onAddPointBetween: (
    index: number,
    coordinate: {latitude: number; longitude: number},
  ) => void;
  onDeletePoint: (index: number) => void;
}

const MapDrawing: React.FC<MapDrawingProps> = ({
  isDrawing,
  currentPolygon,
  draggedIndex,
  onDragStart,
  onDragEnd,
  currentLineType,
  isEditingMode,
  isAddingPoint,
  onAddPointBetween,
  onDeletePoint,
}) => {
  if (!isDrawing || currentPolygon.length === 0) return null;

  const lines = [];

  for (let i = 1; i < currentPolygon.length; i++) {
    lines.push(
      <Polyline
        key={`segment-${i}`}
        coordinates={[
          currentPolygon[i - 1].coordinate,
          currentPolygon[i].coordinate,
        ]}
        strokeColor="#FF0000"
        strokeWidth={2}
        lineDashPattern={
          currentPolygon[i - 1].lineType === 'rake' ? [5, 5] : undefined
        }
      />,
    );
  }

  if (currentPolygon.length >= 3) {
    lines.push(
      <Polyline
        key="closing-line"
        coordinates={[
          currentPolygon[currentPolygon.length - 1].coordinate,
          currentPolygon[0].coordinate,
        ]}
        strokeColor="#FF0000"
        strokeWidth={2}
        lineDashPattern={
          currentPolygon[currentPolygon.length - 1].lineType === 'rake'
            ? [5, 5]
            : undefined
        }
      />,
    );
  }

  return (
    <>
      {lines}
      {currentPolygon.map((point, index) => (
        <Marker
          key={`point-${index}`}
          coordinate={point.coordinate}
          anchor={{x: 0.5, y: 0.5}}
          draggable
          onDragStart={() => onDragStart(index)}
          onDragEnd={e => onDragEnd(e, index)}>
          <View style={styles.markerCircle}>
            <Text style={styles.markerText}>{index + 1}</Text>
          </View>
        </Marker>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  markerCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF0000',
    borderColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  markerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

// Deep comparison logic
const areCoordsEqual = (
  a: {latitude: number; longitude: number},
  b: {latitude: number; longitude: number},
) => a.latitude === b.latitude && a.longitude === b.longitude;

const areLinePointsEqual = (a: LinePoint, b: LinePoint) =>
  a.lineType === b.lineType && areCoordsEqual(a.coordinate, b.coordinate);

const arePolygonsEqual = (a: LinePoint[], b: LinePoint[]) => {
  if (a.length !== b.length) return false;
  return a.every((point, i) => areLinePointsEqual(point, b[i]));
};

// Only re-render if relevant props change
export default React.memo(MapDrawing, (prev, next) => {
  return (
    prev.isDrawing === next.isDrawing &&
    prev.draggedIndex === next.draggedIndex &&
    prev.currentLineType === next.currentLineType &&
    prev.isEditingMode === next.isEditingMode &&
    prev.isAddingPoint === next.isAddingPoint &&
    arePolygonsEqual(prev.currentPolygon, next.currentPolygon)
  );
});
