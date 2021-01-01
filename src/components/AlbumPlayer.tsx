import React from 'react';
import styled from 'styled-components'

import { Track } from './models';

import AudioPlayer from '../utils/audioplayer';
import TrackList from './TrackList';
import TrackControls from './TrackControls';

export interface AlbumPlayerProps {
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
	font-family: ${props => props.theme.font};
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
		this.handleShortcuts = this.handleShortcuts.bind(this);
	}

	componentDidMount(): void {
		this.player = new AudioPlayer({
			onProgress: progress => this.setState({ progress }),
			onTrackEnd: this.handleTrackEnd,
		});
		document.addEventListener('keyup', e => this.handleShortcuts(e.key));
	}

	componentWillUnmount(): void {
		this.player.destroy();
		document.removeEventListener('keyup', e => this.handleShortcuts(e.key));
	}

	/**
	 * Handles actions corresponding to keyboard shortcuts.
	 */
	private handleShortcuts(key: string): void {
		if (key === ' ') {
			const track = this.track();
			this.handleControl(track.url);
		}
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
