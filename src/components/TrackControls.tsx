import React from 'react';
import styled from 'styled-components'

import { Track } from './models';
import ToggleButton from './ToggleButton';

interface TrackControlsProps {
	progress: number;
	track: Track;
	playing: boolean;
	busy: boolean;
	onToggle: () => void;
}

const TrackControlsContainer = styled.div`
	background-color: ${props => props.theme.controls.background};
    width: 100%;
    padding: 1em;
`;

const TrackControlsCurrent = styled.div`
    color: ${props => props.theme.controls.base};
	font-style: italic;
	height: 1.2em;
	font-size: 0.9em;
`;

const TrackMediaControls = styled.div`
	width: 100%;
	margin-top: 0.5em;
	display: flex;
	align-items: center;
`;

const TrackProgress = styled.div`
	background-color: ${props => props.theme.controls.base};
    height: 0.5em;
    flex-grow: 1;
    margin-left: 0.5em;
`;

interface TrackCurrentProgressProps {
	progress: number;
}

const TrackCurrentProgress = styled.span.attrs<TrackCurrentProgressProps>(props => ({
	// width: props.progress + "%",
	// width: "50%",
	style: {
		width: props.progress + "%",
	},
}))<TrackCurrentProgressProps>`
	display: block;
	transition: 0.5s width;
	background-color: ${props => props.theme.controls.fill};
	height: 0.5em;
`;

function TrackControls(props: TrackControlsProps): JSX.Element {
	const { progress, track } = props;
	return (
		<TrackControlsContainer>
			<TrackControlsCurrent data-tid="current-track">
				{track.name}
			</TrackControlsCurrent>
			<TrackMediaControls>
				<ToggleButton
					playing={props.playing}
					busy={props.busy}
					onToggle={props.onToggle}
				/>
				<TrackProgress>
					<TrackCurrentProgress progress={progress}/>
				</TrackProgress>
			</TrackMediaControls>
		</TrackControlsContainer>
	);
}

export default TrackControls;
