import '../../styles/Authorization.css';
import myRent from '../../img/my_rent.svg';
import message from '../../img/message.svg';
import noPhoto from '../../img/no-photo.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");


function UserInterface() {
    const [user, setUser] = useState({});
    const [ava, setAva] = useState(null);
    const [isVisibleUserController, setIsVisibleUserController] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://localhost:3441/user/my`, {
                headers: {
                    'Authorization': `${accessToken}; ${refreshToken}`
                }
            });
            const user = response.data;
            setUser(user);
        };

        // Загрузка данных с сервера при монтировании компонента
        fetchData();
    }, []);


    const handleLogout = () => {
        // Очистить данные из локального хранилища или выполнить другие действия при выходе
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.location.href = '/login';
    };

    const handleUser = () => {
        setIsVisibleUserController(!isVisibleUserController);
    };

	return (
	    <div class="userInterface" style={{marginLeft: user.Role !== 2 ? '848px' : '930px'}}>
            {user.Role === 0 && <a href="/rental" className="userInterfaceComponent">
                <img src={myRent} alt=""/>
                <p>Аренды</p>
            </a>}

            {user.Role === 1 && <a href="/application" className="userInterfaceComponent">
                <img src={myRent} alt=""/>
                <p>Заявки</p>
            </a> }

           <a href="/announcement" className="userInterfaceComponent">
                <img  src={message} alt=""/>
                <p>Объявления</p>
            </a>
            
            
                <div className="userInterfaceComponent" onClick={handleUser} >
                    {user.Photo !== 'data:image/png;base64,null' ? ( <img src={user.Photo} style = {{borderRadius:'40px'}}alt=""/>) : (<img src={noPhoto} alt="Placeholder"/>)}
                    <p>{user.Login}</p>
                </div> 


            {isVisibleUserController && <div className="selectAccountController">
                <a href='/user'><p>Настроить</p></a>
                <button onClick={handleLogout}>Выйти</button>
            </div>}
            
        </div>
  	);
}

export default UserInterface;