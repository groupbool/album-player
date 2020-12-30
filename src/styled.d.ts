// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
	export interface DefaultTheme {
		font: string;
		base: string;
		controls: {
			base: string;
			background: string;
			fill: string;
			hover: string;
		};
		tracks: {
			active: string;
			hover: string;
		};
	}
}