import "./contact.css";

const Contact = () => {
  return (
    <div className="contactUs">
      <div className="titleContact">
        <h2>Get In Touch</h2>
      </div>
      <div className="box">
        <div className="contact form">
          <h3>Send a message</h3>
          <form>
            <div className="formBox">
              <div className="row50">
                <div className="inputBox">
                  <span>First Name</span>
                  <input type="text" placeholder="Phung"></input>
                </div>
                <div className="inputBox">
                  <span>Last Name</span>
                  <input type="text" placeholder="Dat"></input>
                </div>
              </div>
              <div className="row50">
                <div className="inputBox">
                  <span>Email</span>
                  <input
                    type="text"
                    placeholder="phungdat020501@gmail.com"
                  ></input>
                </div>
                <div className="inputBox">
                  <span>Mobile</span>
                  <input type="text" placeholder="+84 985 637 276"></input>
                </div>
              </div>
              <div className="row100">
                <div className="inputBox">
                  <span>Message</span>
                  <textarea placeholder="Write your message here..."></textarea>
                </div>
              </div>
              <div className="row100">
                <div className="inputBox">
                  <input type="submit" value="Send" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="contact info">
          <h3>Contact Info</h3>
          <div className="infoBox">
            <div>
              <span>
                <ion-icon name="location-outline"></ion-icon>
              </span>
              <p>D36 An Thuong 34, Da Nang, Viet Nam</p>
            </div>
            <div>
              <span>
                <ion-icon name="mail-outline"></ion-icon>
              </span>
              <a href="mailto:phungdat020501@gmail.com">
                phungdat020501@gmail.com{" "}
              </a>
            </div>
            <div>
              <span>
                <ion-icon name="call-outline"></ion-icon>
              </span>
              <a href="tel: +84 985 637 276">+84 985 637 276</a>
            </div>
            <ul className="sci">
              <li>
                <a href="#">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="contact map">
          <iframe width="400" height="209" id="gmap_canvas" src="https://maps.google.com/maps?q=My%20An,%20Da%20Nang&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>
      </div>
    </div>
  );
};
export default Contact;
