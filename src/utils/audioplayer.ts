interface AudioPlayerOpts {
	onProgress: (n: number) => void,
	onTrackEnd: () => void,
};

/**
 * An interface to play audio files using the HTML5 audio object. This abstracts
 * audio caching and stream so any user can simply access audio tracks using simple play
 * and pause methods.
 */
export default class AudioPlayer {
	private audio: HTMLAudioElement;
	private cache: Map<string, ArrayBuffer>;
	private onProgress: (n: number) => void;
	private onTrackEnd: () => void;

	/**
	 * The AudioPlayer constructor
	 * @param props The audio player opts
	 */
	constructor(props: AudioPlayerOpts) {
		this.audio = new Audio();
		// this.context = new AudioContext();
		// a simple audio cache that stores binary audio data
		// keyed by the source url
		this.cache = new Map();
		this.onProgress = props.onProgress;
		this.onTrackEnd = props.onTrackEnd;

		this.handleProgress = this.handleProgress.bind(this);

		// setting up common audio handlers
		this.audio.addEventListener('ended', this.onTrackEnd);
		this.audio.addEventListener('timeupdate', this.handleProgress);
	}

	private handleProgress() {
		const progress = (this.audio.currentTime / this.audio.duration) * 100;
		this.onProgress(+progress.toFixed(2));
	}

	/**
	 * Asynchronously loads the audio file as an array buffer
	 * @param url The audio source url
	 */
	private async load(url: string) : Promise<ArrayBuffer> {
		if (this.cache.has(url)) {
			const buf = this.cache.get(url) as ArrayBuffer;
			return buf;
		}
		return fetch(url)
			.then(res => res.arrayBuffer())
			.then(buffer => {
				this.cache.set(url, buffer);
				return buffer;
			});
	}

	/**
	 * Plays the audio at the given url. The returned promise is only resolved when
	 * the audio has been loaded and can be played.
	 *
	 * @param url The audio url
	 */
	play(url: string) {
		if (this.audio.src !== url) {
			this.audio.src = url;
		}
		this.audio.play();
		return new Promise(resolve => {
			this.audio.addEventListener('canplay', resolve);
			this.audio.addEventListener('playing', resolve);
		});
	}

	/**
	 * Pauses the currently playing audio.
	 */
	pause() {
		this.audio.pause();
	}

	/**
	 * Removes and event listeners to ensure that there are no
	 * memory leaks.
	 */
	destroy() {
		// this.audio.removeEventListener('canplay');
		this.audio.removeEventListener('ended', this.onTrackEnd);
		this.audio.removeEventListener('timeupdate', this.handleProgress);
	}
}

