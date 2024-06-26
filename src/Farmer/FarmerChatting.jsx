import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserNurse } from "@fortawesome/free-solid-svg-icons";
import Chat from "../../public/chat.gif"
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const FarmerChatting = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const adminId = "663f7b7097bedf393364db8b"; // Hard-coded admin ID

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/chat/get-messages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages");
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/chat/post-messages",
        { content: newMessage, receiverId: adminId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
    }
  };

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-1 height-2 right-0 mb-4 mr-4">
      <img
        // src="/public/chat.gif"
        src={Chat}
        className="hidden md:block absolute right-8 bottom-5 h-32"
        alt="Chat GIF"
      />
      <button
        className="transform translate-y-1/2 h-12 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
        onClick={toggleChatbox}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        {t("f-chat")}
      </button>

      <div
        className={`${
          isChatboxOpen ? "" : "hidden"
        } fixed bottom-16 right-4 w-96`}
      >
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-green-500 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold"> {t("f-chat1")}</p>
            <button
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              onClick={toggleChatbox}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div id="chatbox" className="p-4 h-80 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender.role === "Farmer"
                    ? "flex justify-end self-end"
                    : "flex justify-start"
                }`}
              >
                <div className="flex items-center">
                  {msg.sender.role === "Farmer" ? (
                    <>
                      <p
                        className={`bg-green-100 text-black rounded-lg py-2 px-4 inline-block`}
                      >
                        {msg.content}
                      </p>
                      <FontAwesomeIcon
                        icon={faUser}
                        className="ml-2 text-green-500"
                      />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faUserNurse}
                        className="mr-2 text-gray-500"
                      />
                      <p
                        className={`bg-gray-100 text-black rounded-lg py-2 px-4 inline-block`}
                      >
                        {msg.content}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerChatting;
