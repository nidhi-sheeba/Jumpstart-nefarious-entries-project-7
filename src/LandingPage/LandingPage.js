import React from "react";
import styles from "./LandingPage.module.scss";
import { Button, Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction,HeaderMenuItem, HeaderNavigation } from "carbon-components-react";
import { useNavigate } from "react-router-dom";
import { Trusted } from "@carbon/pictograms-react";
import {ArrowRight16,User16,ContentView16 } from "@carbon/icons-react"

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLanding = () => {
    navigate("/main");
  }

  const handleUser = () => {
      navigate("/");
    };
    const handleInfo = () =>{
      navigate("/info")
    }
  return (
    <body className={styles.body}>
      <Header>
        <HeaderName className={styles.headerName}>
          <a href="http://www.ibm.com/" className={styles.a}>
            {/* <img src={ibm} className={styles.logo} alt="ibm logo" /> */}
          </a>
        </HeaderName>
        <HeaderNavigation className={styles.nav}>
        <HeaderMenuItem href="https://bam.res.ibm.com/">Resources</HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar  className={styles.headerIcon}>
             <HeaderGlobalAction aria-label="info">
             <ContentView16 onClick={handleInfo}/>
             </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="User" >
            <User16 onClick={handleUser}/>
            </HeaderGlobalAction>
          </HeaderGlobalBar>
      </Header>
      <div className={styles.leftCenter}>
        <div className={styles.logoContainer}>
          <div>
            <Trusted
              style={{ width: "40px", height: "40px" , paddingTop: "10px"}}
            />
          </div>
          <div className={styles.qaText}>
            ValidQA
          </div>
          <br></br>
        <br></br>
          </div>
        <h4 className={styles.second}>
        Your Trusted Source for Answer Validation
        </h4>
        <br></br>
        <br></br>
        <br></br>
        <p className={styles.third}>
        At validQA, we've harnessed the remarkable capabilities of the IBM bam research models to empower you with an unprecedented tool for evaluating the accuracy and relevance of answers to your questions.
        Our mission is simple: to provide you with the means to verify the validity of responses, making sure you always get the right information.
        At validQA, we believe in the power of informed decision-making and the importance of ensuring the information you rely on is accurate. Let us be your trusted partner in your quest for knowledge, where every answer is put to the test for its validity
        Validating information has never been easier. With our IBM bam research powered platform, you can submit both your question and the corresponding answer, and we'll quickly analyze and assess whether the answer aligns with your query.
        Our cutting-edge technology delves into the intricacies of language and context, ensuring that you receive credible and reliable answers.
        </p>
        <br></br>
        <br></br>
        <h4 className={styles.second}>
        What We Do
        </h4>
        <br></br>
        <br></br>
        <p className={styles.third}>
        <strong>Accuracy Assurance:</strong> We are committed to upholding the highest standards of accuracy, helping you distinguish fact from fiction.
<br></br>
<br></br>
<strong>Efficiency:</strong> Say goodbye to time-consuming fact-checking. With validQA, you can swiftly verify information, saving you precious time.
<br></br>
<br></br>
<strong>User-Friendly Interface:</strong> Our platform is designed with user experience in mind. It's intuitive and easy to use, making the validation process straightforward.
        </p>
        <div className={styles.buttons}>
        <Button className={styles.tryButton} onClick={handleLanding} renderIcon={ArrowRight16}>
        Try it out
      </Button>
      </div>
      </div>
    </body>
  );
};

export default LandingPage;
