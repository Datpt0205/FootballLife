import whiteLogo from '../images/white_soccer_logo.png'
import colorLogo from '../images/color-soccer-logo.png'
import './Nav.css'

const Nav = ({authToken, minimal, setShowModal, showModal, setIsSignUp}) => {

    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(false)
    }

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" alt ="logo" src = {minimal ? colorLogo : whiteLogo} />
            </div>

            {!authToken && !minimal && (
            <button 
            className="nav-button"
            onClick = {handleClick}
            disabled = {showModal}
            >
                Log in
            </button>)}
        </nav>
    )
}
export default Nav