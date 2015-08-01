import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from './webpack.config.babel';

const server = new WebpackDevServer(webpack(config), {
  contentBase: 'build',
  publicPath: config.output.publicPath,
});

server.listen(8080, 'localhost', () => console.log('Listening at: http://localhost:8080'));
