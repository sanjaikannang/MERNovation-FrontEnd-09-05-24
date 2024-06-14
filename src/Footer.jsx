import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Footer = () => {
  const { t } = useTranslation();
  const Navigate = useNavigate();

    const handleLogin = () => {
      Navigate("/login");
    };
  

  return (
    <>
      {" "}
      {/* Footer Section  */}
      <footer className="w-full bg-zinc-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-20">
            <div className="py-8 text-center">
              <h3 className="font-manrope text-4xl text-green-600 font-bold mb-4">
              {t("footer-heading")}
              </h3>
              <p className="text-gray-500">
              {t("footer-desc")} 
              </p>
            </div>
            <div className="flex justify-center items-center gap-3">
              <a
                onClick={() => Navigate("/login")}
                className="text-lg bg-green-500 rounded-full shadow-md py-2 px-6 flex items-center gap-2 transition-all duration-500 text-white hover:bg-green-600"
              >
                {t("footer-get-started")} 
              </a>
            </div>
          </div>
          <div className="py-7 border-t border-gray-200">
            <div className="flex items-center justify-center flex-col gap-7 lg:justify-between lg:flex-row">
              <span className="text-sm text-gray-500">
              {t("footer-at-2024")} 
              </span>
              <ul className="flex items-center text-sm text-gray-500 gap-9">
                <li>
                  <a
                     onClick={() => Navigate("/terms-conditions")}> {t("footer-t&c")}</a>
                </li>
                <li>
                  <a  onClick={() => Navigate("/privacy-policy")}>{t("footer-pp")} </a>
                </li>
                <li>
                  <a  onClick={() => Navigate("/contact-us")}>{t("footer-cu")}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
