import React from 'react';
import ReactDOM from 'react-dom';
import AlbumPlayer from '../index';

const album = {
	cover: "https://storage.googleapis.com/gb-albums/jadedAtTwentyTwo/cover.jpeg",
	title: "jadedAtTwentyTwo",
	tracks: [
	   {
		  index: 1,
		  name: "neverAgain",
		  url: "https://storage.googleapis.com/gb-albums/jadedAtTwentyTwo/01-neverAgain.mp3"
	   },
	   {
		  index: 2,
		  name: "oldBoy",
		  url: "https://storage.googleapis.com/gb-albums/jadedAtTwentyTwo/02-oldBoy.mp3"
	   },
	   {
		  index: 3,
		  name: "noRegrets",
		  url: "https://storage.googleapis.com/gb-albums/jadedAtTwentyTwo/03-regrets.mp3"
	   },
	   {
		  index: 4,
		  name: "perfectionIsAMyth",
		  url: "https://storage.googleapis.com/gb-albums/jadedAtTwentyTwo/04-perfectionIsAMyth.mp3"
	   },
	   {
		  index: 5,
		  name: "rejectedByMonogamy",
		  url: "https://storage.googleapis.com/gb-albums/jadedAtTwentyTwo/05-rejectedByMonogamy.mp3"
	   },
	   {
		  index: 6,
		  name: "tuple",
		  url: "https://storage.googleapis.com/gb-albums/jadedAtTwentyTwo/06-tuple.mp3"
	   },
	   {
		  index: 7,
		  name: "joyFormation",
		  url: "https://storage.googleapis.com/gb-albums/jadedAtTwentyTwo/07-joyFormation.mp3"
	   }
	]
}

document.addEventListener('DOMContentLoaded', () => {
	const [root] = document.getElementsByClassName('react-root');
	ReactDOM.render(
		<AlbumPlayer {...album}/>,
		root
	);
});
