import React, { useState, useEffect } from "react";
import { storageService, dbService, firebaseInstance } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "components/LoadingSpinner";
import './Upload.css';

const Upload = ({ userObj }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const [category, setCategory] = useState(""); 
  const [attachment, setAttachment] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (title === "" || content === "" || category=== "") {
      return;
    }
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
      };
    const postObj = {
        createdAt: firebaseInstance.firestore.Timestamp.now().toDate(),
        creatorId: userObj.uid,
        title,
        content,
        category,
        attachmentUrl,
        tags,
    };
    await dbService
      .collection("posts")
      .add(postObj);
    setTitle("");
    setContent("");
    setTags([]);
    setAttachment("");
    setTimeout(function () {
        document.getElementById("alert").innerHTML = '';
        document.getElementById("alert").style.display = "none";
    }, 3000);
    document.getElementById("alert").style.display = "inline-block";
    document.getElementById("alert").innerHTML = 'Uploaded Successfully!👋';
  };
  const onChange = (event) => {
    let {
      target: { name, value },
    } = event;
    if (name === "title") {
        setTitle(value);
    } else if (name === "content") {
        setContent(value);
    } else if (name === "category") {
        setCategory(value);
    } else if (name === "tag") {
        setTag(value);
    } 
};
const onTagClick = (event) => {
    event.preventDefault();
    if (tag === "") {
      return;
    }
    setTags(tags => tags.concat(tag));
    setTag("");
}
const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };
  const onClearAttachment = () => setAttachment("");
    return (
        <>
            {isLoaded ?
                <div className="upload container">
                    <p id="alert"></p>
                    <h3 className="title col-lg-12">Upload</h3>
                    <form onSubmit={onSubmit} className="upload-form row">
                        <div className="upload-attach col-md-6">
                            <label htmlFor="attach-file" className="upload-label col-lg-12">
                                <span>Picture</span>
                                <FontAwesomeIcon icon={faPlus} />
                            </label>
                            <input
                                id="attach-file"
                                required
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                                style={{
                                    opacity: 0,
                                }}
                            />
                            {attachment && (
                                <div className="upload-attachment col-lg-12">
                                    <img
                                        src={attachment}
                                        style={{
                                            backgroundImage: attachment,
                                        }}
                                        alt="upload-img"
                                    />
                                    <div className="upload-clear" onClick={onClearAttachment}>
                                        <span>Remove</span>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="upload-container row col-md-6">
                            <input
                                className="upload-input col-md-12"
                                value={title}
                                onChange={onChange}
                                type="text"
                                autoComplete="off"
                                name="title"
                                placeholder="Title"
                                required
                            />
                            <textarea
                                className="upload-input upload-content col-md-12"
                                value={content}
                                onChange={onChange}
                                type="text"
                                autoComplete="off"
                                name="content"
                                placeholder="Content"
                                required
                            />
                            <select onChange={onChange} name="category" id="category" className="col-md-12" required>
                                <option value="">Category</option>
                                <option value="tech">tech</option>
                                <option value="dev">dev</option>
                                <option value="career">career</option>
                            </select>
                            <div onClick={onTagClick} id="tags" className="upload-input col-md-12 row">
                                <input
                                    value={tag}
                                    onChange={onChange}
                                    type="text"
                                    name="tag"
                                    placeholder="Tag"
                                    autoComplete="off"
                                />
                                <button >+</button>
                            </div>
                        </div>
                        <input type="submit" className="upload-arrow col-lg-12" value="Upload" />
                    </form>
                </div>
                : <LoadingSpinner />}
        </>
    );
};

export default Upload;