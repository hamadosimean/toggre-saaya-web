import React from "react";

function Contact() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>If you have any questions, feel free to reach out!</p>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
