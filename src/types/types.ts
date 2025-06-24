export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface LinePoint {
  coordinate: LatLng;
  lineType: 'eave' | 'rake';
}

export interface Area {
  id: string;
  name: string;
  coordinates: LinePoint[];
  areaSF: number;
}