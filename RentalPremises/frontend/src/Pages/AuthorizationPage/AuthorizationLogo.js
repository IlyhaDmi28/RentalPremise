import logo from '../../img/logo.svg';
import '../../styles/Authorization.css';

function AuthorizationLogo() {
    return (
        <div className="authorizationLogo">
            <img src={logo} alt="logo" />
            <p>Rental Premises</p>
        </div>
    );
}

export default AuthorizationLogo;
