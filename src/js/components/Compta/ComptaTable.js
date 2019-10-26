import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import format from "date-fns/format";

const styles = theme => ({
  root: {
    width: '425px',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto'
  }
});

const style = {
  cell: {
    textAlign:'center',
    fontWeight: 'bold',
    padding: '3px',
  }
};

class ComptaTable extends React.Component {
  render() {
    const {classes, recettes} = this.props;
    return (
      <Paper className={classes.root}>
        <Table padding={"none"}>
          <TableHead>
            <TableRow>
              <TableCell style={{...style.cell}}>Date</TableCell>
              <TableCell style={{...style.cell, backgroundColor: '#dff0d8'}}>Especes</TableCell>
              <TableCell style={{...style.cell, backgroundColor: '#fcf8e3'}}>Tickets Restaurants</TableCell>
              <TableCell style={{...style.cell, backgroundColor: '#f2dede'}}>Cartes Bancaires</TableCell>
              <TableCell style={{...style.cell, backgroundColor: '#f5f5f5'}}>Total</TableCell>
              <TableCell style={{...style.cell, backgroundColor: '#DCEDFF'}}>Emplacement</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recettes.map((data, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{...style.cell, textAlign:'center'}}
                >
                  {format(new Date(data.laDate), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell style={{...style.cell, backgroundColor: '#dff0d8'}}>{data.esp}</TableCell>
                <TableCell style={{...style.cell, backgroundColor: '#fcf8e3'}}>{data.tr}</TableCell>
                <TableCell style={{...style.cell, backgroundColor: '#f2dede'}}>{data.cb}</TableCell>
                <TableCell style={{...style.cell, backgroundColor: '#f5f5f5'}}>{data.total}</TableCell>
                <TableCell style={{...style.cell, backgroundColor: '#DCEDFF'}}>{data.libelle}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

ComptaTable.propTypes = {
  recettes: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComptaTable);
