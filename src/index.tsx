import React from 'react';
import AlbumPlayer, { AlbumPlayerProps } from './components/AlbumPlayer';
import { ThemeProvider } from 'styled-components';
import { BoolTheme } from './themes';

/**
 * An album player component that uses the default theme.
 * @param props 
 */
export default function DefaultAlbumPlayer(props: AlbumPlayerProps) : JSX.Element {
	return (
		<ThemeProvider theme={BoolTheme}>
			<AlbumPlayer {...props}/>
		</ThemeProvider>
	)
}

export { AlbumPlayer };
