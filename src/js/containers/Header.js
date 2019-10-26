import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer/Drawer';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import {ListItemIcon} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {Link, withRouter} from 'react-router-dom';
import menuItems from 'Constants/menuItems';
import IconButton from '@material-ui/core/IconButton/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const drawerWidth = 220;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLabel: this.getLabelFromPathname(props.location.pathname),
      drawerIsOpen: true
    };
  }

  getLabelFromPathname = (pathname) => {
    const menu = menuItems.find((menu) => menu.pathname === pathname);
    return (menu ? menu.label : null);
  };

  handleDrawer = (selectedLabel) => {
    if (selectedLabel) {
      if (selectedLabel === this.state.selectedLabel)
        return;
      if (selectedLabel !== this.state.selectedLabel)
        this.setState({selectedLabel});
    }
    return this.setState({drawerIsOpen: !this.state.drawerIsOpen});
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={() => this.handleDrawer()}>
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Le Comptoir Indien
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          classes={{paper: classes.drawerPaper}}
          anchor={'left'}
          open={this.state.drawerIsOpen}
        >
          <div className={classes.toolbar}/>
          <List>
            {
              menuItems.map((menu, index) => (
                <ListItem
                  component={(this.state.selectedLabel === menu.label) ? null : Link}
                  to={menu.pathname}
                  button
                  key={index}
                  onClick={() => this.handleDrawer(menu.label)}
                >
                  <ListItemIcon>
                    {menu.getIcon()}
                  </ListItemIcon>
                  <ListItemText primary={menu.label}/>
                </ListItem>
              ))
            }
          </List>
        </Drawer>
      </div>
    );
  }
}

export default withRouter(withStyles(styles, {withTheme: true})(Header));
