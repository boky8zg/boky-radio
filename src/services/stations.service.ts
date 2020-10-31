import { Station } from '../models/station';

export class StationsService {

    private stations: Station[] = null;

    async loadStations(): Promise<Station[]> {
        this.stations = await (await fetch('./assets/data/stations.json')).json();
        return this.stations;
    }

    getStations(): Station[] {
        return this.stations;
    }

}
