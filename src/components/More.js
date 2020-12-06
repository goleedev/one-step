import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Loading from 'components/Loading';
import NoResult from 'components/NoResult';
import './More.css';

const More = () => {
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [noResult, setNoResult] = useState(false);
    const [posts, setPosts] = useState([]);
    const postDb = dbService.collection('posts');

    useEffect(() => {
        postDb
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                let postArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            setPosts(postArray);
            })
        setIsLoaded(true);
    }, []);
    const onClick = (event) => {
        const {
            target: { id },
        } = event;
        if (!id) {
            postDb
                .orderBy("createdAt", "desc")
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
            postDb
                .where("type", "==", id)
                .orderBy("createdAt", "desc")
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
                        <span onClick={onClick}>전체</span>
                        <span id="tech" onClick={onClick}>테크</span>
                        <span id="dev" onClick={onClick}>개발</span>
                        <span id="career" onClick={onClick}>커리어</span>
                    </div>
                    {!isLoaded
                        ? <Loading />
                        : noResult    
                        ? <NoResult />
                        : <>
                        <div className="more__posts container row">
                            {posts.map((post) =>
                                <div className="more__post col-sm-3">
                                    <h4>{post.title}</h4>
                                    <p>{post.content}</p>
                                </div>
                            )}
                        </div>
                    </>}
                </div>
            </div>
        </>
    );
};

export default More;
