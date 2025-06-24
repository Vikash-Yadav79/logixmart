// import React from 'react';
// import {View, Text} from 'react-native';
// import {Marker, Polyline} from 'react-native-maps';

// import {Area, LinePoint} from '../../types/types';

// interface MapAreasProps {
//   areas: Area[];
//   selectedArea: Area | null;
//   getCenter: (coords: LinePoint['coordinate'][]) => LinePoint['coordinate'];
// }

// const MapAreas: React.FC<MapAreasProps> = ({
//   areas,
//   selectedArea,
//   getCenter,
// }) => {
//   return (
//     <>
//       {areas.map(area => (
//         <React.Fragment key={area.id}>
//           {area.coordinates.map((point, index) => {
//             const nextIndex = (index + 1) % area.coordinates.length;
//             const nextPoint = area.coordinates[nextIndex];
//             return (
//               <Polyline
//                 key={`line-${area.id}-${index}`}
//                 coordinates={[point.coordinate, nextPoint.coordinate]}
//                 strokeColor={
//                   selectedArea?.id === area.id ? '#FF5722' : '#2196F3'
//                 }
//                 strokeWidth={2}
//                 lineDashPattern={point.lineType === 'rake' ? [5, 5] : undefined}
//               />
//             );
//           })}
//           <Marker
//             coordinate={getCenter(area.coordinates.map(p => p.coordinate))}>
//             <View
//               // eslint-disable-next-line react-native/no-inline-styles
//               style={{backgroundColor: '#000', padding: 4, borderRadius: 4}}>
//               <Text style={{color: '#fff', fontSize: 8}}>{area.name}</Text>
//             </View>
//           </Marker>
//         </React.Fragment>
//       ))}
//     </>
//   );
// };

// export default MapAreas;

import React from 'react';
import {View, Text} from 'react-native';
import {Marker, Polyline} from 'react-native-maps';

import {Area, LinePoint} from '../../types/types';

interface MapAreasProps {
  areas: Area[];
  selectedArea: Area | null;
  getCenter: (coords: LinePoint['coordinate'][]) => LinePoint['coordinate'];
}

const MapAreas: React.FC<MapAreasProps> = ({
  areas,
  selectedArea,
  getCenter,
}) => {
  return (
    <>
      {areas.map(area => (
        <React.Fragment key={area.id}>
          {area.coordinates.map((point, index) => {
            const nextIndex = (index + 1) % area.coordinates.length;
            const nextPoint = area.coordinates[nextIndex];
            return (
              <Polyline
                key={`line-${area.id}-${index}`}
                coordinates={[point.coordinate, nextPoint.coordinate]}
                strokeColor={
                  selectedArea?.id === area.id ? '#FF5722' : '#2196F3'
                }
                strokeWidth={2}
                lineDashPattern={point.lineType === 'rake' ? [5, 5] : undefined}
              />
            );
          })}
          <Marker
            coordinate={getCenter(area.coordinates.map(p => p.coordinate))}>
            <View
              style={{backgroundColor: '#000', padding: 4, borderRadius: 4}}>
              <Text style={{color: '#fff', fontSize: 8}}>{area.name}</Text>
            </View>
          </Marker>
        </React.Fragment>
      ))}
    </>
  );
};

// Deep compare two coordinates
const areCoordsEqual = (
  a: LinePoint['coordinate'],
  b: LinePoint['coordinate'],
) => a.latitude === b.latitude && a.longitude === b.longitude;

// Deep compare two line points
const areLinePointsEqual = (a: LinePoint, b: LinePoint) =>
  a.lineType === b.lineType && areCoordsEqual(a.coordinate, b.coordinate);

// Deep compare two areas
const areAreasEqual = (a1: Area[], a2: Area[]) => {
  if (a1.length !== a2.length) return false;
  return a1.every((area, i) => {
    const other = a2[i];
    if (
      area.id !== other.id ||
      area.name !== other.name ||
      area.areaSF !== other.areaSF ||
      area.coordinates.length !== other.coordinates.length
    )
      return false;

    return area.coordinates.every((p, idx) =>
      areLinePointsEqual(p, other.coordinates[idx]),
    );
  });
};

// Compare selectedArea by ID only for performance
const areSelectedAreasEqual = (a: Area | null, b: Area | null): boolean => {
  return a?.id === b?.id;
};

export default React.memo(MapAreas, (prevProps, nextProps) => {
  return (
    areAreasEqual(prevProps.areas, nextProps.areas) &&
    areSelectedAreasEqual(prevProps.selectedArea, nextProps.selectedArea) &&
    prevProps.getCenter === nextProps.getCenter
  );
});
