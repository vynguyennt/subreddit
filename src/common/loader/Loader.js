import React from "react";
import "./Loader.css";

export function PageLoader() {
  return (
    <div className="overlay">
      <div className="page-loader"></div>
    </div>
  );
}

export function ListLoader() {
  return (
    <div className="article">
      <div className="section-loader box-loader"></div>
      <div>
        <div className="section-loader text-loader"></div>
        <div className="section-loader text-loader"></div>
        <div className="section-loader text-loader"></div>
      </div>
    </div>
  );
}
