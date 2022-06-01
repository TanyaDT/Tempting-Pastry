import React, { useState } from "react";
import { sendMail } from "./Email";
import "./style.css";
const Mail = () => {
  const [values, setValues] = useState({
    userName: "",
    userEmail: "",
    message: "",
    status: false,
  });
  const { userName, userEmail, message, status } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("values name", userName);
    console.log("values email", userEmail);
    console.log("values message", message);
    sendMail({ userName, userEmail, message })
      .then((data) => {
        if (data.err) {
          console.log("err", data.err);
        } else {
          console.log("Success", data);
          setValues({ ...values, status: true });
        }
      })
      .catch(console.log("Error in send mail"));
  };
  return (
    <>
      <div className="container">
        <h3>Get in touch</h3>
        <form onSubmit={handleSubmit}>
          <label>Your Name: </label>
          <input className="contact-input"
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={handleChange("userName")}
          />
          <br />
          <br />
          <label>Your Email: </label>
          <input className="contact-input"
            type="text"
            placeholder="enter your email"
            value={userEmail}
            onChange={handleChange("userEmail")}
          />
          <br />
          <br />
          <label>Your message: </label>
          <textarea className="contact-input"
            id="message"
            rows="4"
            placeholder="How can we help you?"
            value={message}
            onChange={handleChange("message")}
          />
          <br />
          <br />
          <button type="Submit"> Send your message</button>
        </form>
        {status ? (
          <div>
            {" "}
            <h1>Message sent successfully</h1>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Mail;