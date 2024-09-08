import React, { useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { getProducts } from '../../firebase/firebaseFunctions';
import { useNavigate } from 'react-router-dom';
function Posts() {
  const Navigate = useNavigate()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const createView = (post) => {
    console.log(post);
    Navigate(`/viewPost?PRODUCTID=${post.id}`)
  }

  return (
    <div className="postParentDiv">


      <div className="recommendations">

        <div className="heading">
          <span>Fresh recommendations</span>
        </div>

        <div className="cards">
          <div className="row">

            {posts.length ? (
              posts.map((post, index) => (
                <div className="card" key={index} onClick={() => createView(post)}>
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={post.Image} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {post?.Price}</p>
                    <span className="kilometer">{post?.Title}</span>
                    <p className="name">{post?.Description}</p>
                  </div>
                  <div className="date">
                    <span>{post?.Date}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}


export default Posts;
