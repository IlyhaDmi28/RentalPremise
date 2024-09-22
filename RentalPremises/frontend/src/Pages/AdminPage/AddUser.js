import '../../styles/Main.css';
import '../../styles/Owner.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../MainPage/Header';
import AddUserData from './AddUserData';

function AddUser() {
	return (
		<div>
			<Header/>
			<AddUserData/>
		</div>
  	);
}

export default AddUser;
