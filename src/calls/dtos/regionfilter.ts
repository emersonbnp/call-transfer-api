export class RegionFilter {
  public constructor({ longitude, latitude, distance }: RegionFilter) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.distance = distance;
  }
  readonly longitude: number;
  readonly latitude: number;
  readonly distance: number;
}
