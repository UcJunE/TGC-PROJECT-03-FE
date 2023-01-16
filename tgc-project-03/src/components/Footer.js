import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaTelegram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="container my-5">
      <footer>
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <h5 className="mb-3 footer-title">About Us</h5>
              <p className="footer-text">
                Looking for everyday jewelry? <br></br>Pick our classic
                collection, mix & match to find your look. <br></br>Warning:
                Ready to receive more compliments? <br></br> Our pieces are
                waiting to be yours. <br></br>How do you like them? <br></br>
                Make it your signature. <br></br>Your new go-to jewelry.
                <br></br> Always ready for you.
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
