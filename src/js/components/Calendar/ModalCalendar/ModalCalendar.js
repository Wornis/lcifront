import React from "react";
import './ModalCalendar.css';
import Modal from 'react-modal';
import {format} from "date-fns";
import ModalNouveau from "./ModalNouveau";
import ModalSupprimer from "./ModalSupprimer";
import ModalVisualiser from "./ModalVisualiser";
import {connect} from "react-redux";

const customStyles = {
  content: {
    height: '400px',
    width: '300px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

class ModalCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {renderContent: ModalNouveau};
  }

  getSelectedContent() {
    const Component = this.state.renderContent;
    return <Component
      selectedDate={this.props.selectedDate}
      closeModal={this.props.closeModal}
      emplacements={this.props.emplacements}
    />;
  }

  getActive = component => this.state.renderContent === component ? 'active' : '';

  render() {
    const dateFormat = "EEEE dd MMMM yyyy";
    const formattedDate = this.props.selectedDate
      ? format(this.props.selectedDate, dateFormat, this.props.dateLocale)
      : null;
    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          style={customStyles}
          contentLabel="Calendar Modal"
        >
          <div className='modal-container'>
            <p>{formattedDate}</p>
            {this.getSelectedContent()}
          </div>

          <div className="navbar-calendar">
            <a
              onClick={() => this.setState({renderContent: ModalNouveau})}
              className={this.getActive(ModalNouveau)}
            >
              Nouveau
            </a>
            <a
              onClick={() => this.setState({renderContent: ModalSupprimer})}
              className={this.getActive(ModalSupprimer)}
            >
              Supprimer
            </a>
            <a
              onClick={() => this.setState({renderContent: ModalVisualiser})}
              className={this.getActive(ModalVisualiser)}
            >
              Visualiser
            </a>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({...state.emplacement});

export default connect(mapStateToProps)(ModalCalendar);

Modal.setAppElement('#root');
