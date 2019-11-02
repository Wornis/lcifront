import React from "react";
import './ModalCalendar.css';
import Modal from 'react-modal';
import {format} from "date-fns";
import ModalNouveau from "./ModalNouveau/ModalNouveau";
import ModalSupprimer from "./ModalSupprimer/ModalSupprimer";
import ModalVisualiser from "./ModalVisualiser/ModalVisualiser";

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

export default class ModalCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {renderContent: 'nouveau'};
  }

  getRenderContent() {
    if (this.state.renderContent === 'nouveau')
      return <ModalNouveau
        selectedDate={this.props.selectedDate}
        closeModal={this.props.closeModal}
      />;
    else if (this.state.renderContent === 'supprimer')
      return <ModalSupprimer
        selectedDate={this.props.selectedDate}
        closeModal={this.props.closeModal}
      />;
    else return <ModalVisualiser/>;
  }

  getActive(strCategorie) {
    return this.state.renderContent === strCategorie ? 'active' : '';
  }

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
            {this.getRenderContent()}
          </div>

          <div className="navbar-calendar">
            <a onClick={() => this.setState({renderContent: 'nouveau'})}
              className={this.getActive('nouveau')}>
              Nouveau
            </a>
            <a onClick={() => this.setState({renderContent: 'supprimer'})}
              className={this.getActive('supprimer')}>
              Supprimer
            </a>
            <a onClick={() => this.setState({renderContent: 'visualiser'})}
              className={this.getActive('visualiser')}>
              Visualiser
            </a>
          </div>
        </Modal>
      </div>
    );
  }
}


Modal.setAppElement('#root');
