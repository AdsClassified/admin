import React from 'react';
import '../Styles/Loader.css';

const Loader = () => {
  return (
    <div>
      <button className="btn btn-primary  ">
        <div id="wrapper">
          <div class="profile-main-loader">
            <div class="loader">
              <svg class="circular-loader" viewBox="25 25 50 50">
                <circle
                  class="loader-path"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke="#70c542"
                  stroke-width="6"
                />
              </svg>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Loader;
