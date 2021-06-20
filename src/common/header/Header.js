import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTitle,
  selectPrimaryColor,
  selectBgColor,
  selectBannerImg,
  selectBannerHeight,
  selectInfoStatus,
  fetchInfo,
} from "../../store/subredditInfoSlice";
import { selectTextColorForBg } from "../utils/colorUtils";
import "./Header.css";

function Header() {
  const { subreddit, articleId } = useParams();

  const status = useSelector(selectInfoStatus);
  const title = useSelector(selectTitle);
  const primaryColor = useSelector(selectPrimaryColor);
  const bgColor = useSelector(selectBgColor);
  const bannerImg = useSelector(selectBannerImg);
  const bannerHeight = useSelector(selectBannerHeight);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "unload") {
      dispatch(fetchInfo({ name: subreddit }));
    }
  }, []);

  document.documentElement.style.setProperty("--primary-color", primaryColor);
  document.documentElement.style.setProperty("--banner-bg-color", bgColor);

  let headerStyle = {
    background: bannerImg ? `url(${bannerImg}) no-repeat center / cover` : "",
  };
  if (bannerHeight) {
    if (!articleId) {
      headerStyle.paddingTop = bannerHeight / 2;
    } else {
      headerStyle.height = bannerHeight / 2;
    }
  }

  return (
    <header
      className={!articleId ? "subreddit-header" : "subreddit-link"}
      style={headerStyle}
    >
      <Link to="/">
        <i className="material-icons home-icon">home</i>
      </Link>

      {!articleId ? (
        <div className="subrredit-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="subreddit-icon"
          >
            <path d="M16.5,2.924,11.264,15.551H9.91L15.461,2.139h.074a9.721,9.721,0,1,0,.967.785ZM8.475,8.435a1.635,1.635,0,0,0-.233.868v4.2H6.629V6.2H8.174v.93h.041a2.927,2.927,0,0,1,1.008-.745,3.384,3.384,0,0,1,1.453-.294,3.244,3.244,0,0,1,.7.068,1.931,1.931,0,0,1,.458.151l-.656,1.558a2.174,2.174,0,0,0-1.067-.246,2.159,2.159,0,0,0-.981.215A1.59,1.59,0,0,0,8.475,8.435Z"></path>
          </svg>
          <span className="subreddit-title">{title}</span>
          <span className="subreddit-path">r/{subreddit}</span>
        </div>
      ) : (
        <Link
          to={`/r/${subreddit}/`}
          style={{ color: bgColor ? selectTextColorForBg(bgColor) : "#1c1c1c" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="subreddit-link-icon"
          >
            <path d="M15.8286,15.8998 C15.3466,16.3788 12.6326,15.5598 8.5516,11.4798 C4.4706,7.3968 3.6486,4.6858 4.1316,4.2038 C4.3566,3.9788 4.9286,3.9208 5.9126,4.3518 C5.6166,4.5678 5.3306,4.8008 5.0666,5.0658 C5.0536,5.0798 5.0416,5.0948 5.0266,5.1098 C5.5756,6.4268 6.8946,8.4088 9.2596,10.7728 C11.6206,13.1338 13.6046,14.4538 14.9246,15.0028 C14.9376,14.9898 14.9526,14.9778 14.9666,14.9638 C15.2316,14.6988 15.4646,14.4128 15.6786,14.1178 C16.1096,15.1028 16.0526,15.6748 15.8286,15.8998 M16.7526,11.8998 C17.4066,9.5458 16.8136,6.9138 14.9666,5.0658 C13.6436,3.7438 11.8866,3.0148 10.0166,3.0148 C9.3686,3.0148 8.7356,3.1078 8.1286,3.2768 C5.7306,1.7598 3.9176,1.5898 2.7176,2.7898 C1.4036,4.1028 2.0736,6.1918 3.2866,8.1688 C2.6446,10.5128 3.2276,13.1258 5.0666,14.9638 C6.3886,16.2868 8.1456,17.0148 10.0166,17.0148 C10.6536,17.0148 11.2746,16.9178 11.8736,16.7518 C13.0856,17.4938 14.3406,18.0318 15.4316,18.0318 C16.1156,18.0318 16.7366,17.8198 17.2426,17.3138 C18.4416,16.1138 18.2706,14.2988 16.7526,11.8998"></path>
          </svg>
          <span className="subreddit-name">{subreddit}</span>
        </Link>
      )}
    </header>
  );
}

export default Header;
