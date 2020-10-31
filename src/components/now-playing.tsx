import { Component, ComponentChild, h } from 'preact';
import { Station } from '../models/station';

export interface NowPlayingProps {
    station: Station;
}

export class NowPlaying extends Component<NowPlayingProps> {

    render({ station }: NowPlayingProps): ComponentChild {
        return (
            <div class='now-playing'>
                <img class='now-playing__image' src={station?.logoUrl ?? ''} />
                <div class='now-playing__meta'>
                    <div class='now-playing__title'>{station?.name ?? 'Unknown'}</div>
                    <div class='now-playing__description'>{station?.description ?? 'Unknown'}</div>
                </div>
            </div>
        );
    }

}
