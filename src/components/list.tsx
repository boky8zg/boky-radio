import { Component, ComponentChild, h } from 'preact';
import { call } from '../helpers/function-helpers';
import { Station } from '../models/station';
import { ListItem } from './list-item';

export interface ListProps {
    stations: Station[];
    nowPlayingStationIndex: number;
    onStationChange?: (stationIndex: number) => void;
}

export class List extends Component<ListProps> {

    onStationSelected(stationIndex: number): void {
        call(this.props.onStationChange, stationIndex);
    }

    render({ stations, nowPlayingStationIndex }: ListProps): ComponentChild {
        return (
            <div class='list'>
                {stations.map((station, index) => <ListItem station={station} active={nowPlayingStationIndex === index} onStationSelected={() => this.onStationSelected(index)} />)}
            </div>
        );
    }

}
