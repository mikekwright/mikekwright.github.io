import React from "react";
import Greeting from "./pages/landing";

console.log('Here I am');
React.renderToString(
  <Greeting name="World"/>,
  document.body
);

