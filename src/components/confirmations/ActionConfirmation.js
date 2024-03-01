import React from 'react';
import '../static/css/Modal.css';

const ActionConfirmation = () => {
    return (  
        <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">
            <h1>Are You Sure You Want to Continue?</h1>
          </div>
          <div className="body">
            <p>The next page looks amazing. Hope you want to go there!</p>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button>Continue</button>
          </div>
        </div>
      </div>
    );
}
 
export default ActionConfirmation;