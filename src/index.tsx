import React from 'react';
import AlbumPlayer, { AlbumPlayerProps } from './components/AlbumPlayer';
import { DefaultTheme, ThemeProvider } from 'styled-components';

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

/**
 * An album player component that uses the default theme.
 * @param props 
 */
export default function DefaultAlbumPlayer(props: AlbumPlayerProps) : JSX.Element {
	return (
		<ThemeProvider theme={Theme}>
			<AlbumPlayer {...props}/>
		</ThemeProvider>
	)
}

export { AlbumPlayer };
