import React from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

export default function SimplePopover () {
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
				Open Popover
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<form
					onSubmit={() => {
						console.log('subumit');
						handleClose();
					}}
				>
					<input id="search" />
					<button style={{ minWidth: 20 }}>√</button>
				</form>
			</Popover>
		</div>
	);
}
