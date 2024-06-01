import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

import cha3rat from "../../assets/IconElements/cha3rat.svg";
import chachia_back from "../../assets/IconElements/chachia_back.svg";
import chachia_front from "../../assets/IconElements/chachia_front.svg";
import chleghem from "../../assets/IconElements/chleghem.svg";
import headShadow from "../../assets/IconElements/headShadow.svg";
import head from "../../assets/IconElements/head.svg";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader_main" >
      <div className="loader-container" >
        <div className="loader-wrapper">
          <div className="loader">
            <div className="loader__container">
              <div className="Chachia">
                <img src={cha3rat} alt="Cha3rat" className="Chachia__cha3rat" />
                <img
                  src={chachia_front}
                  alt="Chachia Front"
                  className="Chachia__chachia-front"
                />
                <img
                  src={headShadow}
                  alt="Head Shadow"
                  className="Chachia__head-shadow"
                />
              </div>
              <div className="Head">
                <img src={chleghem} alt="Chleghem" className="Head__chleghem" />
                <img src={head} alt="Head" className="Head__head" />
              </div>
            </div>
            <img
              src={chachia_back}
              alt="Chachia Back"
              className="Chachia__chachia-back"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
