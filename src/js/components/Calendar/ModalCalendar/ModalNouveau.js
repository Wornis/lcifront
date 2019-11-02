import React from "react";
import {connect} from 'react-redux';

class ModalNouveau extends React.Component {
  submitModal = (e) => {
    e.preventDefault();
    this.props.closeModal();
  };

  getEmplacements = () =>
    this.props.emplacements.map(({id, libelle}) => <option key={id} value={id}>{libelle}</option>);

  render() {
    return (
      <form style={{marginTop: 15}}>
        <div className="form-group form-input-bold">
          <label htmlFor="new-event-calendar">Emplacement:</label>
          <select
            id="select-event"
            className="form-control"
          >
            {this.getEmplacements()}
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
      </form>
    );
  }
}

const mapStateToProps = state => ({...state.emplacement});

export default connect(mapStateToProps)(ModalNouveau);

