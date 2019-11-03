import React from 'react';
import {toast} from "react-toastify";
import {connect} from "react-redux";

class ToastHandler extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.error)
      return toast.error(nextProps.error);
    if (nextProps.success)
      return toast.success(nextProps.success);
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => ({...state.toast});
export default connect(mapStateToProps)(ToastHandler);
