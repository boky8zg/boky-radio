import { Component, ComponentChild, h } from 'preact';
import { call } from '../helpers/function-helpers';

export interface ToolbarProps {
    hasPrev?: boolean;
    hasNext?: boolean;
    isPlaying?: boolean;
    onAction?: (action: ToolbarAction) => void;
}

export type ToolbarAction =
    'prev' |
    'next' |
    'play' |
    'pause';

export class Toolbar extends Component<ToolbarProps> {

    emitAction(action: ToolbarAction): void {
        call(this.props.onAction, action);
    }

    render({ hasPrev, hasNext, isPlaying }: ToolbarProps): ComponentChild {
        isPlaying = isPlaying ?? false;

        return (
            <div class='toolbar'>
                <button class='toolbar__btn' style={{ visibility: hasPrev ? 'visible' : 'hidden' }} onClick={() => this.emitAction('prev')}>
                    <svg viewBox='0 0 320.012 320.012'>
                        <path d='M32.006,0.012c8.832,0,16,7.168,16,16v116.64L280.166,2.06c4.896-2.784,11.008-2.752,15.904,0.128s7.936,8.128,7.936,13.824v288c0,5.696-3.04,10.944-7.936,13.824c-2.464,1.44-5.28,2.176-8.064,2.176c-2.72,0-5.408-0.672-7.84-2.048L48.006,187.372v116.64c0,8.832-7.168,16-16,16s-16-7.168-16-16v-288C16.006,7.18,23.174,0.012,32.006,0.012z' />
                    </svg>
                </button>
                <button class='toolbar__btn toolbar__btn-play-pause' onClick={() => this.emitAction(isPlaying ? 'pause' : 'play')}>
                    {
                        isPlaying ?
                        <svg viewBox='0 0 320 320'>
                            <path d='M112,0H16C7.168,0,0,7.168,0,16v288c0,8.832,7.168,16,16,16h96c8.832,0,16-7.168,16-16V16C128,7.168,120.832,0,112,0z' />
                            <path d='M304,0h-96c-8.832,0-16,7.168-16,16v288c0,8.832,7.168,16,16,16h96c8.832,0,16-7.168,16-16V16C320,7.168,312.832,0,304,0z' />
                        </svg>
                        :
                        <svg viewBox='0 0 320.001 320.001'>
                            <path d='M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z' />
                        </svg>
                    }
                </button>
                <button class='toolbar__btn' style={{ visibility: hasNext ? 'visible' : 'hidden' }} onClick={() => this.emitAction('next')}>
                    <svg viewBox='0 0 320 320'>
                        <path d='M288,0c-8.832,0-16,7.168-16,16v116.64L39.84,2.048c-4.896-2.752-11.008-2.72-15.904,0.128S16,10.304,16,16v288c0,5.696,3.04,10.944,7.936,13.824C26.4,319.264,29.216,320,32,320c2.72,0,5.408-0.672,7.84-2.048L272,187.36V304c0,8.832,7.168,16,16,16s16-7.168,16-16V16C304,7.168,296.832,0,288,0z' />
                    </svg>
                </button>
            </div>
        );
    }

}
