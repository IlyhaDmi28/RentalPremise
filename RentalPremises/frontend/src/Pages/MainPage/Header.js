import '../../styles/Main.css';
import logo from '../../img/logo.svg';
import UserInterface from './UserInterface';

function Header() {
	return (
	    <div className="mainLogo">
            <img src={logo} alt="logo" />
            <UserInterface/>
        </div>
  	);
}

export default Header;