import React from 'react'
import Router from 'react-router'

// This is the main site with all configurations
let core = require('./core/index.js');
// This is for the blog entries that are added
let blog = require('./blog/index.js');
// This is for any and all reveal.js slides that I create
let slides = require('./slides/index.js');

export default (
    <Route name="home" path="/" handler={
