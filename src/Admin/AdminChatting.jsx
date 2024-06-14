import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faUserNurse, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const AdminChatting = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [uniqueSenders, setUniqueSenders] = useState([]);
  const [selectedSender, setSelectedSender] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    fetchMessages();

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/chat/admin-get-all-messages",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const sortedMessages = response.data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setMessages(sortedMessages);

      const uniqueSenders = [
        ...new Set(
          sortedMessages
            .map((message) => message.sender._id)
            .filter((senderId) => {
              const sender = sortedMessages.find(
                (message) => message.sender._id === senderId
              )?.sender;
              return sender && sender.role !== "admin";
            })
        ),
      ];

      setUniqueSenders(uniqueSenders);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSenderClick = (senderId) => {
    setSelectedSender(senderId);
  };

  const handleReply = async () => {
    try {
      await axios.post(
        `https://sanjaikannan-g-mernovation-backend-21-05.onrender.com/chat/admin-post-reply/${selectedSender}`,
        {
          content: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchMessages();
      setNewMessage("");
    } catch (error) {
      console.error("Error replying to message:", error);
    }
  };

  const selectedSenderMessages = messages.filter(
    (message) =>
      message.sender._id === selectedSender ||
      message.receiver._id === selectedSender
  );

  const handleBackToSenders = () => {
    setSelectedSender(null);
  };

  const getLatestMessage = (senderId) => {
    const latestMessage = messages.find(
      (message) =>
        message.sender._id === senderId || message.receiver._id === senderId
    );
    return latestMessage;
  };

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-4xl font-semibold mb-5">{t("a-message")} </h1>
      </div>
      <div className="flex justify-center p-2">
        <div className="flex h-full w-full md:w-11/12 lg:w-9/12 border-2 rounded-lg shadow-lg p-4 bg-white">
          {(isSmallScreen ? !selectedSender : true) && (
            <div className="w-full md:w-1/3 border-r-2 p-4">
              <h2 className="text-lg font-semibold mb-4">{t("a-sender")}</h2>
              <ul>
                {uniqueSenders
                  .sort(
                    (a, b) =>
                      new Date(getLatestMessage(b).timestamp) -
                      new Date(getLatestMessage(a).timestamp)
                  )
                  .map((senderId) => {
                    const sender = messages.find(
                      (message) => message.sender._id === senderId
                    )?.sender;
                    const latestMessage = getLatestMessage(senderId);

                    return (
                      <li
                        key={senderId}
                        className="cursor-pointer mb-4 p-4 rounded-md hover:bg-green-50 flex flex-col items-start border-b"
                        onClick={() => handleSenderClick(senderId)}
                      >
                        <div className="flex items-center w-full">
                          <FontAwesomeIcon
                            icon={faUser}
                            size="2x"
                            className="mr-4"
                          />
                          <div className="flex-1">
                            {sender &&
                            sender.name === "Sanjai Kannan G" &&
                            sender.role === "Buyer" ? (
                              <div className="flex items-center">
                                <p className="font-semibold">{sender.name}</p>
                              </div>
                            ) : (
                              <p className="font-semibold">
                                {sender && sender.name}
                              </p>
                            )}
                            <p className="text-sm text-gray-500">
                              {sender && sender.role}
                            </p>
                          </div>
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="ml-auto text-gray-400"
                          />
                        </div>
                        {latestMessage && (
                          <div className="text-sm text-gray-600 mt-2"></div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
          {(isSmallScreen ? selectedSender : true) && (
            <div className="w-full md:w-2/3 p-4 bg-gray-50 flex flex-col">
              {isSmallScreen && selectedSender && (
                <button
                  onClick={handleBackToSenders}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                  Back
                </button>
              )}
              {selectedSender && (
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold mb-4">
                    {
                      messages.find(
                        (message) => message.sender._id === selectedSender
                      )?.sender.name
                    }{" "}
                    (
                    {
                      messages.find(
                        (message) => message.sender._id === selectedSender
                      )?.sender.role
                    }
                    )
                  </h3>
                  <div className="flex-1 overflow-y-auto mb-4">
                    {selectedSenderMessages
                      .slice()
                      .reverse()
                      .map((message) => (
                        <div
                          key={message._id}
                          className={`mb-4 flex ${
                            message.sender._id === selectedSender
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >
                          {message.sender._id === selectedSender && (
                            <FontAwesomeIcon
                              icon={faCircleUser}
                              size="2x"
                              className="mr-2 self-center text-green-800"
                            />
                          )}
                          <div
                            className={`p-4 text-semibold text-lg rounded-2xl max-w-xs flex items-center ${
                              message.sender._id === selectedSender
                                ? "bg-green-100"
                                : "bg-white"
                            } shadow-md`}
                          >
                            <p>{message.content}</p>
                          </div>
                          {message.sender.role === "admin" && (
                            <FontAwesomeIcon
                              icon={faUserNurse}
                              size="2x"
                              className="ml-2 self-center"
                            />
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full p-2 focus:outline-none"
                        rows={3}
                      />
                      <button
                        onClick={handleReply}
                        className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminChatting;
