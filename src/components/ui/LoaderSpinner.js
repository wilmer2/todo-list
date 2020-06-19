import React from 'react';
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';


const LoaderSpinner = ({ type, color, height, width }) => (
  <Loader
    type={type}
    color={color}
    height={height}
    width={width}
  />
);

LoaderSpinner.defaultProps = {
  height: 100,
  width: 100,
  type: 'Oval',
  color: '#1171CE'
};

export default LoaderSpinner;
