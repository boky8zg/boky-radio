import { Component, ComponentChild, h } from 'preact';
import { Inject } from '../decorators/inject';
import { Station } from '../models/station';
import { StationsService } from '../services/stations.service';
import { List } from './list';
import { NowPlaying } from './now-playing';
import { Toolbar, ToolbarAction } from './toolbar';

export interface AppState {
    stations: Station[];
    nowPlayingStationIndex: number;
    nowPlayingStation: Station;
    isPlaying: boolean;
}

export class App extends Component<{}, AppState> {

    state: AppState = {
        stations: [],
        nowPlayingStationIndex: -1,
        nowPlayingStation: null,
        isPlaying: false,
    };

    audio: HTMLAudioElement = new Audio();

    @Inject(StationsService)
    stationsService: StationsService;

    async componentDidMount(): Promise<void> {
        const stations = await this.stationsService.loadStations();
        let persistentState = {
            isPlaying: false,
            nowPlayingStationIndex: 0
        };;

        try {
            const persistentStateJSON = JSON.parse(localStorage.getItem('persistentState'));

            if (persistentStateJSON) {
                persistentState = persistentStateJSON;
            }
        } catch (error) {
            // Do nothing
        }

        this.setState({
            stations,
            nowPlayingStationIndex: persistentState.nowPlayingStationIndex,
            nowPlayingStation: stations[persistentState.nowPlayingStationIndex],
            isPlaying: persistentState.isPlaying
        });
    }

    shouldComponentUpdate(_nextProps: {}, nextState: AppState): boolean {
        const { isPlaying, nowPlayingStationIndex } = nextState;
        const persistentState = { isPlaying, nowPlayingStationIndex };

        localStorage.setItem('persistentState', JSON.stringify(persistentState))

        return true;
    }

    onToolbarAction(action: ToolbarAction): void {
        switch (action) {
            case 'prev':
                return this.changeStation(this.state.nowPlayingStationIndex - 1);

            case 'next':
                return this.changeStation(this.state.nowPlayingStationIndex + 1);

            case 'play':
                this.play();
                return this.setState({ isPlaying: true });

            case 'pause':
                this.pause();
                return this.setState({ isPlaying: false });
        }
    }

    async play(streamUrl?: string): Promise<void> {
        if (!streamUrl) {
            streamUrl = this.state.nowPlayingStation.streamUrl;
        }

        this.audio.src = streamUrl;

        try {
            await this.audio.play();
        } catch (error) {
            this.pause();
        }
    }

    pause(): void {
        this.audio.pause();
    }

    changeStation(stationIndex: number): void {
        if (!this.isValidStationIndex(stationIndex)) {
            return;
        }

        this.play(this.state.stations[stationIndex].streamUrl);

        this.setState(state => ({
            nowPlayingStationIndex: stationIndex,
            nowPlayingStation: state.stations[stationIndex],
            isPlaying: true,
        }));
    }

    isValidStationIndex(stationIndex: number): boolean {
        return stationIndex >= 0 && stationIndex < this.state.stations.length;
    }

    render(_props: {}, state: AppState): ComponentChild {
        return (
            <div class="app">
                <NowPlaying station={state.nowPlayingStation} />
                <Toolbar
                    isPlaying={state.isPlaying}
                    hasPrev={state.nowPlayingStationIndex > 0}
                    hasNext={state.nowPlayingStationIndex < state.stations.length - 1}
                    onAction={action => this.onToolbarAction(action)} />
                <List
                    stations={state.stations}
                    nowPlayingStationIndex={state.nowPlayingStationIndex}
                    onStationChange={stationIndex => this.changeStation(stationIndex)} />
            </div>
        );
    }

}
