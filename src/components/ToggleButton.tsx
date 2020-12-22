import React from 'react';
import styled from 'styled-components'

import { Play, Pause, Spinner } from './icons';

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

export default ToggleButton;
