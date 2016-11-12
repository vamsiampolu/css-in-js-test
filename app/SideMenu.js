import React from 'react';
import { List, ListItem } from 'material-ui/List';
import MobileTearSheet from './MobileTearSheet';

export default function SideMenu() {
  return (<MobileTearSheet>
    <List>
      <ListItem primaryText="Ruby" />
      <ListItem primaryText="Python" />
      <ListItem primaryText="Javascript" />
      <ListItem primaryText="Haskell" />
    </List>
  </MobileTearSheet>
  );
}
