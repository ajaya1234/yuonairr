import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

function Video_Page() {
  const [lists, setLists] = useState([]);
  const [lates, setLates] = useState([]);
  const [Comment, setcomment] = useState([]);
  const [getcommt, setgetcomment] = useState([]);
  const [ccomment, setCcomment] = useState("");

  const [subscribeMsg, setSubscribeMsg] = useState("");



  const addwishlist = async () => {
    const userid = localStorage.getItem('_id');
    const id =  localStorage.getItem("channelid");

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    if (lists?.status === "1") {
      
      const data = JSON.stringify({
        user_id: userid,
        channel_id: id,
        status: "0",
      });

      try {
        const response = await axios.post("http://16.16.91.234:3003/api/subscribe_to_channel", data, options);

        if (response.status === 200) {
          setLists(prevLists => ({
            ...prevLists,
            status: "0"
          }));
          addwishlist();
          //alert("Channel UnSubscribed")
         
          
        }
      } catch (error) {
        
      }
    } else {
      
      const data = JSON.stringify({
        user_id: userid,
        channel_id: id,
        status: "1",
      });
      //alert("Channel Subscribed")
      try {
        const response = await axios.post("http://16.16.91.234:3003/api/subscribe_to_channel", data, options);

        if (response.status === 200) {
          setLists(prevLists => ({
            ...prevLists,
            status: "1"
            
          }));
          addwishlist();
}
      } catch (error) {
        console.error("Error adding product to wishlist:", error);
      }
    }
  };







  // const subscribeToChannel = async () => {
  //   const userId = localStorage.getItem("_id");
  //   const channelId = localStorage.getItem("channelid");
  
  //   const options = {
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   };
  
  //   const data = JSON.stringify({
  //     user_id: userId,
  //     channel_id: channelId,
  //   });
  
  //   try {
  //     const response = await axios.post(
  //       "http://16.16.91.234:3003/api/subscribe_to_channel",
  //       data,
  //       options
  //     );
  //     if (response.data.result === "true") {
  //       setSubscribeMsg("Subscribed.");
  //       // Update the list of subscribed channels here if needed
  //     } else {
  //       setSubscribeMsg("Failed to subscribe to the channel.");
  //     }
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     setSubscribeMsg("An error occurred while subscribing to the channel.");
  //   }
  // };
  
  // const getSubscribedChannels = async () => {
   
  // };
  
  // const handleSubscribeClick = async () => {
  //   await subscribeToChannel();
  //   await getSubscribedChannels();
  // };
  
  





  // const subscribe = async () => {
  //   const userId = localStorage.getItem("_id");
  //   const channelId = localStorage.getItem("channelid");
  
  //   const options = {
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   };
  
  //   const data = JSON.stringify({
  //     user_id: userId,
  //     channel_id: channelId,
  //   });
  
  //   try {
  //     const response = await axios.post("http://16.16.91.234:3003/api/subscribe_to_channel", data, options);
  //     if (response.data.result === "true") {
  //       setSubscribeMsg("Subscribed.");
  //     } else {
  //       setSubscribeMsg("Failed to subscribe to the channel.");
  //     }
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     setSubscribeMsg("An error occurred while subscribing to the channel.");
  //   }
  // };



  // const subscribe = async () => {
    
  //   const useriddd = localStorage.getItem("useridd");
  //   const channeliddd = localStorage.getItem("channelid");

  //   const options = {
  //     headers: {
  //       "content-type": "application/json; charset=utf-8",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   };

  //   const data = JSON.stringify({
      
  //     user_id: useriddd,
  //     channel_id: channeliddd,
      
  //   });

  //   await axios
  //     .post("http://16.16.91.234:3003/api/subscribe_to_channel", data, options)
  //     .then((res) => {
        
  //     })
  //     .catch((err) => {
  //       console.error("API Error:", err);
  //     });
  // };







  const sendcomment = async () => {
    const idddd = localStorage.getItem("videoiid");
    const useriddd = localStorage.getItem("useridd");
    const channeliddd = localStorage.getItem("channelid");

    const options = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const data = JSON.stringify({
      video_id: idddd,
      user_id: useriddd,
      channel_id: channeliddd,
      msg: ccomment,
    });

    await axios
      .post("http://16.16.91.234:3003/api/send_comment", data, options)
      .then((res) => {
        setCcomment("");
        setcomment(res.data.data);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  };

  useEffect(() => {
    getcomment();
  }, []);

  const getcomment = async () => {
    const idddd = localStorage.getItem("videoiid");

    const options = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const data = JSON.stringify({
      video_id: idddd,
    });

    await axios
      .post("http://16.16.91.234:3003/api/get_comment", data, options)
      .then((res) => {
        setgetcomment(res.data.data);
        getcomment();
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  };

  useEffect(() => {
    getHomeData();
  }, []);

  const getHomeData = async () => {
    const idddd = localStorage.getItem("videoiid");

    const options = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const data = JSON.stringify({
      video_id: idddd,
    });

    await axios
      .post("http://16.16.91.234:3003/api/get_single_video", data, options)
      .then((res) => {
        setLists([res.data.data]);
        getHomeData();
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  };

  useEffect(() => {
    getHomeData2();
  }, []);

  const getHomeData2 = async () => {
    const idddd = localStorage.getItem("videoiid");

    const options = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const data = JSON.stringify({
      category_type: "bollywood",
    });

    await axios
      .post("http://16.16.91.234:3003/api/related_video", data, options)
      .then((res) => {
        setLates(res.data.data);
        getHomeData2();
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  };

  // {getcommt.map((list) => {
  //   return (
  //                     <>{list.msg}</>
  //                     );
  //                   })}

  return (
    <>
      <Header />
      <Sidebar />
      <div id="wrapper">
        <div id="content-wrapper">
          <div className="container-fluid pb-0">
            <div className="video-block section-padding">
              <div className="row">
                <div className="col-md-8">
                  {lists.map((list) => {
                    return (
                      <div className="single-video-left" key={list._id}>
                        <div className="single-video">
                          <ReactPlayer
                            url={
                              "http://16.16.91.234:3003/uploads/" +
                              list.video_url
                            }
                            width="640"
                            height="360"
                            controls={true}
                          />
                        </div>

                        <div className="single-video-title box mb-3">
                          <h2>
                            <Link to="#">{list.video_name}</Link>
                          </h2>
                          <p className="mb-0">
                            <i className="fas fa-eye" /> {list.video_views}{" "}
                            views
                          </p>
                        </div>
                        <div className="single-video-author box mb-3">
                          <div className="float-right">
                          {/* <button
    onClick={handleSubscribeClick}
    className="btn btn-danger"
    type="button"
  >
    Subscribe
    <strong>{subscribeMsg && <p>{subscribeMsg}</p>}10.4M</strong>
  </button> */}

<button
    onClick={addwishlist}
    className="btn btn-danger"
    type="button"
  >
    Subscribe
    <strong>{subscribeMsg && <p>{subscribeMsg}</p>}10.4M</strong>
  </button>

                           
                           
                            {/* <button onClick={subscribe} className="btn btn-danger" type="button">
                              Subscribe
                              <strong>{subscribeMsg && <p>{subscribeMsg}</p>}10.4M</strong>
                            </button>{" "} */}
                            <button
                              className="btn btn btn-outline-danger"
                              type="button"
                            >
                              <i className="fas fa-bell" />
                            </button>
                          </div>
                          <img className="img-fluid" src="img/s4.png" alt="" />
                          <p>
                            <Link to="#">
                              <strong>{list.channel_name}</strong>
                            </Link>{" "}
                            <span
                              title=""
                              data-placement="top"
                              data-toggle="tooltip"
                              data-original-title="Verified"
                            >
                              <i className="fas fa-check-circle text-success" />
                            </span>
                          </p>
                          <small>Published on Aug 10, 2020</small>

                          <p>
                            <input
                              type="text"
                              placeholder="Comment"
                              value={ccomment}
                              onChange={(e) => setCcomment(e.target.value)}
                            />
                          
                          <button onClick={sendcomment}>Submit</button></p>
                        </div>
                        {/* <div className="single-video-info-content box mb-3">
                          <h6>Title:</h6>
                          <p>
                            Nathan Drake , Victor Sullivan , Sam Drake , Elena
                            Fisher
                          </p>
                          <h6>Category :</h6>
                          <p>Gaming , PS4 Exclusive , Gameplay , 1080p</p>
                          <h6>Description :</h6>
                          <p>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                            Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using
                            'Content here, content here', making it look like
                            readable English. Many desktop publishing packages
                            and web page editors now use Lorem Ipsum as their
                            default model text, and a search for 'lorem ipsum'
                            will uncover many web sites still in their infancy.
                            Various versions have evolved overVarious versions
                            have evolved over the years, sometimes{" "}
                          </p>
                          <h6>Tags :</h6>
                          <p className="tags mb-0">
                            <span>
                              <Link to="#">Uncharted 4</Link>
                            </span>
                            <span>
                              <Link to="#">Playstation 4</Link>
                            </span>
                            <span>
                              <Link to="#">Gameplay</Link>
                            </span>
                            <span>
                              <Link to="#">1080P</Link>
                            </span>
                            <span>
                              <Link to="#">ps4Share</Link>
                            </span>
                            <span>
                              <Link to="#">+ 6</Link>
                            </span>
                          </p>
                        </div> */}
                      </div>
                    );
                  })}
{getcommt.slice(-5).map((list) => {
  return <p>{list.msg}</p>;
})}

{/* {lists.msg ? (
  getcommt.slice(-5).map((list) => {
    return <p>{list.msg}</p>;
  })
) : (
  <p>No comments</p>
)} */}


                  {/* {getcommt.map((list) => {
                    return <p>{list.msg}</p>;
                  })} */}
                </div>

                <div className="col-md-4">
                  <div className="single-video-right">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="main-title">
                          <div className="btn-group float-right right-action">
                            <Link
                              to="#"
                              className="right-action-link text-gray"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Sort by{" "}
                              <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link className="dropdown-item" to="#">
                                <i className="fas fa-fw fa-star" />
                                &nbsp; Top Rated
                              </Link>
                              <Link className="dropdown-item" to="#">
                                <i className="fas fa-fw fa-signal" /> &nbsp;
                                Viewed
                              </Link>
                              <Link className="dropdown-item" to="#">
                                <i className="fas fa-fw fa-times-circle" />{" "}
                                &nbsp; Close
                              </Link>
                            </div>
                          </div>
                          <h6>Up Next</h6>
                        </div>
                      </div>
                      <div className="col-md-12">
                        {lates.map((list) => {
                          return (
                            <div className="video-card video-card-list">
                              <div className="video-card-image">
                                <Link
                                  onClick={() => {
                                    localStorage.setItem("videoiid", list._id); // Use the extracted videoId
                                  }}
                                  className="play-icon"
                                  to="/video_page"
                                >
                                  <i className="fas fa-play-circle" />
                                </Link>
                                <Link to="/video_page">
                                  <img
                                    onClick={() => {
                                      localStorage.setItem(
                                        "videoiid",
                                        list._id
                                      ); // Use the extracted videoId
                                    }}
                                    className="img-fluid"
                                    src={
                                      "http://16.16.91.234:3003/uploads/" +
                                      list.video[1].filename
                                    }
                                    alt=""
                                  />
                                </Link>
                                <div className="time">3:50</div>
                              </div>
                              <div className="video-card-body">
                                <div className="btn-group float-right right-action">
                                  <Link
                                    to="#"
                                    className="right-action-link text-gray"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    <i
                                      className="fa fa-ellipsis-v"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <Link className="dropdown-item" to="#">
                                      <i className="fas fa-fw fa-star" /> &nbsp;
                                      Top Rated
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i className="fas fa-fw fa-signal" />{" "}
                                      &nbsp; Viewed
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i className="fas fa-fw fa-times-circle" />{" "}
                                      &nbsp; Close
                                    </Link>
                                  </div>
                                </div>
                                <div className="video-title">
                                  <Link to="#">{list.description}</Link>
                                </div>

                                <div className="video-view">
                                  {list.video_views} views &nbsp;
                                  <i className="fas fa-calendar-alt" /> 11
                                  Months ago
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Video_Page;
