import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import "./AppInteface.scss";
import { gsap } from "gsap";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TextareaAutosize from "react-textarea-autosize";
import Mascot from "../../assets/Logo/mascot.png";
import LogoText from "../../assets/Logo/TEXT.png";
import Loader from "../loader/Loader";
import axios from 'axios';


const AppInterface = () => {
  const [textValue, setTextValue] = useState("");
  const [direction, setDirection] = useState("ltr");
  const textareaRef = useRef(null);
  const [loading, setLoading] = useState(true); // Start loading immediately
  const [loaderOpacity, setLoaderOpacity] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [isDialogueDocked, setIsDialogueDocked] = useState(false);
  const [messages, setMessages] = useState([]);// Store chat history
  const suggestions = useRef();
  const dialoguebox = useRef();
  const text = useRef();
  const logo = useRef();

  const [shockGifUrl, setShockGifUrl] = useState("");// Store GIF URL
  useEffect(() => {
    setShockGifUrl("https://tenor.com/view/chouflihal-sbou3i-%D8%B4%D9%88%D9%81%D9%84%D9%8A%D8%AD%D9%84-%D8%A7%D9%84%D8%B3%D8%A8%D9%88%D8%B9%D9%8A-sab3oun-gif-19452175.gif");
  }, []);

  const apiEndpoint = "http://localhost:3000/api";

  const handleTextAreaClick = () => {
    if (!isDialogueDocked) {
      setIsDialogueDocked(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);// Send the clicked suggestion as a message
    if (!isDialogueDocked) {
      setIsDialogueDocked(true);
    }
  };

  useEffect(() => {
    // Set timeout for 1.5 seconds to hide the loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setLoaderOpacity((prevOpacity) => Math.max(0, prevOpacity - 0.05));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [loading, loaderOpacity]);

  const handleInputChange = (event) => {
    setTextValue(event.target.value);
    checkDirection(event.target.value);
  };

  useEffect(() => {
    gsap.set(dialoguebox.current, { bottom: "15%" });
    gsap.to(dialoguebox.current, {
      duration: 0.5,
      bottom: isDialogueDocked ? 0 : "15%",
      ease: "power3.out",
    });
    gsap.to(suggestions.current, {
      duration: 0.5,
      opacity: isDialogueDocked ? 0 : 1,
      display: isDialogueDocked ? "none" : "",
      ease: "power3.out",
    });
    gsap.to(logo.current, {
      duration: 0.5,
      opacity: isDialogueDocked ? 0 : 1,
      ease: "power3.out",
    });
    gsap.to(text.current, {
      duration: 0.5,
      top: isDialogueDocked ? "-7%" : "",
      scale: isDialogueDocked ? 0.3 : 0.6,
      left: isDialogueDocked ? "40%" : "",
      ease: "power3.out",
    });
  }, [isDialogueDocked]);

  const checkDirection = (text) => {
    setDirection(/[\u0600-\u06FF]/.test(text) ? "rtl" : "ltr");
  };// Function to send messages to your API
  const sendMessage = async (messageText) => {
    setMessages((prevMessages) => [...prevMessages, { role: "user", content: messageText }]);
    setTextValue("");
    setIsTyping(true);// Show typing animation
    try {
      const response = await axios.post(apiEndpoint, { content: messageText });
      const aiResponse = response.data.response;
      setMessages((prevMessages) => [...prevMessages, { role: "ai", content: aiResponse }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", content: "Sorry, there was an error processing your request." },
      ]);
    } finally {
      setIsTyping(false);// Hide typing animation after receiving response
    }
  };

  const handleSubmit = () => {
    if (textValue.trim() !== "") {
      sendMessage(textValue);
      console.log(textValue);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderOpacity((prevOpacity) => Math.min(1, prevOpacity + 0.05));
    }, 20);
    return () => clearTimeout(timer);
  }, [loaderOpacity]);

  const suggestion1 = "كيفاش نعمل بطاقة تعريف";
  const suggestion2 = "السلام عليكم";
  const suggestion3 = "احكيلي حكاية";
  const suggestion4 = "فسرلي الفرونسي بالفلاقي";

  return (
    <Box className="app-interface">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            opacity: loading ?  "1" : "0" ,
            display : loading ?  "" : "none" ,
            backgroundColor: "white",
            zIndex: 999,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <Loader />
        </Box>
      <div className="ContentBox">
        <div className="LogoContainer">
          <img ref={logo} className="mascot" src={Mascot} style={{ height: "350px" }} alt="Mascot" />
          <img ref={text} className="logo-text" src={LogoText} style={{ height: "250px" }} alt="LogoText" />
        </div>

        <div ref={suggestions} className={`Suggestions ${isDialogueDocked ? "disabled" : ""}`}>
          <div className="SuggestionCard lato-regular" onClick={() => handleSuggestionClick(suggestion1)}>
            <h2>{suggestion1}</h2>
          </div>
          <div className="SuggestionCard lato-regular" onClick={() => handleSuggestionClick(suggestion2)}>
            <h2>{suggestion2}</h2>
          </div>
          <div className="SuggestionCard lato-regular" onClick={() => handleSuggestionClick(suggestion3)}>
            <h2>{suggestion3}</h2>
          </div>
          <div className="SuggestionCard lato-regular" onClick={() => handleSuggestionClick(suggestion4)}>
            <h2>{suggestion4}</h2>
          </div>
        </div>

        <div ref={dialoguebox} className={`dialogue-container ${textValue ? "selected" : ""}`}>
          <IconButton style={{ boxSizing: "border-box", height: "50px", width: "50px", borderRadius: "25px" }}>
            <AttachFileIcon />
          </IconButton>
          <div className="input-container" style={{ height: textareaRef.current?.clientHeight + "px" }}>
            <TextareaAutosize
              ref={textareaRef}
              style={{ direction }}
              onChange={handleInputChange}
              placeholder=""
              className="text-area"
              onClick={handleTextAreaClick}
              value={textValue}// Bind textValue to textarea
            />
          </div>
          <IconButton
            sx={{
              boxSizing: "border-box",
              height: "50px",
              width: "50px",
              borderRadius: "25px",
            }}
            onClick={handleSubmit}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </div>

        <div className={`message-list ${isDialogueDocked ? "" : "disabled"} `}>
          <Box  >

          </Box>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.role === 'ai' && isTyping && (
                <div className="typing-indicator">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              )}
              {message.role === 'user' && (
                <div className="user-message-bubble">
                  <div className="user-message">
                    <h2>{message.content}</h2>
                  </div>
                </div>
              )}
              {message.role === 'ai' && !isTyping && (
                <div className="ai-message-bubble">
                  <div className="ai-profile-icon">
                    <img src={Mascot} width={"65px"} height={"auto"} alt="AI Profile" />
                  </div>
                  {message.content === 'Censored.' ? ( <img src={shockGifUrl} width={"150px"} style={{borderRadius :"15px"}} alt="Censored" />) : (<div className="ai-message"><h2>{message.content}</h2></div>)}




                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default AppInterface;