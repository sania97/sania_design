// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const caseStudiesData = require('./case-studies.json'); // Import your product data from the "productss" file



/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.use('*/css',express.static('public/css'));
app.use('*/js',express.static('public/js'));
app.use('*/images',express.static('public/images'));

/**
 * Routes Definitions
 */
app.get('/', (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  // Pass relevant data from caseStudiesData to your template
  res.render('index', { title: 'Home', baseUrl, caseStudiesData });
});
app.get('/work/:slug', (req, res) => {
  const pageSlug = req.params.slug;
  const page = caseStudiesData[pageSlug];


  if (page) {
    res.render(`work/${page.slug}`, { page, caseStudiesData });
  } else {
    res.status(404).send('Page not found');
  }
});
app.get('/work/bpg2', (req, res) => {
  res.render('work/bpg2', { title: 'BPG Page' });
});
/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });