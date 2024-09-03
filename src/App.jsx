import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [file, setFile] = useState(0);
  const [color, setColor] = useState("#000000");

  function handleChange(event) {
    setFile(URL.createObjectURL(event.target.files[0]));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:3000/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  const openEyeDropper = async () => {
    let eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    setColor(sRGBHex);
  };

  const handleCopyColor = async () => {
    await navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

  return (
    <>
      <div className="container">
        <div className="sidebarLeft">
          <h1>Color Picker App</h1>
          <p>Step 1: Upload image</p>

          <div className="uploadImage">
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleChange} />
            </form>
          </div>

          <p>Step 2: Pick the color you want using the Eye Dropper</p>
          <button className="openPickerButton" onClick={openEyeDropper}>
            Open Eyedropper
          </button>

          <p>Step 3: Click to copy the color</p>
          <button
            className="showColorButton"
            style={{ background: color }}
            onClick={handleCopyColor}
          >
            <span>{color}</span>
          </button>
        </div>
        <div className="sidebarRight">
          {file ? (
            <>
              <img src={file} alt="Working image" />
              <div />
            </>
          ) : (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="4em"
              width="4em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707v5.586l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zm-1.498 4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"></path>
              <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z"></path>
            </svg>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
