import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import ManageCard from 'components/ManageCard';
import './Manage.css';

const Manage = ({ userObj }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        dbService
            .collection('posts')
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                let postArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
                setPosts(postArray);
            });
    }, []);
    return (
        <>
        <div className="container manage row">
            <h3 className="title col-lg-12">Manage</h3>
                { posts.map((post) => (
                    <ManageCard
                    key={post.id}
                    postObj={post}
                    />
                ))}
        </div>
        </>
    );
};

export default Manage;