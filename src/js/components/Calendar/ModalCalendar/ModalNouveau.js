import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addNewEvent} from "Actions/calendar";

class ModalNouveau extends React.Component {
  constructor(props) {
    super(props);
    this.state = {service: 'midi'};
  }

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
            onChange={(e) => this.setState({place: e.target.value})}
            value={this.state.place}
          >
            {this.getEmplacements()}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="select-new-event">Service :</label>
          <select
            className="form-control" id="select-new-event"
            onChange={(e) => this.setState({service: e.target.value})}
            value={this.state.service}
          >
            <option value='midi'>Midi</option>
            <option value='soir'>Soir</option>
          </select>
        </div>
        <input type='submit' className="btn btn-primary" onClick={this.submitModal}/>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({addNewEvent}, dispatch);

export default connect(null, mapDispatchToProps)(ModalNouveau);

