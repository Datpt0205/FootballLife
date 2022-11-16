import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <button style= {{padding: '10px'}}>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList