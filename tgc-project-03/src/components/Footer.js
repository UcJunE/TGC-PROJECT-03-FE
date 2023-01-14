import React from "react";

export default function Footer() {
  return (
    <div className="container my-5">
      <footer>
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4">
              <h5 className="mb-3">footer content</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                atque ea quis molestias. Fugiat pariatur maxime quis culpa
                corporis vitae repudiandae aliquam voluptatem veniam, est atque
                cumque eum delectus sint!
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="mb-3">links</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-1">
                  <a href="#!">Frequently Asked Questions</a>
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
              <h5 className="mb-1">Contact with us</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Facebook</td>
                    <td>instagram</td>
                  </tr>
                  <tr>
                    <td>Twitter</td>
                    <td>Telegram</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="text-center p-3"
         
        >
          © 2023 Copyright:
          <a className="text-dark" href="">
           life is hard
          </a>
        </div>
      </footer>
    </div>
  );
}
