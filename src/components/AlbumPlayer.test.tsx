import React from 'react';
import { shallow, mount } from 'enzyme';
import AlbumPlayer from './AlbumPlayer';
import { ThemeProvider } from 'styled-components';
import { BoolTheme } from '../themes';

// mocking HtmlMediaElement
window.HTMLMediaElement.prototype.load = () => { }; // eslint-disable-line
window.HTMLMediaElement.prototype.play = () => Promise.resolve();
window.HTMLMediaElement.prototype.pause = () => { }; // eslint-disable-line

const mixtape = {
	title: '2nd amendment',
	cover: 'https://f4.bcbits.com/img/a3659417884_16.jpg',
	artist: 'JPEGMAFIAxFreaky',
	tracks: [
		{
			url: 'https://jpegmafia.bandcamp.com/track/i-might-vote-4-donald-trump',
			name: 'I Might Vote 4 Donald Trump',
			index: 0,
		},
		{
			url: 'https://jpegmafia.bandcamp.com/track/trussmidaddi',
			name: 'Trussmidaddi',
			index: 1,
		},
	],
};

describe('rendering AlbumPlayer', () => {
	it('renders album player as expected', () => {
		const player = mount(
			<ThemeProvider theme={BoolTheme}>
				<AlbumPlayer {...mixtape}/>
			</ThemeProvider>
		);
		expect(player).toMatchSnapshot();
	});

	it('changes the current track on click', () => {
		const player = mount(
			<ThemeProvider theme={BoolTheme}>
				<AlbumPlayer {...mixtape}/>
			</ThemeProvider>
		);
		const tracks = player.find('li');
		tracks.at(1).simulate('click');
		const current = player.find({'data-tid': 'current-track'});
		expect(current.length).toBeGreaterThan(1);
		expect(current.at(0).text()).toEqual('Trussmidaddi');
	});
});
