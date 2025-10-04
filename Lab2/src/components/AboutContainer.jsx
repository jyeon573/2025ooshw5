import React from "react";
import styles from "./AboutContainer.module.css";
import { FaGithub } from "react-icons/fa";

const AboutContainer = () => {
  return (
    <div className={styles.cardContainer}>
      <h4>Dayeon Jung</h4>
      <p>Student · Handong Global University (CS/EE)</p>
      <p className="fs-6 w-75 text-center">
        This page was originally created by <strong>Umut Can Gün</strong> and later
        adapted by <strong>Dayeon Jung (22400661)</strong> for the course{" "}
        <em>Open Source Studio & Web Service Development</em> at Handong Global University.
      </p>


      <a
        href="https://2025ooshw.netlify.app/"
        target="blank"
        className="text-dark fs-3"
      >
        <FaGithub />
      </a>
    </div>
  );
};

export default AboutContainer;
