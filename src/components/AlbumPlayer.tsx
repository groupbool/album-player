import React from 'react';
import styled from 'styled-components'

import { Play, Pause, Spinner } from './icons';
import AudioPlayer from '../utils/audioplayer';

interface Track {
	index: number;
	name: string;
	url: string;
}

interface AlbumPlayerProps {
	cover: string;
	title: string;
	tracks: Track[];
	className?: string;
}

interface AlbumPlayerState {
	index: number;
	playing: boolean;
	busy: boolean;
	progress: number;
}

const AlbumPlayerContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #ecf0f1;
`;

const AlbumCoverContainer = styled.div`
	position: relative;
`;

const AlbumCoverImage = styled.img`
    display: block;
    width: 100%;
	height: auto;
`;

const AlbumControlsContainer = styled.div`
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
`;

/**
 * Showcases an album art and lists all available track. Tracks
 * can be selected and playback can be controlled.
 */
export default class AlbumPlayer extends React.PureComponent<AlbumPlayerProps, AlbumPlayerState> {
	private player: AudioPlayer;

	constructor(props: AlbumPlayerProps) {
		super(props);
		this.state = {
			index: 0,
			playing: false,
			busy: false,
			progress: 0, // measure of completion
		};

		this.handleControl = this.handleControl.bind(this);
		this.handleTrackEnd = this.handleTrackEnd.bind(this);
		this.handleTrackSelect = this.handleTrackSelect.bind(this);
	}

	componentDidMount(): void {
		this.player = new AudioPlayer({
			onProgress: progress => this.setState({ progress }),
			onTrackEnd: this.handleTrackEnd,
		});
	}

	componentWillUnmount(): void {
		this.player.destroy();
	}

	handleTrackEnd(): void {
		const { tracks } = this.props;
		const { index } = this.state;
		const next = index + 1;
		if (next < tracks.length) {
			const track = tracks[next];
			console.debug('next track:', track.name);
			this.setState({ index: next, progress: 0, playing: false },
				() => this.handleControl(track.url));
		} else {
			this.setState({ playing: false });
		}
	}

	track(): Track {
		const { tracks } = this.props;
		const { index } = this.state;
		return tracks[index];
	}

	/**
	 * Handles play/pause behavior for the given audio url
	 * @param url The current audio url
	 */
	private handleControl(url: string) {
		this.setState({ busy: true }, () => {
			const { playing } = this.state;
			if (playing) {
				// pause track
				this.player.pause();
				this.setState({ busy: false, playing: false });
			} else {
				// play track
				this.player.play(url)
					.then(() => this.setState({ busy: false, playing: true }))
					.catch(err => {
						console.error('audio player error:', err);
						this.setState({ busy: false });
					});
			}
		});
	}

	handleTrackSelect(index: number): void {
		this.player.pause();
		this.setState({
			index: index,
			playing: false,
			progress: 0,
		});
	}

	render(): React.ReactNode {
		const { index, progress, playing, busy } = this.state;
		const { cover, title, tracks, className } = this.props;
		const current = tracks[index];
		return (
			<AlbumPlayerContainer className={className}>
				<AlbumCoverContainer>
					<AlbumControlsContainer>
						<TrackControls
							progress={progress}
							track={current}
							playing={playing}
							busy={busy}
							onToggle={() => this.handleControl(current.url)}
						/>
					</AlbumControlsContainer>
					<AlbumCoverImage src={cover} alt={title} />
				</AlbumCoverContainer>
				<TrackList
					tracks={tracks}
					selected={index}
					onSelect={this.handleTrackSelect}
				/>
			</AlbumPlayerContainer>
		);
	}
}


/******************************************************************************/

interface ToggleButtonProps {
	playing: boolean;
	busy: boolean;
	onToggle: () => void;
}

const Loading = styled.div`
	height: 1.5em;
    width: 1.5em;
`;

const ButtonContainer = styled.i`
	display: flex;
	align-items: center;
`;

function ToggleButton(props: ToggleButtonProps): JSX.Element {
	const { playing, busy } = props;
	if (busy) {
		return (
			<Loading>
				<Spinner />
			</Loading>
		);
	}
	return (
		<ButtonContainer onClick={props.onToggle}>
			{playing ? <Pause/> : <Play/>}
		</ButtonContainer>
	);
}

/******************************************************************************/

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
			<TrackControlsCurrent>
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

/******************************************************************************/

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
