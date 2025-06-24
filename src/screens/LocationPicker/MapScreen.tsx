// import React, {useState, useRef, useCallback, useEffect, memo} from 'react';
// import {View} from 'react-native';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import MapControls from '../../components/Contoroller/MapControls';
// import MapDrawing from '../../components/map/MapDrawing';
// import MapAreas from '../../components/map/MapArea';
// import NameDialog from '../../components/map/NameDialog';
// import AreaListModal from '../../components/map/AreaListModal';
// import {Area, LinePoint, LatLng} from '../../types/types';
// import {showToast} from '../../utils/toast';

// const STORAGE_KEY = 'saved_areas';

// // Memoized components to prevent unnecessary re-renders
// const MemoizedMapAreas = memo(MapAreas);
// const MemoizedMapDrawing = memo(MapDrawing);

// const MapScreen: React.FC = () => {
//   console.log('MapScreen re-render');

//   const [areas, setAreas] = useState<Area[]>(() => {
//     console.log('Initializing areas state');
//     return [];
//   });

//   const [isDrawing, setIsDrawing] = useState(() => {
//     console.log('Initializing isDrawing state');
//     return false;
//   });

//   const [currentPolygon, setCurrentPolygon] = useState<LinePoint[]>(() => {
//     console.log('Initializing currentPolygon state');
//     return [];
//   });

//   const [showList, setShowList] = useState(() => {
//     console.log('Initializing showList state');
//     return false;
//   });

//   const [showNameDialog, setShowNameDialog] = useState(() => {
//     console.log('Initializing showNameDialog state');
//     return false;
//   });

//   const [areaName, setAreaName] = useState(() => {
//     console.log('Initializing areaName state');
//     return '';
//   });

//   const [selectedArea, setSelectedArea] = useState<Area | null>(() => {
//     console.log('Initializing selectedArea state');
//     return null;
//   });

//   const [currentLineType, setCurrentLineType] = useState<'eave' | 'rake'>(
//     () => {
//       console.log('Initializing currentLineType state');
//       return 'eave';
//     },
//   );

//   const [draggedIndex, setDraggedIndex] = useState<number | null>(() => {
//     console.log('Initializing draggedIndex state');
//     return null;
//   });

//   const [editingArea, setEditingArea] = useState<Area | null>(() => {
//     console.log('Initializing editingArea state');
//     return null;
//   });

//   const [isAddingPoint, setIsAddingPoint] = useState(() => {
//     console.log('Initializing isAddingPoint state');
//     return false;
//   });

//   const mapRef = useRef<MapView>(null);
//   console.log('MapView ref:', mapRef.current);

//   const isEditingMode = !!editingArea;
//   console.log('isEditingMode:', isEditingMode);

//   // Load areas only once on mount
//   useEffect(() => {
//     console.log('Running load areas effect');
//     const loadAreas = async () => {
//       try {
//         console.log('Loading areas from storage');
//         const savedAreas = await AsyncStorage.getItem(STORAGE_KEY);
//         if (savedAreas) {
//           console.log('Found saved areas:', JSON.parse(savedAreas).length);
//           setAreas(JSON.parse(savedAreas));
//         }
//       } catch (error) {
//         console.error('Failed to load areas', error);
//       }
//     };
//     loadAreas();
//   }, []);

//   // Save areas only when they change
//   useEffect(() => {
//     console.log('Areas changed, saving to storage. Count:', areas.length);
//     const saveAreas = async () => {
//       try {
//         await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(areas));
//         console.log('Areas saved successfully');
//       } catch (error) {
//         console.error('Failed to save areas', error);
//       }
//     };
//     saveAreas();
//   }, [areas]);

//   // Stable callbacks that won't change between renders
//   const calculateArea = useCallback((coords: LinePoint[]): number => {
//     console.log('Calculating area for', coords.length, 'points');
//     if (!coords || coords.length < 3) return 0;
//     const radius = 6378137;
//     const mappedCoords = coords.map(p => p.coordinate).filter(Boolean);
//     if (mappedCoords.length < 3) return 0;
//     const closedCoords = [...mappedCoords, mappedCoords[0]];
//     let area = 0;
//     for (let i = 0; i < closedCoords.length - 1; i++) {
//       const p1 = closedCoords[i];
//       const p2 = closedCoords[i + 1];
//       area +=
//         (p2.longitude - p1.longitude) *
//         (2 + Math.sin(p1.latitude) + Math.sin(p2.latitude));
//     }
//     area = (area * radius * radius) / 2.0;
//     return parseFloat((Math.abs(area) * 10.7639).toFixed(2));
//   }, []);

