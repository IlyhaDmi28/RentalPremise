import '../../styles/Main.css';
import '../../styles/Owner.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../MainPage/Header';
import EditUserData from './EditUserData';

function EditUser() {
	return (
		<div>
			<Header/>
			<EditUserData/>
		</div>
  	);
}

export default EditUser;
