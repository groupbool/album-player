import React from 'react';
import styled, {keyframes} from 'styled-components'

interface ButtonProps {
	color?: string;
}

const SvgButton = styled.svg<ButtonProps>`
	fill: ${props => props.color || 'white'};
    font-size: 1.5em;
	&:hover {
      fill: #b3b3b3;
      cursor: pointer;
    }
    &:active {
      fill: #ccc;
    }
`;

/**
 * Material play icon (https://material.io/resources/icons/?search=play&icon=play_circle_outline&style=baseline)
 */
export function Play(props: ButtonProps) {
	return (
		<SvgButton
			width="24"
			height="24"
			viewBox="0 0 24 24"
			{...props}
		>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
		</SvgButton>
	);
}

/******************************************************************************/

/**
 * Material pause icon (https://material.io/resources/icons/?search=pause&icon=pause_circle_outline&style=baseline)
 */
export function Pause(props: ButtonProps) {
	return (
		<SvgButton
			width="24"
			height="24"
			viewBox="0 0 24 24"
			{...props}
		>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z" />
		</SvgButton>
	);
}

/******************************************************************************/

const SpinnerKeyFrame = keyframes`
	0% {
	  transform: rotate(0deg);
	}
	100% {
	  transform: rotate(360deg);
	}
`;

const SpinnerContainer = styled.div`
	display: flex;
	position: relative;
`;

const SpinnerRing = styled.div<{index: number}>`
	box-sizing: border-box;
	display: block;
	position: absolute;
	width: 20px;
	height: 20px;
	margin: 2px;
	border: 3px solid #fff;
	border-radius: 50%;
	animation: ${SpinnerKeyFrame} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: #fff transparent transparent transparent;
	animation-delay: ${props => (4 - props.index) * -0.15}s;
`;

/**
 * A simple loading spinner
 */
export function Spinner() {
	return (
		<SpinnerContainer>
			<SpinnerRing index={1}></SpinnerRing>
			<SpinnerRing index={2}></SpinnerRing>
			<SpinnerRing index={3}></SpinnerRing>
			<SpinnerRing index={4}></SpinnerRing>
		</SpinnerContainer>
	);
}
