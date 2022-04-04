import React from "react";
import "./home.css";
import blog from "../../assets/blog.svg";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleJoinNow = () => {
    navigate("/signup");
  };
  return (
    <div className="home-container">
      <div className="home-info">
        <div className="info">
          <div className="info-text">
            <h2>Meet Your Modern </h2>
            <h2 className="color-primary bold">Note Taking App </h2>
            <p className="info-body">
              Manage your daily tasks and workflow in a modern way and boost
              your efficiency without any efforts. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Magni explicabo odio dolorum, error
              similique laborum ex numquam voluptatem totam eos impedit
            </p>
          </div>
          <div className="auth-btbs">
            <button className="auth-signup" onClick={handleJoinNow}>
              Join Now
            </button>
            <Link to={"/login"}>
              <p className="color-primary">Already Have an account?</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="home-info-img">
        <img src={blog} alt="img" />
      </div>
    </div>
  );
};

export default Home;