//   const getCenter = useCallback(
//     (coords: LinePoint['coordinate'][]): LinePoint['coordinate'] => {
//       console.log('Calculating center for', coords.length, 'coordinates');
//       if (coords.length === 0) return {latitude: 0, longitude: 0};
//       const latSum = coords.reduce((sum, c) => sum + c.latitude, 0);
//       const lngSum = coords.reduce((sum, c) => sum + c.longitude, 0);
//       return {
//         latitude: latSum / coords.length,
//         longitude: lngSum / coords.length,
//       };
//     },
//     [],
//   );

//   const toggleAddPointMode = useCallback(() => {
//     console.log('Toggling add point mode. Current:', isAddingPoint);
//     setIsAddingPoint(prev => !prev);
//   }, [isAddingPoint]);

//   const handleMapPress = useCallback(
//     (e: {nativeEvent: {coordinate: LatLng}}) => {
//       const {coordinate} = e.nativeEvent;
//       if (draggedIndex !== null) return;

//       if (isEditingMode && isAddingPoint) {
//         const findNearestEdgeIndex = () => {
//           let minDistance = Infinity;
//           let insertAt = 0;
//           for (let i = 0; i < currentPolygon.length; i++) {
//             const nextIndex = (i + 1) % currentPolygon.length;
//             const p1 = currentPolygon[i].coordinate;
//             const p2 = currentPolygon[nextIndex].coordinate;
//             const dist = distanceToSegment(coordinate, p1, p2);
//             if (dist < minDistance) {
//               minDistance = dist;
//               insertAt = i;
//             }
//           }
//           return insertAt;
//         };
//         const index = findNearestEdgeIndex();
//         setCurrentPolygon(prev => {
//           const updated = [...prev];
//           updated.splice(index + 1, 0, {
//             coordinate,
//             lineType: currentLineType,
//           });
//           return updated;
//         });
//         // Reset to eave after adding point
//         setCurrentLineType('eave');
//         return;
//       }

//       if (!isDrawing) return;

//       setCurrentPolygon(prev => {
//         const updated = [...prev];
//         if (updated.length > 0) {
//           updated[updated.length - 1] = {
//             ...updated[updated.length - 1],
//             lineType: currentLineType,
//           };
//         }
//         updated.push({coordinate, lineType: currentLineType});
//         return updated;
//       });

//       // Reset to eave after adding point
//       setCurrentLineType('eave');
//     },
//     [
//       isDrawing,
//       isEditingMode,
//       isAddingPoint,
//       currentPolygon,
//       currentLineType,
//       draggedIndex,
//     ],
//   );

//   const handleDragStart = useCallback((index: number) => {
//     console.log('Drag started on point', index);
//     setDraggedIndex(index);
//   }, []);

//   const handleDragEnd = useCallback((e: any, index: number) => {
//     console.log('Drag ended on point', index);
//     const {coordinate} = e.nativeEvent;
//     setCurrentPolygon(prev => {
//       const newCoords = [...prev];
//       newCoords[index] = {...newCoords[index], coordinate};
//       return newCoords;
//     });
//     setDraggedIndex(null);
//   }, []);

//   const startDrawing = useCallback(() => {
//     console.log('Starting drawing');
//     setIsDrawing(true);
//     setCurrentPolygon([]);
//     setCurrentLineType('eave'); // Ensure we start with eave
//     setSelectedArea(null);
//     setShowList(false);
//     setEditingArea(null);
//     setIsAddingPoint(false);
//   }, []);

//   const finishDrawing = useCallback(() => {
//     console.log('Finishing drawing with', currentPolygon.length, 'points');
//     if (currentPolygon.length < 3) {
//       showToast(
//         'error',
//         'Error',
//         'You need at least 3 points to create a polygon',
//       );
//       return;
//     }
//     setShowNameDialog(true);
//   }, [currentPolygon]);

