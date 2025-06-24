import { LatLng } from 'react-native-maps';

export const toRadians = (deg: number): number => (deg * Math.PI) / 180;

export const calculateArea = (coords: LatLng[]): number => {
  if (coords.length < 3) return 0;

  const radius = 6378137; // meters
  let area = 0;
  const closed = [...coords, coords[0]];

  for (let i = 0; i < closed.length - 1; i++) {
    const p1 = closed[i];
    const p2 = closed[i + 1];
    area +=
      toRadians(p2.longitude - p1.longitude) *
      (2 + Math.sin(toRadians(p1.latitude)) + Math.sin(toRadians(p2.latitude)));
  }

  area = (area * radius * radius) / 2.0;
  return Math.abs(area * 10.7639); // in square feet
};

export const getCenter = (coords: LatLng[]): LatLng => {
  const lat = coords.reduce((sum, p) => sum + p.latitude, 0) / coords.length;
  const lng = coords.reduce((sum, p) => sum + p.longitude, 0) / coords.length;
  return { latitude: lat, longitude: lng };
};
