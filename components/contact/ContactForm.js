import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "./ContactForm.module.css";
import Notification from "../ui/notification";

const sendContactData = async (contactDetails) => {
  const result = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: { "Content-Type": "application/json" },
  });

  const data = await result.json();
  if (!result.ok) {
    throw new Error(data.message || "something when wrong");
  }
};

function ContactForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reqStatus, setReqStatus] = useState();
  const [reqError, setReqError] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setReqStatus("pending");
    try {
      await sendContactData({ name, email, message });
      setReqStatus("success");
      setEmail("");
      setMessage("");
      setName("");
    } catch (error) {
      setReqStatus("error ");
      setReqError(error);
    }
  };

  let notification;

  if (reqStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending Message...",
      message: "Message on its way",
    };
  }

  if (reqStatus === "success") {
    notification = {
      status: "success",
      title: "Success",
      message: "Message sent successfully",
    };
  }

  if (reqStatus === "error") {
    notification = {
      status: "error",
      title: "Something when wrong",
      message: reqError,
    };
  }

  useEffect(() => {
    if (reqStatus === "success" || reqStatus === "error") {
      const timer = setTimeout(() => {
        setReqStatus(null);
        setReqError(null);
        if (reqStatus === "success") router.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [reqStatus]);

  return (
    <section className={classes.contact}>
      <h1>How can I help you</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
