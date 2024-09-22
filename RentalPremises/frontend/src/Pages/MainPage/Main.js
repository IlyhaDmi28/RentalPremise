import '../../styles/Main.css';
import React, { useState } from 'react';
import Header from './Header';
import MainArea from './MainArea';

function Main() {
	return (
		<div>
			<div>
				<Header/>
				<MainArea/>
			</div>
		</div>
  	);
}

export default Main;
