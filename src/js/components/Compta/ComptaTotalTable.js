import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '425px',
    marginTop: theme.spacing.unit * 3,
    margin: 'auto'
  }
});
const style = {
  cell: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '3px',
  }
};

const rowCells = ({libelle, esp, tr, cb, total, nbServices}) => (
  <>
    <TableCell
      component="th"
      scope="row"
      style={{...style.cell, textAlign: 'center'}}
    >
      {libelle ? libelle : 'TOTAL'}
    </TableCell>
    <TableCell style={{...style.cell, backgroundColor: '#dff0d8'}}>{Math.round(esp * 100) / 100}</TableCell>
    <TableCell style={{...style.cell, backgroundColor: '#fcf8e3'}}>{Math.round(tr * 100) / 100}</TableCell>
    <TableCell style={{...style.cell, backgroundColor: '#f2dede'}}>{Math.round(cb * 100) / 100}</TableCell>
    <TableCell style={{...style.cell, backgroundColor: '#f5f5f5'}}>{Math.round(total * 100) / 100}</TableCell>
    <TableCell style={{...style.cell, backgroundColor: '#6c757d47'}}>{nbServices}</TableCell>
  </>
);

class ComptaTotalTable extends React.Component {
  render() {
    const {classes, isLoading} = this.props;
    const {emplacements, total} = this.props.totaux;
    return (
      <Paper className={classes.root}>
        <Table padding={"none"}>
          <TableHead>
            <TableRow>
              <TableCell style={{...style.cell}}>Emplacement</TableCell>
              <TableCell style={{...style.cell, backgroundColor: '#dff0d8'}}>Especes</TableCell>
              <TableCell style={{...style.cell, backgroundColor: '#fcf8e3'}}>Tickets Restaurants</TableCell>
              <TableCell style={{...style.cell, backgroundColor: '#f2dede'}}>Cartes Bancaires</TableCell>
              <TableCell style={{...style.cell, backgroundColor: '#f5f5f5'}}>Total</TableCell>
              <TableCell style={{...style.cell, backgroundColor: '#6c757d47'}}>Nb services</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={'totalMonth'} style={{border: 'outset'}}>{rowCells(total)}</TableRow>
            {emplacements.map((row, index) => <TableRow key={index}>{rowCells(row)}</TableRow>)}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

ComptaTotalTable.propTypes = {
  classes: PropTypes.object.isRequired,
  totaux: PropTypes.object.isRequired
};

export default withStyles(styles)(ComptaTotalTable);
