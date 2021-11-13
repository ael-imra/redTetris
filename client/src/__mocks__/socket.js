export const emit = (param) => {
	if ('join room' === param) {
		window.location.href = `/#A1[sel-hamr]`;
	}
	if ('list rooms' === param) {
		window.location.href = `/#A1[sel-hamr]`;
	}
};

export const on = (param) => {
	if ('list room' === param) {
	}
	if ('room joined') {
		window.location.href = `/#A1[sel-hamr]`;
	}
};