//   const saveArea = useCallback(() => {
//     console.log('Saving area:', areaName);
//     if (!areaName.trim()) {
//       showToast('error', 'Error', 'Please enter a valid name for the area');
//       return;
//     }
//     if (currentPolygon.length < 3) {
//       showToast('error', 'Error', 'A polygon must have at least 3 points');
//       return;
//     }

//     let finalizedPolygon = currentPolygon.map(point => ({
//       ...point,
//       coordinate: {...point.coordinate},
//     }));
//     const closedPolygon = [...finalizedPolygon, {...finalizedPolygon[0]}];

//     if (editingArea) {
//       console.log('Updating existing area:', editingArea.id);
//       const updatedArea = {
//         ...editingArea,
//         name: areaName.trim(),
//         coordinates: finalizedPolygon,
//         areaSF: calculateArea(closedPolygon),
//       };
//       setAreas(prev =>
//         prev.map(a => (a.id === updatedArea.id ? updatedArea : a)),
//       );
//     } else {
//       console.log('Creating new area');
//       const newArea: Area = {
//         id: Date.now().toString(),
//         name: areaName.trim(),
//         coordinates: finalizedPolygon,
//         areaSF: calculateArea(closedPolygon),
//       };
//       setAreas(prev => [...prev, newArea]);
//     }

//     setShowNameDialog(false);
//     setAreaName('');
//     setIsDrawing(false);
//     setEditingArea(null);
//     setCurrentPolygon([]);
//     setIsAddingPoint(false);

//     setTimeout(() => {
//       if (closedPolygon.length > 0) {
//         console.log('Zooming to saved area');
//         mapRef.current?.fitToCoordinates(
//           closedPolygon.map(p => p.coordinate),
//           {
//             edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
//             animated: true,
//           },
//         );
//       }
//     }, 100);
//   }, [areaName, currentPolygon, calculateArea, editingArea]);

//   const deleteArea = useCallback(
//     (id: string) => {
//       console.log('Deleting area:', id);
//       setAreas(prev => prev.filter(a => a.id !== id));
//       if (selectedArea?.id === id) setSelectedArea(null);
//     },
//     [selectedArea],
//   );

//   const zoomToArea = useCallback((area: Area) => {
//     console.log('Zooming to area:', area.id);
//     setSelectedArea(area);
//     mapRef.current?.fitToCoordinates(
//       area.coordinates.map(p => p.coordinate),
//       {
//         edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
//         animated: true,
//       },
//     );
//     setShowList(false);
//   }, []);

//   const editArea = useCallback((area: Area) => {
//     console.log('Editing area:', area.id);
//     const coordinates = [...area.coordinates];
//     const shouldRemoveClosingPoint =
//       coordinates.length > 2 &&
//       coordinates[0].coordinate.latitude ===
//         coordinates[coordinates.length - 1].coordinate.latitude &&
//       coordinates[0].coordinate.longitude ===
//         coordinates[coordinates.length - 1].coordinate.longitude;

//     if (shouldRemoveClosingPoint) {
//       coordinates.pop();
//     }

//     setEditingArea(area);
//     setCurrentPolygon(coordinates);
//     setAreaName(area.name);
//     setIsDrawing(true);
//     setIsAddingPoint(false);
//     setShowList(false);
//     setCurrentLineType('eave'); // Reset to eave when editing

//     if (coordinates.length > 0) {
//       const coordsToFit = [...coordinates];
//       if (!shouldRemoveClosingPoint && coordinates.length > 2) {
//         coordsToFit.push({...coordinates[0]});
//       }
//       mapRef.current?.fitToCoordinates(
//         coordsToFit.map(p => p.coordinate),
//         {
//           edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
//           animated: true,
//         },
//       );
//     }
//   }, []);

//   const deletePoint = useCallback((index: number) => {
//     console.log('Deleting point at index:', index);
//     setCurrentPolygon(prev => {
//       if (prev.length <= 3) return prev;
//       const newCoords = [...prev];
//       newCoords.splice(index, 1);
//       return newCoords;
//     });
//   }, []);

