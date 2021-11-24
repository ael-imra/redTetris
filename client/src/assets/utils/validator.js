const Validator = function (key, value) {
	if (typeof value !== 'string') return false;
	const objectKeys = {
		username: value.match(/^[A-Za-z0-9]+$/) && value.length > 3 && value.length < 15,
		typeRoom: value.length !== 0 && (value === 'single' || value === 'multi'),
		typePrivacy: value.length !== 0 && (value === 'public' || value === 'private'),
		name: value.match(/^[A-Za-z0-9]+$/) && value.length > 3 && value.length < 15,
		numPlayer: value.match(/^[0-9]+$/) && parseInt(value) > 1 && parseInt(value) <= 10,
		// eslint-disable-next-line
		urlRoom: value.match(/^\#[A-Za-z0-9]{3,15}\[[A-Za-z0-9]{3,15}\]$/),
	};
	return objectKeys[key] ? true : false;
};
export { Validator };
