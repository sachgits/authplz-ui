import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class TextInput extends PureComponent {
	getClassName = element => {
		const isInvalid = this.props.errorText != null;
		const classNameMap = this.props.classNameMap;

		return cn(classNameMap[element], {
			[classNameMap.valid[element]]: !isInvalid,
			[classNameMap.invalid[element]]: isInvalid,
		});
	}

	render() {
		const {
			labelText,
			type,
			value,
			onChange,
			onKeyPress,
			errorText,
			hintText,
		} = this.props;

		const subtext = errorText != null ? errorText : hintText;
		const wrapperClassName = this.getClassName('wrapper');
		const labelClassName = this.getClassName('label');
		const inputClassName = this.getClassName('input');
		const subtextClassName = this.getClassName('subtext');
		
		return (
			<div className={wrapperClassName}>
				<label className={labelClassName}>{labelText}</label>
				<input
					className={inputClassName}
					value={value}
					onChange={onChange}
					onKeyPress={onKeyPress}
					type={type}
				/>
				{subtext != null && (
					<small className={subtextClassName}>
						{subtext}
					</small>
				)}
			</div>
		)
	}
}

TextInput.propTypes = {
	/* Class for the top-level node */
	classNameMap: PropTypes.shape({
		wrapper: PropTypes.string,
		input: PropTypes.string,
		label: PropTypes.string,
		subtext: PropTypes.string,
	}),
	invalidClassNameMap: PropTypes.shape({
		wrapper: PropTypes.string,
		input: PropTypes.string,
		label: PropTypes.string,
		subtext: PropTypes.string,
	}),
	/* Label contents for the input */
	labelText: PropTypes.string,
	/* Value of the input */
	value: PropTypes.string,
	/* Type of the input */
	type: PropTypes.string,
	/* Callback for when the text input changes */
	onChange: PropTypes.func,
	/* Text to show while the input is in an error state */
	errorText: PropTypes.string,
	/* Text to show as a hint for the input */
	hintText: PropTypes.string,
	/* Callback function to be called on key press */
	onKeyPress: PropTypes.func,
};

TextInput.defaultProps = {
	classNameMap: {
		wrapper: '',
		input: '',
		label: '',
		subtext: '',
		valid: {
			wrapper: '',
			input: '',
			label: '',
			subtext: '',
		},
		invalid: {
			wrapper: '',
			input: '',
			label: '',
			subtext: '',
		}
	},
}
