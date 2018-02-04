import PropTypes from 'prop-types';

export const REACT_APP_API_SERVER = process.env.REACT_APP_AUTHPLZ_API;

export const classNameMapShape = PropTypes.shape({
	form: {
		buttons: PropTypes.shape({
			group: PropTypes.string,
			primary: PropTypes.string,
			secondary: PropTypes.string,
		}),
		input: PropTypes.object,
		invalidInput: PropTypes.object,
	}
});