//   function distanceToSegment(point: LatLng, p1: LatLng, p2: LatLng) {
//     const toRad = (x: number) => (x * Math.PI) / 180;
//     const lat1 = toRad(p1.latitude);
//     const lon1 = toRad(p1.longitude);
//     const lat2 = toRad(p2.latitude);
//     const lon2 = toRad(p2.longitude);
//     const lat = toRad(point.latitude);
//     const lon = toRad(point.longitude);

//     const A = lat - lat1;
//     const B = lon - lon1;
//     const C = lat2 - lat1;
//     const D = lon2 - lon1;

//     const dot = A * C + B * D;
//     const len_sq = C * C + D * D;
//     let param = -1;
//     if (len_sq !== 0) param = dot / len_sq;

//     let xx, yy;
//     if (param < 0) {
//       xx = lat1;
//       yy = lon1;
//     } else if (param > 1) {
//       xx = lat2;
//       yy = lon2;
//     } else {
//       xx = lat1 + param * C;
//       yy = lon1 + param * D;
//     }

//     const dLat = lat - xx;
//     const dLon = lon - yy;
//     return Math.sqrt(dLat * dLat + dLon * dLon);
//   }

//   console.log(
//     'Rendering MapScreen with currentPolygon:',
//     currentPolygon.length,
//   );

//   return (
//     <View style={{flex: 1}}>
//       <MapView
//         ref={mapRef}
//         provider={PROVIDER_GOOGLE}
//         style={{flex: 1}}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//         onPress={handleMapPress}>
//         <MemoizedMapAreas
//           areas={areas.filter(a => !editingArea || a.id !== editingArea.id)}
//           selectedArea={selectedArea}
//           getCenter={getCenter}
//         />
//         <MemoizedMapDrawing
//           isDrawing={isDrawing}
//           currentPolygon={currentPolygon}
//           draggedIndex={draggedIndex}
//           onDragStart={handleDragStart}
//           onDragEnd={handleDragEnd}
//           currentLineType={currentLineType}
//           isEditingMode={isEditingMode}
//           isAddingPoint={isAddingPoint}
//           onDeletePoint={deletePoint}
//         />
//       </MapView>

//       <MapControls
//         isDrawing={isDrawing}
//         currentPolygonLength={currentPolygon.length}
//         currentLineType={currentLineType}
//         onShowList={() => setShowList(true)}
//         onStartDrawing={startDrawing}
//         onFinishDrawing={finishDrawing}
//         onSetLineType={type => {
//           if (type === 'rake' && currentPolygon.length >= 2) {
//             setCurrentPolygon(prev => {
//               const updated = [...prev];
//               // Set the previous line's type to 'rake' (i.e., second last point)
//               updated[updated.length - 2] = {
//                 ...updated[updated.length - 2],
//                 lineType: 'rake',
//               };
//               return updated;
//             });
//           }

//           // Always reset to 'eave' for the next point
//           setCurrentLineType('eave');
//         }}
//         isEditingMode={isEditingMode}
//         isAddingPoint={isAddingPoint}
//         onToggleAddPoint={toggleAddPointMode}
//         onFinishEditing={() => {
//           setIsAddingPoint(false);
//           finishDrawing();
//         }}
//       />

//       <AreaListModal
//         visible={showList}
//         areas={areas}
//         onClose={() => setShowList(false)}
//         onStartDrawing={() => {
//           setEditingArea(null);
//           startDrawing();
//         }}
//         onZoomToArea={zoomToArea}
//         onDeleteArea={deleteArea}
//         onEditArea={editArea}
//       />

//       <NameDialog
//         visible={showNameDialog}
//         areaName={areaName}
//         onNameChange={setAreaName}
//         onSave={saveArea}
//         onCancel={() => {
//           setShowNameDialog(false);
//           setIsDrawing(!!editingArea);
//         }}
//         isEditing={isEditingMode}
//       />
//     </View>
//   );
// };

// export default MapScreen;

import React, {useState, useRef, useCallback, useEffect, memo} from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MapControls from '../../components/Contoroller/MapControls';
import MapDrawing from '../../components/map/MapDrawing';
import MapAreas from '../../components/map/MapArea';
import NameDialog from '../../components/map/NameDialog';
import AreaListModal from '../../components/map/AreaListModal';
import {Area, LinePoint, LatLng} from '../../types/types';
import {showToast} from '../../utils/toast';

