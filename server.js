/* eslint no-console: 0 */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackConfig from './webpack.dev';

const app = express();
const compiler = webpack(webpackConfig);

const config = {
  port: {
    app: process.env.PORT || 8080,
  },
  devMiddleware: {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  },
};


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

app.listen(config.port.app, 'localhost', (error) => {
  if (error) return console.error(error);
  console.log(`App listening on port ${config.port.app}`);
});