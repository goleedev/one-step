import React, { useState } from "react";
import Slide from 'react-reveal/Slide';
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faWonSign, faMapMarkerAlt, faHome, faStore, faSnowplow, faIndustry, faHouseUser, faBuilding, faPhoneSquareAlt, faObjectGroup, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import './ManageCard.css';

const ManageCard = ({ postObj }) => {
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(postObj.title);
    const [newContent, setNewContent] = useState(postObj.content);
    const [newCategory, setNewCategory] = useState(postObj.category);
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제 하시겠습니까?");
        if (ok) {
            await dbService.doc(`posts/${postObj.id}`).delete();
            await storageService.refFromURL(postObj.attachmentUrl).delete();
        }
    };
    const toggleEditing = () => {
        setNewTitle(newTitle);
        setNewContent(newContent);
        setNewCategory(newCategory);
        setEditing((prev) => !prev);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService
                .doc(`posts/${postObj.id}`)
                .update({
                    title: newTitle,
                    content: newContent,
                    category: newCategory,
                });
        setEditing(false);
    };
    const onChange = (event) => {
        let {
            target: { name, value },
        } = event;
        if (name === "title") {
            setNewTitle(value);
        } else if (name === "content") {
            setNewContent(value);
        } else if (name === "category") {
            setNewCategory(value);
        }
    };
    return (
        <div className="search-card-item col-lg-4 col-md-6">
        { editing ? (
        <>
        <div className="search-card">
            <form onSubmit={onSubmit} className="col-lg-12 product-recom-container manage-form">
                <input
                type="text"
                placeholder="Edit Title"
                value={newTitle}
                name="title"            
                onChange={onChange}
                className="formInput"
                />
                <textarea
                rows="5" cols="20"
                name="content"            
                placeholder="Edit Content"
                value={newContent}
                onChange={onChange}
                className="formInput formContent"
                />
                <select value={newCategory} onChange={onChange} name="category" id="category" className="formInput">
                    <option value="">Edit Category</option>
                    <option value="tech">tech</option>
                    <option value="dev">dev</option>
                    <option value="career">career</option> 
                </select>
                <div>
                    <input type="submit" value="수정 완료" className="formBtn" />
                    <p onClick={toggleEditing} className="formBtn cancelBtn">
                        취소
                    </p>         
                </div>  
            </form>
        </div>
        </>            
        ) : (
        <> 
        <div className="product-recom-container container row">
            <Slide bottom duration={400}>
                <div key={postObj.id} className="product-recom-item col-lg-3 col-md-6">
                    <img src={postObj.attachmentUrl} alt="post-pic"/>
                    <h4>{postObj.title}</h4>
                    <p>{postObj.content}</p>
                </div>
            </Slide>
            <div className="product__actions">
                <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </span>
            </div>        
        </div>
        </>
        )}
    </div>
    );
};

export default ManageCard;