const STORAGE_KEY = 'saved_areas';

// Memoized components to prevent unnecessary re-renders
// const MemoizedMapAreas = memo(MapAreas);
// const MemoizedMapDrawing = memo(MapDrawing);

const MapScreen: React.FC = () => {
  console.log('MapScreen re-render');

  const [areas, setAreas] = useState<Area[]>(() => {
    console.log('Initializing areas state');
    return [];
  });

  const [isDrawing, setIsDrawing] = useState(() => {
    console.log('Initializing isDrawing state');
    return false;
  });

  const [currentPolygon, setCurrentPolygon] = useState<LinePoint[]>(() => {
    console.log('Initializing currentPolygon state');
    return [];
  });

  const [showList, setShowList] = useState(() => {
    console.log('Initializing showList state');
    return false;
  });

  const [showNameDialog, setShowNameDialog] = useState(() => {
    console.log('Initializing showNameDialog state');
    return false;
  });

  const [areaName, setAreaName] = useState(() => {
    console.log('Initializing areaName state');
    return '';
  });

  const [selectedArea, setSelectedArea] = useState<Area | null>(() => {
    console.log('Initializing selectedArea state');
    return null;
  });

  const [currentLineType, setCurrentLineType] = useState<'eave' | 'rake'>(
    () => {
      console.log('Initializing currentLineType state');
      return 'eave';
    },
  );

  const [draggedIndex, setDraggedIndex] = useState<number | null>(() => {
    console.log('Initializing draggedIndex state');
    return null;
  });

  const [editingArea, setEditingArea] = useState<Area | null>(() => {
    console.log('Initializing editingArea state');
    return null;
  });

  const [isAddingPoint, setIsAddingPoint] = useState(() => {
    console.log('Initializing isAddingPoint state');
    return false;
  });
  const [canUndo, setCanUndo] = useState(false);

  const mapRef = useRef<MapView>(null);
  console.log('MapView ref:', mapRef.current);

  const isEditingMode = !!editingArea;
  console.log('isEditingMode:', isEditingMode);

  // Load areas only once on mount
  useEffect(() => {
    console.log('Running load areas effect');
    const loadAreas = async () => {
      try {
        console.log('Loading areas from storage');
        const savedAreas = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedAreas) {
          console.log('Found saved areas:', JSON.parse(savedAreas).length);
          setAreas(JSON.parse(savedAreas));
        }
      } catch (error) {
        console.error('Failed to load areas', error);
      }
    };
    loadAreas();
  }, []);

  // Save areas only when they change
  useEffect(() => {
    console.log('Areas changed, saving to storage. Count:', areas.length);
    const saveAreas = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(areas));
        console.log('Areas saved successfully');
      } catch (error) {
        console.error('Failed to save areas', error);
      }
    };
    saveAreas();
  }, [areas]);

  // Stable callbacks that won't change between renders
  const calculateArea = useCallback((coords: LinePoint[]): number => {
    console.log('Calculating area for', coords.length, 'points');
    if (!coords || coords.length < 3) return 0;
    const radius = 6378137;
    const mappedCoords = coords.map(p => p.coordinate).filter(Boolean);
    if (mappedCoords.length < 3) return 0;
    const closedCoords = [...mappedCoords, mappedCoords[0]];
    let area = 0;
    for (let i = 0; i < closedCoords.length - 1; i++) {
      const p1 = closedCoords[i];
      const p2 = closedCoords[i + 1];
      area +=
        (p2.longitude - p1.longitude) *
        (2 + Math.sin(p1.latitude) + Math.sin(p2.latitude));
    }
    area = (area * radius * radius) / 2.0;
    return parseFloat((Math.abs(area) * 10.7639).toFixed(2));
  }, []);

  const handleUndo = useCallback(() => {
    setCurrentPolygon(prev => {
      if (prev.length === 0) return prev;
      const updatedCoords = [...prev];
      updatedCoords.pop(); // Remove last point
      setCanUndo(updatedCoords.length > 0); // Update canUndo based on remaining points
      return updatedCoords;
    });
  }, []);

  const getCenter = useCallback(
    (coords: LinePoint['coordinate'][]): LinePoint['coordinate'] => {
      console.log('Calculating center for', coords.length, 'coordinates');
      if (coords.length === 0) return {latitude: 0, longitude: 0};
      const latSum = coords.reduce((sum, c) => sum + c.latitude, 0);
      const lngSum = coords.reduce((sum, c) => sum + c.longitude, 0);
      return {
        latitude: latSum / coords.length,
        longitude: lngSum / coords.length,
      };
    },
    [],
  );

  const toggleAddPointMode = useCallback(() => {
    console.log('Toggling add point mode. Current:', isAddingPoint);
    setIsAddingPoint(prev => !prev);
  }, [isAddingPoint]);

  // const handleMapPress = useCallback(
  //   (e: {nativeEvent: {coordinate: LatLng}}) => {
  //     const {coordinate} = e.nativeEvent;
  //     if (draggedIndex !== null) return;

  //     if (isEditingMode && isAddingPoint) {
  //       const findNearestEdgeIndex = () => {
  //         let minDistance = Infinity;
  //         let insertAt = 0;
  //         for (let i = 0; i < currentPolygon.length; i++) {
  //           const nextIndex = (i + 1) % currentPolygon.length;
  //           const p1 = currentPolygon[i].coordinate;
  //           const p2 = currentPolygon[nextIndex].coordinate;
  //           const dist = distanceToSegment(coordinate, p1, p2);
  //           if (dist < minDistance) {
  //             minDistance = dist;
  //             insertAt = i;
  //           }
  //         }
  //         return insertAt;
  //       };
  //       const index = findNearestEdgeIndex();
  //       setCurrentPolygon(prev => {
  //         const updated = [...prev];
  //         updated.splice(index + 1, 0, {
  //           coordinate,
  //           lineType: currentLineType,
  //         });
  //         return updated;
  //       });
  //       // Reset to eave after adding point
  //       setCurrentLineType('eave');
  //       return;
  //     }

  //     if (!isDrawing) return;

  //     setCurrentPolygon(prev => {
  //       const updated = [...prev];
  //       if (updated.length > 0) {
  //         updated[updated.length - 1] = {
  //           ...updated[updated.length - 1],
  //           lineType: currentLineType,
  //         };
  //       }
  //       updated.push({coordinate, lineType: currentLineType});
  //       return updated;
  //     });

  //     // Reset to eave after adding point
  //     setCurrentLineType('eave');
  //   },
  //   [
  //     isDrawing,
  //     isEditingMode,
  //     isAddingPoint,
  //     currentPolygon,
  //     currentLineType,
  //     draggedIndex,
  //   ],
  // );

  const handleMapPress = useCallback(
    (e: {nativeEvent: {coordinate: LatLng}}) => {
      const {coordinate} = e.nativeEvent;
      if (draggedIndex !== null) return;

      if (isEditingMode && isAddingPoint) {
        const findNearestEdgeIndex = () => {
          let minDistance = Infinity;
          let insertAt = 0;
          for (let i = 0; i < currentPolygon.length; i++) {
            const nextIndex = (i + 1) % currentPolygon.length;
            const p1 = currentPolygon[i].coordinate;
            const p2 = currentPolygon[nextIndex].coordinate;
            const dist = distanceToSegment(coordinate, p1, p2);
            if (dist < minDistance) {
              minDistance = dist;
              insertAt = i;
            }
          }
          return insertAt;
        };
        const index = findNearestEdgeIndex();
        setCurrentPolygon(prev => {
          const updated = [...prev];
          updated.splice(index + 1, 0, {
            coordinate,
            lineType: currentLineType,
          });
          setCanUndo(true); // Enable undo after adding a point
          return updated;
        });
        // Reset to eave after adding point
        setCurrentLineType('eave');
        return;
      }

      if (!isDrawing) return;

      setCurrentPolygon(prev => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            lineType: currentLineType,
          };
        }
        updated.push({coordinate, lineType: currentLineType});
        setCanUndo(true); // Enable undo after adding a point
        return updated;
      });

      // Reset to eave after adding point
      setCurrentLineType('eave');
    },
    [
      isDrawing,
      isEditingMode,
      isAddingPoint,
      currentPolygon,
      currentLineType,
      draggedIndex,
    ],
  );
  const handleDragStart = useCallback((index: number) => {
    console.log('Drag started on point', index);
    setDraggedIndex(index);
  }, []);

  const handleDragEnd = useCallback((e: any, index: number) => {
    console.log('Drag ended on point', index);
    const {coordinate} = e.nativeEvent;
    setCurrentPolygon(prev => {
      const newCoords = [...prev];
      newCoords[index] = {...newCoords[index], coordinate};
      return newCoords;
    });
    setDraggedIndex(null);
  }, []);

  const startDrawing = useCallback(() => {
    console.log('Starting drawing');
    setIsDrawing(true);
    setCurrentPolygon([]);
    setCurrentLineType('eave'); // Ensure we start with eave
    setSelectedArea(null);
    setShowList(false);
    setEditingArea(null);
    setIsAddingPoint(false);
    setCanUndo(false); // Reset undo state when starting new drawing
  }, []);

  const finishDrawing = useCallback(() => {
    console.log('Finishing drawing with', currentPolygon.length, 'points');
    if (currentPolygon.length < 3) {
      showToast(
        'error',
        'Error',
        'You need at least 3 points to create a polygon',
      );
      return;
    }
    setShowNameDialog(true);
  }, [currentPolygon]);

  const saveArea = useCallback(() => {
    console.log('Saving area:', areaName);
    if (!areaName.trim()) {
      showToast('error', 'Error', 'Please enter a valid name for the area');
      return;
    }
    if (currentPolygon.length < 3) {
      showToast('error', 'Error', 'A polygon must have at least 3 points');
      return;
    }

    let finalizedPolygon = currentPolygon.map(point => ({
      ...point,
      coordinate: {...point.coordinate},
    }));
    const closedPolygon = [...finalizedPolygon, {...finalizedPolygon[0]}];

    if (editingArea) {
      console.log('Updating existing area:', editingArea.id);
      const updatedArea = {
        ...editingArea,
        name: areaName.trim(),
        coordinates: finalizedPolygon,
        areaSF: calculateArea(closedPolygon),
      };
      setAreas(prev =>
        prev.map(a => (a.id === updatedArea.id ? updatedArea : a)),
      );
    } else {
      console.log('Creating new area');
      const newArea: Area = {
        id: Date.now().toString(),
        name: areaName.trim(),
        coordinates: finalizedPolygon,
        areaSF: calculateArea(closedPolygon),
      };
      setAreas(prev => [...prev, newArea]);
    }

    setShowNameDialog(false);
    setAreaName('');
    setIsDrawing(false);
    setEditingArea(null);
    setCurrentPolygon([]);
    setIsAddingPoint(false);

    setTimeout(() => {
      if (closedPolygon.length > 0) {
        console.log('Zooming to saved area');
        mapRef.current?.fitToCoordinates(
          closedPolygon.map(p => p.coordinate),
          {
            edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
            animated: true,
          },
        );
      }
    }, 100);
  }, [areaName, currentPolygon, calculateArea, editingArea]);

  const deleteArea = useCallback(
    (id: string) => {
      console.log('Deleting area:', id);
      setAreas(prev => prev.filter(a => a.id !== id));
      if (selectedArea?.id === id) setSelectedArea(null);
    },
    [selectedArea],
  );

  const zoomToArea = useCallback((area: Area) => {
    console.log('Zooming to area:', area.id);
    setSelectedArea(area);
    mapRef.current?.fitToCoordinates(
      area.coordinates.map(p => p.coordinate),
      {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      },
    );
    setShowList(false);
  }, []);

  const editArea = useCallback((area: Area) => {
    console.log('Editing area:', area.id);
    const coordinates = [...area.coordinates];
    const shouldRemoveClosingPoint =
      coordinates.length > 2 &&
      coordinates[0].coordinate.latitude ===
        coordinates[coordinates.length - 1].coordinate.latitude &&
      coordinates[0].coordinate.longitude ===
        coordinates[coordinates.length - 1].coordinate.longitude;

    if (shouldRemoveClosingPoint) {
      coordinates.pop();
    }

    setEditingArea(area);
    setCurrentPolygon(coordinates);
    setAreaName(area.name);
    setIsDrawing(true);
    setIsAddingPoint(false);
    setShowList(false);
    setCurrentLineType('eave'); // Reset to eave when editing
    setCanUndo(coordinates.length > 0); // Set undo state based on existing points

    if (coordinates.length > 0) {
      const coordsToFit = [...coordinates];
      if (!shouldRemoveClosingPoint && coordinates.length > 2) {
        coordsToFit.push({...coordinates[0]});
      }
      mapRef.current?.fitToCoordinates(
        coordsToFit.map(p => p.coordinate),
        {
          edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
          animated: true,
        },
      );
    }
  }, []);

  const deletePoint = useCallback((index: number) => {
    setCurrentPolygon(prev => {
      if (prev.length <= 3) return prev;
      const updatedCoords = [...prev];
      updatedCoords.splice(index, 1);
      setCanUndo(updatedCoords.length > 0); // Update canUndo state
      return updatedCoords;
    });
  }, []);

  function distanceToSegment(point: LatLng, p1: LatLng, p2: LatLng) {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const lat1 = toRad(p1.latitude);
    const lon1 = toRad(p1.longitude);
    const lat2 = toRad(p2.latitude);
    const lon2 = toRad(p2.longitude);
    const lat = toRad(point.latitude);
    const lon = toRad(point.longitude);

    const A = lat - lat1;
    const B = lon - lon1;
    const C = lat2 - lat1;
    const D = lon2 - lon1;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    if (len_sq !== 0) param = dot / len_sq;

    let xx, yy;
    if (param < 0) {
      xx = lat1;
      yy = lon1;
    } else if (param > 1) {
      xx = lat2;
      yy = lon2;
    } else {
      xx = lat1 + param * C;
      yy = lon1 + param * D;
    }

    const dLat = lat - xx;
    const dLon = lon - yy;
    return Math.sqrt(dLat * dLat + dLon * dLon);
  }

  console.log(
    'Rendering MapScreen with currentPolygon:',
    currentPolygon.length,
  );

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={handleMapPress}>
        <MapAreas
          areas={areas.filter(a => !editingArea || a.id !== editingArea.id)}
          selectedArea={selectedArea}
          getCenter={getCenter}
        />
        <MapDrawing
          isDrawing={isDrawing}
          currentPolygon={currentPolygon}
          draggedIndex={draggedIndex}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          currentLineType={currentLineType}
          isEditingMode={isEditingMode}
          isAddingPoint={isAddingPoint}
          onDeletePoint={deletePoint}
          onAddPointBetween={function (
            index: number,
            coordinate: {latitude: number; longitude: number},
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
      </MapView>

      <MapControls
        isDrawing={isDrawing}
        currentPolygonLength={currentPolygon.length}
        currentLineType={currentLineType}
        onShowList={() => setShowList(true)}
        onStartDrawing={startDrawing}
        onFinishDrawing={finishDrawing}
        onSetLineType={type => {
          if (type === 'rake' && currentPolygon.length >= 2) {
            setCurrentPolygon(prev => {
              const updated = [...prev];
              // Set the previous line's type to 'rake' (i.e., second last point)
              updated[updated.length - 2] = {
                ...updated[updated.length - 2],
                lineType: 'rake',
              };
              return updated;
            });
          }

          // Always reset to 'eave' for the next point
          setCurrentLineType('eave');
        }}
        isEditingMode={isEditingMode}
        isAddingPoint={isAddingPoint}
        onToggleAddPoint={toggleAddPointMode}
        onFinishEditing={() => {
          setIsAddingPoint(false);
          finishDrawing();
        }}
        onUndo={handleUndo}
        canUndo={canUndo && currentPolygon.length > 0}
      />

      <AreaListModal
        visible={showList}
        areas={areas}
        onClose={() => setShowList(false)}
        onStartDrawing={() => {
          setEditingArea(null);
          startDrawing();
        }}
        onZoomToArea={zoomToArea}
        onDeleteArea={deleteArea}
        onEditArea={editArea}
      />

      <NameDialog
        visible={showNameDialog}
        areaName={areaName}
        onNameChange={setAreaName}
        onSave={saveArea}
        onCancel={() => {
          setShowNameDialog(false);
          setIsDrawing(!!editingArea);
        }}
        isEditing={isEditingMode}
      />
    </View>
  );
};

export default MapScreen;
