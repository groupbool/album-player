import AlbumPlayer from './components/AlbumPlayer';
import { DefaultTheme } from 'styled-components';

export const Theme: DefaultTheme = {
	font: 'monospace',
	base: 'black',
	controls: {
		base: 'white',
		background: 'rgba(52,73,94,.5)',
		hover: '#B3B3B3',
		fill: '#ccc',
	},
	tracks: {
		active: '#C86ED3',
		hover: '#dfe7e9',
	},
};

export default AlbumPlayer;
