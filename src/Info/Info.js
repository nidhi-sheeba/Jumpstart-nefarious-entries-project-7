import React from "react";
import styles from "./Info.module.scss";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuItem,
  HeaderNavigation,
  Link
} from "carbon-components-react";
import { User16 } from "@carbon/icons-react";
import { useNavigate } from "react-router-dom";
import { Trusted } from "@carbon/pictograms-react";

const Info = () => {
  const navigate = useNavigate();

  const handleUser = () => {
    navigate("/");
  };

  return (
    <div className={styles.demo}>
      <Header>
        <HeaderName className={styles.headerName}>
          <a href="http://www.ibm.com/" className={styles.a}>
            {/* <img src={ibm} className={styles.logo} alt="ibm logo" /> */}
          </a>
        </HeaderName>
        <HeaderNavigation className={styles.nav}>
          <HeaderMenuItem href="https://bam.res.ibm.com/">
            Resources
          </HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="User">
            <User16 onClick={handleUser} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
      <div className={styles.leftCenter}>
        <div className={styles.heading}>
          <div>
            <Trusted
              style={{ width: "40px", height: "40px" }}
            />
          </div>
          <div className={styles.validQAText}>ValidQA</div>
        </div>
        <br></br>
        <h4 className={styles.second}>
        Your Trusted Source for Answer Validation
        </h4>
        <p className={styles.third}>

        <div className={styles.container}>
          <div>
          <strong>Flan-UL2</strong>
          <br></br>
          <strong>model_id:</strong> google/flan-ul2
          <br></br>
          <strong>Repository:</strong> <Link href="https://huggingface.co/google/flan-ul2"> google/flan-ul2</Link>
          <br></br>
          Flan-UL2 is an encoder decoder model based on the T5 architecture. It was fine tuned using the "Flan" prompt tuning and dataset collection.
          The original UL2 model was only trained with receptive field of 512, which made it non-ideal for N-shot prompting where N is large
          The Flan-UL2 checkpoint uses a receptive field of 2048 which makes it more usable for few-shot in-context learning.
          </div>
          <div>
          <strong>MT0 (13B)</strong>
          <br></br>
          <strong>model_id:</strong> mt0-xxl-13b
          <br></br>
          <strong>Repository:</strong> <Link href="https://huggingface.co/bigscience/mt0-xxl"> mt0-xxl-13b</Link>
          <br></br>
          MT0 is a family of models capable of following human instructions in dozens of languages zero-shot.
           It is finetuned BLOOM & mT5 pretrained multilingual language models on our crosslingual task mixture (xP3) and the resulting models are capable of crosslingual generalization to unseen tasks & languages.
          </div>
          <div>
          <strong>Granite Chat V1 (13B)</strong>
          <br></br>
          <strong>model_id:</strong> google/ul2
          <br></br>
          Granite Chat V1 is a 13B-parameter decoder models that can efficiently predict and generate language in English.
          They, like all models in the Granite family, are designed for business. Granite models are pretrained on multiple terabytes of data from both general-language sources, s
          uch as the public internet, and industry-specific data sources from the academic, scientific, legal, and financial fields.
          </div>
          <div>
          <strong>Llama 2 (13B)</strong>
          <br></br>
          <strong>model_id:</strong> llama-2-13b-chat
          <br></br>
          <strong>Repository:</strong> <Link href="https://huggingface.co/meta-llama/Llama-2-13b-chat-hf">llama-2-13b-chat</Link>
          <br></br>
          Llama 2 is a collection of pretrained and fine-tuned generative text models ranging in scale from 7 billion to 70 billion parameters.
          It is a 13B fine-tuned model, optimized for dialogue use cases and converted for the Hugging Face Transformers format.
          Llama 2 is an auto-regressive language model that uses an optimized transformer architecture. The tuned versions use supervised fine-tuning (SFT) and reinforcement learning with human feedback (RLHF)
          to align to human preferences for helpfulness and safety.
          </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Info;
