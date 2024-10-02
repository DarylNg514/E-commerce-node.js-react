import React from "react";
import styles from "./Footer.module.scss";
import logo from "/images/logo.png";

const Footer = () => {
  return (
    <div
      className={`${styles.footer} d-flex flex-row justify-content-center align-items-center p-10`}
    >
      <img src={logo} width="3%" alt="Logo" />
      <p>
        Copyright &copy; 2024 - Francois Shopping(Our Purpose Is To Sustainably Make the Pleasure and Benefits of
        Sports Accessible to the Many.)
      </p>
    </div>
  );
};

export default Footer;
