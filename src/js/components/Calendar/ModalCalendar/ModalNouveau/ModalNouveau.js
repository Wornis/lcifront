import React from "react";
import { ToastContainer } from 'react-toastify';


class ModalNouveau extends React.Component {
  constructor(props) {
    super(props);
    this.dayEvents = [];
  }

  submitModal = (e) => {
    e.preventDefault();
    this.props.closeModal();
  };

  render() {
    return (
      <form style={{marginTop: 15}}>
        <div className="form-group form-input-bold">
          <label htmlFor="new-event-calendar">Emplacement:</label>
          <select
            id="select-event"
            className="form-control"
          >
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="select-new-event">Service :</label>
          <select
            className="form-control" id="select-new-event">
            <option value='midi'>Midi</option>
            <option value='soir'>Soir</option>
          </select>
        </div>
        <input type='submit' className="btn btn-primary" onClick={e => this.submitModal(e)}/>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover={false}/>
      </form>
    );
  }
}

export default ModalNouveau;
