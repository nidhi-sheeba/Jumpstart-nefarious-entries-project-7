import React, { useState, useEffect } from "react";
import styles from "./MainPage.module.scss";
import { useNavigate } from "react-router-dom";
import {
  Header,
  HeaderName,
  Dropdown,
  Button,
  TextArea,
  InlineNotification,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuItem,
  HeaderNavigation,
  Link
} from "carbon-components-react";
import { ArrowRight16, ContentView16} from "@carbon/icons-react";

const MainPage = () => {

  const navigate = useNavigate();

  const [selectedModel, setSelectedModel] = useState("Flan T5 XL");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState("");
  const [clearNotification, setClearNotification] = useState();
  const [type, setType] = useState("info")
  const [model, setModelId] = useState("bigcode/starcoder")
  const [showInfo, setShowInfo] = useState(false);

  const handleInfo = () =>{
    navigate("/info")
  }

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    setClearNotification(true)
  },[])

  useEffect(() => {
    // This effect will run whenever the 'selectedModel' changes
    if (selectedModel === "Granite Chat V1 (13B)") {
      setModelId("ibm/granite-13b-chat-v1");
    } else if (selectedModel === "MT0 (13B)") {
      setModelId("bigscience/mt0-xxl");
    } else if (selectedModel === "Flan T5 XL") {
      setModelId("flan-t5-xl-mpt-9G3rEvLG-2023-11-20-19-32-08");
    }else if (selectedModel === "Llama 2 (13B)") {
      setModelId("meta-llama/llama-2-13b-chat");
    } else if (selectedModel === "Flan-UL2") {
      setModelId("google/flan-ul2");
    } else {
      setModelId("flan-t5-xl-mpt-9G3rEvLG-2023-11-20-19-32-08");
    }
  }, [selectedModel]);

  const handleExtraction = async (event) => {
    setOutput('');
    setClearNotification(true)
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/validateData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input ,model}),
        }
      );

      const data = await response.json();
      console.log(data)
      const output_new = data.output;

      setOutput(output_new);
      setShowInfo(true)
      setIsLoading(false);
      setIsButtonClicked(true);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }

  const itemsThree =[
    {
      id: "Flan-UL2",
      label: "Flan-UL2",
    },
    {
      id: "Granite Chat V1 (13B)",
      label: "Granite Chat V1 (13B)",
    },
    {
      id: "MT0 (13B)",
      label: "MT0 (13B)",
    },
    {
      id: "Llama 2 (13B)",
      label: "Llama 2 (13B)",
    },
    {
      id : "Flan T5 XL",
      label : "Flan T5 XL"
    }
  ]

  const handleModelChange = (event) => {
    setShowInfo(false)
    setSelectedModel(event.selectedItem.label);
  };

  const handleClose = ()=>{
    setClearNotification(true)
  }

  return (
    <div>
      <Header>
        <HeaderName className={styles.headerName}>
          <a href="http://www.ibm.com/" className={styles.a}></a>
          ValidQA
        </HeaderName>
        <HeaderNavigation className={styles.nav}>
        <HeaderMenuItem href="https://bam.res.ibm.com/">Resources</HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
             <HeaderGlobalAction aria-label="info">
             <ContentView16 onClick={handleInfo}/>
             </HeaderGlobalAction>
          </HeaderGlobalBar>
      </Header>
      <div className={styles.side}>
        <h1 className={styles.headerside}>Model Selection</h1>
        <p className={styles.leftp}>
          Please select the model for the validation of your question-answer pairs, and provide
          your question answer pair in the text box on the right{" "}
          <ArrowRight16 className={styles.arrow}></ArrowRight16>
        </p>
        <div className={styles.inputGroup}>
          <span>
            <strong>Model Selection:</strong>
          </span>
          <div style={{ width: "300px", height: "100px" }}>
            <br></br>
            <Dropdown
              ariaLabel="Dropdown"
              id="carbon-dropdown-example"
              items={itemsThree}
              label="Select your model"
              onChange={handleModelChange}
              initialSelectedItem={itemsThree[0]}
            />
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.headerCopy}>
          <h1 className={styles.header}>Enter a question and corresponding answer that you want to validate</h1>
        </div>
        <div>
          <TextArea rows={20} onChange={handleInputChange} className={styles.textarea}></TextArea>
        </div>
        <br></br>
        <div className={styles.extract}>
        <Button  onClick={handleExtraction} className={styles.extract}>
          Validate The Question Answer pair
        </Button>
        </div>
        <br></br>
        <div className={styles.textIn}>
        {isButtonClicked && selectedModel && showInfo &&(
          <p>
          IBM bam research is using {selectedModel} model to execute your conversion process. Click on <Link onClick={handleInfo}>Info</Link> to learn more.
          </p>
      )}
      {isButtonClicked && selectedModel && showInfo && output === 'no' && (
          <p className={styles.div}>
          The model - {selectedModel.toUpperCase()} has reverted with <strong className={styles.error}>{output.toUpperCase()}</strong> - <strong>The question answer pair that you have provided is invalid</strong>
          </p>
      )}
      {isButtonClicked && selectedModel && showInfo && output === 'yes'&& (
          <p className={styles.div}>
          The model - {selectedModel.toUpperCase()} has reverted with <strong className={styles.info}>{output.toUpperCase()}</strong> - <strong>The question answer pair that you have provided is valid and you are free to post</strong>
          </p>
      )}
      {isButtonClicked && selectedModel && showInfo && output === 'The input you provided contains non-Latin characters' && (
          <p className={styles.div}>
          You cannot post the answer as it contains invalid character(s)
          </p>
      )}

  {!clearNotification && (
    <div className={styles.validateo}>
      <InlineNotification kind={type} title={validate} onCloseButtonClick={handleClose}></InlineNotification>
    </div>
  )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
