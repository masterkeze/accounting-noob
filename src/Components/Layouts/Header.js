import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core/";
const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h5">会计分录查询</Typography>
    </Toolbar>
  </AppBar>
);
export default Header;
