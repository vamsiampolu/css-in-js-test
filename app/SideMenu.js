import React from 'react';
import { Link } from 'react-router';
import { List, ListItem, MakeSelectable } from 'material-ui/List';
import MobileTearSheet from './MobileTearSheet';

export default function SideMenu() {
  let route = window.location.pathname;
  if (route === '/') {
    route = '/python';
  }
  const SelectableList = MakeSelectable(List);
  return (<MobileTearSheet>
    <SelectableList value={route}>
      <ListItem
        value="/python"
        primaryText="Python"
        containerElement={<Link to="/python" />}
      />
      <ListItem
        value="/ruby"
        primaryText="Ruby"
        containerElement={<Link to="/ruby" />}
      />
      <ListItem
        value="/javascript"
        primaryText="Javascript"
        containerElement={<Link to="/javascript" />}
      />
      <ListItem
        value="/haskell"
        primaryText="Haskell"
        containerElement={<Link to="/haskell" />}
      />
    </SelectableList>
  </MobileTearSheet>
  );
}