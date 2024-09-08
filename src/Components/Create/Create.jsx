import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { addProduct } from '../../firebase/firebaseFunctions';
import { FirebaseContext } from '../../firebase/firebaseContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const [showImage, setShowImage] = useState(null);
  const [formData, setFormData] = useState({ Title: '', Description: "", Price: "" })
  const [error, setError] = useState({ Title: "", Description: "", Price: "", Image: "" })

  const { userData } = useContext(FirebaseContext)
  const Navigate = useNavigate()

  const submit = () => {
    if (validate()) {
      addProduct(formData, showImage, userData.uid).then(() => {
        window.Swal.fire({
          icon: 'success',
          title: 'added successfully ',
          text: 'Your Product added succesfully, thankyou',
          confirmButtonText: 'OK',
        }).then(() => {
          Navigate('/')
        });
      })
    }
  }

  function validate() {
    const nameRegex = /^[a-zA-Z']+$/;
    const DescRegex = /^[a-zA-Z0-9\s']{3,}$/;

    if (formData.Title !== "" && nameRegex.test(FormData.Title)) {
      if (formData.Description.trim().length > 5) {
        if (DescRegex.test(formData.Description)) {
          if (formData.Price.trim() > 9) {
            if (!isNaN(formData.Price.trim())) {
              console.log(showImage);
              if (showImage) {
                return true
              } else {
                setError({ Image: "please select a image" })
                return false
              }
            } else {
              setError({ Price: "Invalid Price, Enter a valid price" })
            }
          } else {
            setError({ Price: "Enter a value more than 9" })
          }
        } else {
          showError({ Description: "Enter a valid description" })
        }

      } else {
        showError({ Description: "Description must be more than 5 and less than 20" })
      }
    } else {
      showError({ Title: "Invalid title, please enter a valid title " })
    }
    return false
    function showError(err) {
      setError((rest) => ({ ...rest, ...err }))
    }
  }

  return (
    <Fragment>

      <div className="row">
        <Header />
      </div>

      <div className="row secondRow">

        <card>
          <center><h2 className='headingText'>Post Your Add</h2></center>

          <div className="row">
            <div className="mx-auto col-sm-4">
              <div className="centerDiv">
                <form>
                  {error.Title && <p className='error'>{error.Title}</p>}
                  <label htmlFor="fname">Ad Your Title</label>
                  <br />
                  <input onChange={(e) => {
                    setFormData((rest) => ({ ...rest, Title: e.target.value }));
                    setError((rest) => ({ ...rest, Title: "" }))
                  }}
                    className="form-control"
                    type="text"
                    name="Name"
                    placeholder='Enter your Ad Title'
                  />
                  <br />
                  {error.Description && <p className='error'>{error.Description}</p>}
                  <label htmlFor="fname">Description</label>
                  <br />
                  <input onChange={(e) => {
                    setFormData((rest) => ({ ...rest, Description: e.target.value }))
                    setError((rest) => ({ ...rest, Description: "" }))
                  }}
                    className="form-control"
                    type="text"
                    placeholder="Enter your Description"
                    name="category"
                  />
                  <br />
                  {error.Price && <p className='error'>{error.Price}</p>}
                  <label htmlFor="fname">Price</label>
                  <br />
                  <input onChange={(e) => {
                    setFormData((rest) => ({ ...rest, Price: e.target.value }))
                    setError((rest) => ({ ...rest, Price: "" }))
                  }}
                    className="form-control"
                    placeholder='Enter your Price'
                    type="number" name="Price" />

                </form>
                {error.Image && <p className='error'>{error.Image} </p>}
                {showImage && <><br /><img alt="Posts" width="100px" height="50px" src={URL.createObjectURL(showImage)} /></>} <br /><br />
                <input type="file" accept='image/*' onChange={(e) => { setShowImage(e.target.files[0]); setError((rest) => ({ ...rest, Image: null })) }} />


                <button className="uploadBtn" onClick={submit} >upload and Submit</button>

              </div>
              <br /></div>
          </div>

        </card>
      </div>

    </Fragment >
  );
};

export default Create;
