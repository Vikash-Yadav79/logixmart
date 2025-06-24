export interface Area {
  id: string;
  name: string;
  coordinates: { latitude: number; longitude: number }[];
  areaSF: number;
  center: { latitude: number; longitude: number };
}
