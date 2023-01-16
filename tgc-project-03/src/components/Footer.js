import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaTelegram,
} from "react-icons/fa";

export default function Footer() {
  const navigateTo = useNavigate();

  const aboutUs = () => {
    navigateTo("/about-us");
  };

  return (
    <div className="container my-5">
      <footer>
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <h5 className="mb-3 footer-title" onClick={aboutUs}>
                About Amare L'amore
              </h5>
              <p className="footer-text">
                As a premium Manufacturer of Fashion Jewelry, specializing in
                custom made Jewelry & Accessories for 30 years. <br></br> We are
                confident to provide professional service to our valued
                customers in our fashion jewelry and accessories business.
              </p>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <h5 className="mb-3 footer-title">Useful links</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-1">
                  <a href="https://www.getmulberry.com/articles/how-to-care-for-your-jewelry">
                    How to take care your Jewelry
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#!">Delivery</a>
                </li>
                <li className="mb-1">
                  <a href="#!">Pricing</a>
                </li>
                <li>
                  <a href="#!">Where we deliver?</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="mb-1 footer-title">Contact with us</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      <FaFacebookSquare className="ficon" />
                      <span className="mx-1">Facebook</span>
                    </td>
                    <td>
                      <FaInstagram className="ficon" />
                      <span className="mx-1">instagram</span>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FaTwitter className="ficon" />
                      <span className="mx-1">Twitter</span>
                    </td>
                    <td>
                      <FaTelegram className="ficon" />
                      <span className="mx-1">Telegram</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="text-center nav-text p-3">
          © 2023 Copyright: Amare L'amore
        </div>
      </footer>
    </div>
  );
}
