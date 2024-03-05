import {Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function AddNote() {

  const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/notes`;
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false); 
  const getURL = `${baseUrl}/${id}`;
  const [value, setValue] = useState("added");

  let data = {
    title, description
  };

  const fetchData = async () => {
    try {
      await axios.get(getURL).then(res => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSubmitted(false);
    if (id) {
      fetchData();
    }
  }, [fetchData]);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      if(id){
        axios.put(getURL, {title, description}).then(res => {
          setSubmitted(true);
          setValue("updated");
        });
      }else{
        axios.post(baseUrl, data).then(res => {
          console.log("response ->", res);
          setSubmitted(true);
          setValue("added");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeNote = () => {
    try {
      axios.delete(`${baseUrl}/${id}`).then(res => {
          setSubmitted(true);
          setValue("deleted");
      })
    } catch (error) {
      
    }
  }

  return (
    <div>
      <div className="breadcrump-nav">
        <Link to="/" className="back-button">
          👈 back
        </Link>
        <Link to="/" className="delete" onClick={removeNote}>
        ❌ Remove
        </Link>
       
      </div>
      <br />
      <form onSubmit={addNote}>
        <div className="single-note">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="title"
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="4"
              cols="50"
              className="description"
            ></textarea>
          </div>
        </div>
        <input
          type="submit"
          value={submitted ? "Saving note..." : "💾 Save Note"}
          disabled={submitted}
        />

        <p className="text-center">
          {(!submitted) ? "" : <div className="success-message">Note has been {value}</div>}
        </p>
      </form>
    </div>
  );
}

export default AddNote;