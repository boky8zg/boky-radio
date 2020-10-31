import { Component, ComponentChild, h } from 'preact';
import { call } from '../helpers/function-helpers';
import { Station } from '../models/station';

export interface ListItemProps {
    station: Station;
    active: boolean;
    onStationSelected?: () => void;
}

export class ListItem extends Component<ListItemProps> {

    emitOnStationSelected(): void {
        if (!this.props.active) {
            call(this.props.onStationSelected);
        }
    }

    render({ station, active }: ListItemProps): ComponentChild {
        return (
            <div class={`list-item${active ? ' list-item--active' : ''}`} onClick={() => this.emitOnStationSelected()}>
                <img class='list-item__image' src={station.logoUrl} />
                <div class='list-item__meta'>
                    <div class='list-item__title'>{station.name}</div>
                    <div class='list-item__description'>{station.description}</div>
                </div>
            </div>
        );
    }

}
