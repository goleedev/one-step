import React, { useState, useEffect } from 'react';
import Slide from 'react-reveal/Slide';
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
    };
    return (
        <>
            <div className="more">
                <div className="container">
                    <h3 className="more__title">1 STEP 둘러보기</h3>
                    <div className="more__list row">
                        <span id="all" onClick={onClick}>전체</span>
                        <span id="tech" onClick={onClick}>테크</span>
                        <span id="dev" onClick={onClick}>개발</span>
                        <span id="career" onClick={onClick}>커리어</span>
                    </div>
                    {!isLoaded
                        ? <LoadingSpinner />
                        : noResult    
                        ? <NoResult />
                        : <>
                        <div className="more__posts container row">
                            {posts.map((post) =>
                            <Slide bottom duration={300}>
                                <div key={post.id} className="more__post col-md-3 col-sm-6">
                                    <h4>{post.title}</h4>
                                    <p>{post.content}</p>
                                </div>
                            </Slide>
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
