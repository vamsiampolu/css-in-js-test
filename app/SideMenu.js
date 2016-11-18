import React from 'react';
import { Link } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import MobileTearSheet from './MobileTearSheet';

export default function SideMenu() {
  return (<MobileTearSheet>
    <List>
      <ListItem primaryText="Ruby" containerElement={<Link to="/ruby" />} />
      <ListItem primaryText="Python" containerElement={<Link to="/python" />} />
      <ListItem primaryText="Javascript" containerElement={<Link to="/javascript" />} />
      <ListItem primaryText="Haskell" containerElement={<Link to="/haskell" />} />
    </List>
  </MobileTearSheet>
  );
}
