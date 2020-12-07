import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { dbService } from "fbase";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import LoadingSpinner from 'components/LoadingSpinner';
import NoResult from 'components/NoResult';
import './More.css';

const More = () => {
    const limtNumber = 4;
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [noResult, setNoResult] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        dbService
            .collection('posts')
            .orderBy("createdAt", "desc")
            .limit(limtNumber)
            .onSnapshot((snapshot) => {
                let postArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            setPosts(postArray);
            })
        setIsLoaded(true);
    }, []);
    const onLoadMore = () => {
        window.scrollTo(0, 0);
        history.push("/post");
    };
    const onClick = (event) => {
        const {
            target: { id },
        } = event;
        document.getElementById("all").style.fontWeight = "300";
        document.getElementById("tech").style.fontWeight = "300";
        document.getElementById("dev").style.fontWeight = "300";
        document.getElementById("career").style.fontWeight = "300";
        document.getElementById("all").style.color = "#1E1C24";
        document.getElementById("tech").style.color = "#1E1C24";
        document.getElementById("dev").style.color = "#1E1C24";
        document.getElementById("career").style.color = "#1E1C24";
        if (id === "all") {
            dbService
                .collection('posts')
                .orderBy("createdAt", "desc")
                .limit(limtNumber)
                .onSnapshot((snapshot) => {
                    let postArray = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    if (postArray.length <= 0) {
                        setNoResult(true);
                    } else {
                        setNoResult(false);
                        setPosts(postArray);
                    }
                })
        } else {
            dbService.collection('posts')
                .where("category", "==", id)
                .orderBy("createdAt", "desc")
                .limit(limtNumber)
                .onSnapshot((snapshot) => {
                    let postArray = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    if (postArray.length <= 0) {
                        setNoResult(true);
                    } else {
                        setNoResult(false);
                        setPosts(postArray);
                    }
                });
        }
        document.getElementById(id).style.fontWeight = "500";
        document.getElementById(id).style.color = "#525FFB";
    };
    return (
        <>
            <div className="more">
                <div className="container">
                    <Fade left duration={600}>
                        <h3 className="more__title">1 STEP 둘러보기</h3>
                    </Fade>
                    <Fade left duration={800}>
                    <div className="more__list row">
                        <span id="all" onClick={onClick}>전체</span>
                        <span id="tech" onClick={onClick}> 테크</span>
                        <span id="dev" onClick={onClick}> 개발</span>
                        <span id="career" onClick={onClick}> 커리어</span>
                        </div>
                    </Fade>
                    {!isLoaded
                        ? <LoadingSpinner />
                        : noResult    
                        ? <NoResult />
                        : <>
                        <div className="more__posts container row">
                            {posts.map((post) =>
                            <Link
                            className="more__detail"
                            to={{
                                pathname: `/post/${post.id}`,
                                state: {
                                    id: post.id,
                                    createdAt: post.createdAt,
                                    category: post.category,
                                    title: post.title,
                                    content: post.content,
                                    attachmentUrl: post.attachmentUrl,
                                }
                            }}
                            >
                            <Slide bottom duration={400}>
                            <div key={post.id} className="more__post col-lg-3 col-md-6">
                                <h4>{post.title}</h4>
                                <p>{post.content}</p>
                            </div>
                            </Slide>
                            </Link>
                            )}
                        </div>     
                    </>}
                    <h5 className="more__load-more" onClick={onLoadMore}>👉 소식 더 보기</h5>
                </div>
            </div>
        </>
    );
};

export default More;
