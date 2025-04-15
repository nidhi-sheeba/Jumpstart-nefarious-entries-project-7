import {
  Button,
  Header,
  HeaderName,
  Content,
  TextInput,
  Form,
  Checkbox,
  Link,
  TooltipIcon,
} from "carbon-components-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "./LoginPage.module.scss";
import ibm from "../images/ibm.svg";
import { ArrowRight16, Information16 } from "@carbon/icons-react";

const LoginPageTest = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/landingpage");
  };

  return (
    <div className={styles.container}>
    <div className={styles.login}>
      <Header>
        <HeaderName>
          <a href="http://www.ibm.com/"></a>
          Login
        </HeaderName>
      </Header>
      <Content>
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-lg-4">
              <Form>
                <h2>Log in to IBM</h2>
                <br></br>
                <TextInput labelText="IBMid"></TextInput>
                <div className={styles.button}>
                  <Button
                    disabled={false}
                    renderIcon={ArrowRight16}
                    onClick={handleLogin}
                    className="bx--col"
                  >
                    Continue
                  </Button>
                </div>
                <div>
                <div className={styles.checkboxDiv}>
                    <Checkbox labelText={"Remember me "} className="remember-me"></Checkbox>
                    &nbsp;&nbsp;
                    <TooltipIcon
                      align="bottom"
                      className="remember-me"
                      iconDescription={"Help"}
                      renderIcon={Information16}
                      tooltipText='You can opt to have your IBMid remembered the next time you access our website by checking the "Remember Me" box. If you do not wish to have your IBMid remembered the next time you access our website, leave the "Remember Me" box unchecked.'
                    ></TooltipIcon>
                </div>
                </div>
                <br />
                <div>
                <p className={styles.forgot}>Don't have an account?</p>
                </div>
                <div className={styles.button}>
                  <Button
                    disabled={false}
                    renderIcon={ArrowRight16}
                    kind={"tertiary"}
                    className="bx--col"
                  >
                    Create an IBMid
                  </Button>
                </div>
                <hr className={styles.divider}></hr>
                <p className={styles.forgot}>
                  Forgot IBMid?{" "}
                  <Link href="https://www.ibm.com/account/profile/us?page=helpdesk">
                    Contact the IBMid help desk
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </Content>
    </div>
    </div>
  );
};

export default LoginPageTest;
