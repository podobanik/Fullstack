import './ButtonCustom.css';
import { memo } from 'react';

function ButtonCustom({ children, onClick }) {
	return (
		<button className='button accent' onClick={onClick}>{children}</button>
	);
}

export default memo(ButtonCustom);