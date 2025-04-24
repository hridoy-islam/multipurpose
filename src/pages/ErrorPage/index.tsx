import React from 'react';
import errorPage from '../../assets/imges/home/errorpage.png';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className=" flex">
      <div>
        <img src={errorPage} alt="" />
      </div>
      <div>
        <h1>OOPS! PAGE NOT FOUND</h1>
        <Link to="/">Back To Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
