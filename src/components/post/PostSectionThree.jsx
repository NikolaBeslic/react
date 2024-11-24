import { useEffect, useState } from "react";
import SectionTitle from "../elements/SectionTitle";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import axiosClient from "../../utils/axios";

const PostSectionThree = ({ postData }) => {

  //const trendingPost = postData.filter(post => post.trending === true);
  const trendingPost = postData;

  return (
    <div className="section-gap section-gap-top__with-text trending-stories">
      <div className="container">
        <SectionTitle title="Najnoviji tekstovi" btnText="Svi tekstovi" />
        <div className="row">
          {trendingPost.slice(0, 8).map((item) => (
            <div className="col-lg-6" key={item.slug}>
              <PostLayoutTwo data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostSectionThree;
