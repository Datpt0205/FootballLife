import { useCookies } from 'react-cookie'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './ChatHeader.css'

const ChatHeader = ({user}) => {

    const [ cookies, setCookie, removeCookie ] = useCookies(['user'])

    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.href = '/'
    }

    return (
    <div className="chat-container-header">
       <div className="profile">
        <div className="img-container">
            <img src={user.url} alt= {"photo of" + user.first_name} />
        </div>
        <h3>{user.first_name}</h3>
       </div>
       <i className="fa-solid fa-ticket" onClick={''}></i>
       <i className="fa-solid fa-map-location-dot" onClick={''}></i>
       <i className="log-out-icon" onClick={logout}>⇦</i>
       
    </div>
    )
}
export default ChatHeader