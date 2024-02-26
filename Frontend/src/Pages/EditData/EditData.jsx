import React from 'react';
import "./Edit.css"

const EditData = () => {
  return (
    <div>
         <div className="formCont">
        <div className="form-cont">
          <h3 className="Title  text-center mt-3">Edit Books</h3>
          <div className="input_field">
            <label for="exampleInputPassword1" className="form-label">
              Book Name
            </label>
            <input
              type="text"
              className="inputUser"
              name="bookName"
            //   value={bookData.bookName}
            //   onChange={handleChange}
            />
          </div>
          <div className="input_field">
            <label for="exampleInputPassword1" className="form-label">
              Book Name
            </label>
            <input
              type="text"
              className="inputUser"
              name="bookName"
            //   value={bookData.bookName}
            //   onChange={handleChange}
            />
          </div>
          <div className="input_field">
            <label for="exampleInputPassword1" className="form-label">
              Book Language
            </label>
            <input
              type="text"
              className="inputUser"
              name="bookLang"
            //   value={bookData.bookLang}
            //   onChange={handleChange}
            />
          </div>

          <div className="input_field">
            <label for="exampleInputPassword1" className="form-label">
              Book Author
            </label>
            <input
              type="text"
              className="inputUser"
              name="bookAuthor"
            //   value={bookData.bookAuthor}
            //   onChange={handleChange}
            />
          </div>
          <input type="button"
            className="buttonbtn" value="Submit"
            // onClick={editBooks}
          >
          </input>
        </div>
      </div>
    
    </div>
  )
}

export default EditData