import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

export const NoPagefound = () => {
    const navigate = useNavigate();
    return (
        <div className="error-container flex-center">
        <h1 className="text-center">404 - Nothing to see here</h1>
        <div>
          <p className="text-center paragraph-md">Just kidding. There's plenty to see on BookClub.</p>
  
          <p className="text-center paragraph-md">
            Why not try a search, or take a look at our{" "}
            <span className="popular-span" onClick={() => navigate("/products")}>
              Popular Products ?
            </span>
          </p>
        </div>
      </div>
    )
}


