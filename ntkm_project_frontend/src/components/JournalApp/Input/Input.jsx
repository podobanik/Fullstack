import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

const Input = forwardRef(function Input({ isValid, appearence, className, ...props }, ref) {
	return (
		<input ref={ref} className={cn(className, {
			[styles['invalid']]: isValid,
			[styles['input-title']]: appearence == 'title',
			[styles['input']]: appearence == 'post',
			[styles['input-select']]: appearence == 'folder',
		})} {...props}/>
	);
});

export default Input;