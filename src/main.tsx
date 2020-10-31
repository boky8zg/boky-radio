import { render, h } from 'preact';
import { App } from './components/app';

function main(): void {
    render(<App />, document.body);
}

main();
