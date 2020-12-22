import React from 'react';
import styled from 'styled-components'

import { Track } from './models';

interface TrackListProps {
	selected: number;
	tracks: Track[];
	onSelect: (index: number) => void;
}

const TrackListContainer = styled.ol`
	margin: 1em 0;
	padding: 0;
	list-style: none;
`;

const TrackListItem = styled.li<{selected: boolean}>`
	padding: 0.7em 1em;
	color: ${props => props.selected ? '#C86ED3' : 'inherit'};
	&:hover {
		cursor: pointer;
      	background-color: #dfe7e9;
	}
`;

const TrackIndex = styled.span`
	margin-right: 0.5em;
`;

function TrackList(props: TrackListProps): JSX.Element {
	const { selected, tracks } = props;
	return (
		<TrackListContainer>
			{tracks.map((track: Track, i: number) => {
				return (
					<TrackListItem
						key={track.index}
						selected={i == selected}
						onClick={() => props.onSelect(i)}
					>
						<TrackIndex>{i + 1}</TrackIndex> {track.name}
					</TrackListItem>
				);
			})}
		</TrackListContainer>
	);
}

export default TrackList;
