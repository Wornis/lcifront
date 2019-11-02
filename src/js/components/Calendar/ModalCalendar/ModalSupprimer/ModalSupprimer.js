import React from "react";

class ModalSupprimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedEventId: ''};
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
            <label htmlFor="dell-event">Supprimer un évènement :</label>
            <select className="form-control" id="dell-event" ></select>
            <div className="form-group form-input-bold">
              <label htmlFor='input_remove_event_service'>Service de l'évènement</label>
              <input
                className="form-control text-capitalize" type='text'
                id='input_remove_event_service' readOnly
                value={'test'}
              />
            </div>
          </div>
          <input type='submit' className="btn btn-primary" onClick={this.submitModal}/>
        </form>
      );
    }
}

export default (ModalSupprimer);
