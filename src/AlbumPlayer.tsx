import React from 'react';
import classNames from 'classnames';

import { Play, Pause, Spinner } from './utils/icons';
import AudioPlayer from './audioplayer';

interface Track {
	index: number;
	name: string;
	url: string;
}

interface AlbumPlayerProps {
	cover: string;
	title: string;
	tracks: Track[];
}

interface AlbumPlayerState {
	index: number;
	playing: boolean;
	busy: boolean;
	progress: number;
}

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
		const { cover, title, tracks, } = this.props;
		const current = tracks[index];
		return (
			<div className="album">
				<div className="album-cover-container">
					<div className="album-controls-container">
						<TrackControls
							progress={progress}
							track={current}
							playing={playing}
							busy={busy}
							onToggle={() => this.handleControl(current.url)}
						/>
					</div>
					<img className="album-cover-img" src={cover} alt={title} />
				</div>
				<TrackList
					tracks={tracks}
					selected={index}
					onSelect={this.handleTrackSelect}
				/>
			</div>
		);
	}
}


/******************************************************************************/

interface ToggleButtonProps {
	playing: boolean;
	busy: boolean;
	onToggle: () => void;
}

function ToggleButton(props: ToggleButtonProps): JSX.Element {
	const { playing, busy } = props;
	if (busy) {
		return (
			<div className="media-controls-loading">
				<Spinner />
			</div>
		);
	}
	return (
		<i className="btn-control-container" onClick={props.onToggle}>
			{playing ? <Pause className="btn-control" /> : <Play className="btn-control" />}
		</i>
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

function TrackControls(props: TrackControlsProps): JSX.Element {
	const { progress, track } = props;
	return (
		<div className="album-controls">
			<div className="selected-info">
				{track.name}
			</div>
			<div className="media-controls">
				<ToggleButton
					playing={props.playing}
					busy={props.busy}
					onToggle={props.onToggle}
				/>
				<span className="track-progress">
					<span
						className="track-progress-current"
						style={{ width: `${progress}%` }}
					/>
				</span>
			</div>
		</div>
	);
}

/******************************************************************************/

interface TrackListProps {
	selected: number;
	tracks: Track[];
	onSelect: (index: number) => void;
}

function TrackList(props: TrackListProps): JSX.Element {
	const { selected, tracks } = props;
	return (
		<ol className="tracks">
			{tracks.map((track: Track, i: number) => {
				const trackClassName = classNames({
					'track': true,
					'track-selected': i == selected,
				});
				return (
					<li
						key={track.index}
						className={trackClassName}
						onClick={() => props.onSelect(i)}
					>
						<span className="track-number">{i + 1}</span> {track.name}
					</li>
				);
			})}
		</ol>
	);
}
