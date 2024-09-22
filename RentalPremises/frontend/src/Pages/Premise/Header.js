import '../../styles/Premise.css';
import logo from '../../img/logo.svg';
import UserInterface from '../MainPage/UserInterface';

function Header() {
	return (
	    <div className="mainLogo">
            <img src={logo} alt="logo" />
            <UserInterface/>
        </div>
  	);
}

export default Header;