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
    background-color: rgba(52,73,94,.5);
    width: 100%;
    padding: 1em;
`;

const TrackControlsCurrent = styled.div`
    color: white;
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
	background-color: white;
    height: 0.5em;
    flex-grow: 1;
    margin-left: 0.5em;
`;

const TrackCurrentProgress = styled.span<{progress: number}>`
	display: block;
	transition: 0.5s width;
	background-color: #b3b3b3;
	height: 0.5em;
	width: ${props => props.progress}%;
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
