import React, { useEffect, useRef, useState } from "react";

import Header from "../../components/header/header";
import ItemsNav from "../../components/itemsNav/itemsNav";
import Footer from "../../components/footer/footer";

import { Autocomplete, Avatar, TextField } from "@mui/material";
import { AttachFile, Image, InfoOutlined } from "@material-ui/icons";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { WarningOutlined } from "@mui/icons-material";
import Cookies from "js-cookie";

import "./createProject.css";

function CreateProject() {
  const userId = Cookies.get("SLF_id");
  const registerSkills = useRef();
  const profileRef = useRef();

  const [file, setFile] = useState(null);
  const [descriptionLenght, setDescriptionLenght] = useState(0);
  const [description, setDescription] = useState("");
  const [smallDescriptionLenght, setSmallDescriptionLenght] = useState(0);
  const [smallDescription, setSmallDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [detailArr, setDetailArr] = useState([]);
  const [progress, setProgress] = useState(0);
  const [upload, setUpload] = useState(false);
  const [ProfilePicture, setProfilePicture] = useState("");
  const [categorie, setCategorie] = useState("");
  const [categorieName, setCategorieName] = useState("");
  const [allCategorie, setAllCategorie] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [allSubCategory, setAllSubCategory] = useState("");
  const [numberDay, setNumberDay] = useState(0);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const [register, setregister] = useState(false);
  const [LenghtOk, setLenghtOk] = useState(true);

  const Default = () => {
    document.getElementById("smallDescriptionLenght").style.display = "none";
    document.getElementById("descriptionLenght").style.display = "none";
    document.getElementById("smallDescriptionMaxLenght").style.display = "none";
    document.getElementById("descriptionMaxLenght").style.display = "none";
    document.getElementById("detailMaxLenght").style.display = "none";
    document.getElementById("projectCreationAllFieldRequired").style.display =
      "none";
    document.getElementById("projectCreationFailed").style.display = "none";
    document.getElementById("projectCreationSuccesful").style.display = "none";
  };

  const MaxLenghtCheck = () => {
    if (smallDescriptionLenght > 199) {
      document.getElementById("smallDescriptionMaxLenght").style.display =
        "flex";
      setLenghtOk(false);
    }
    if (descriptionLenght > 1999) {
      document.getElementById("descriptionMaxLenght").style.display = "block";
      setLenghtOk(false);
    }
    if (detailArr.length > 15) {
      document.getElementById("detailMaxLenght").style.display = "block";
      setLenghtOk(false);
    }
  };

  const HandleDetail = () => {
    var DArr = detail.split(" ");
    setDetailArr(DArr);
    console.log("detail");
  };

  const HandleUpload = () => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/profile pictures/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploaded);
      },
      (error) => {
        console.log(error);
        alert(
          "please check your internet connection we couldn't uplaod your gig image"
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUpload(true);
          console.log(url);
          setProfilePicture(url);
        });
      }
    );
  };

  const HandleDocumentUpload = (e) => {
    e.preventDefault();
    setregister(true);
    console.log("loading...");

    console.log(categorie);
    for (let element of allCategorie) {
      if (element._id == categorie) {
        setCategorieName(element.nameInSubCategory);
        console.log(categorieName);
      }
    }
    if (
      !file ||
      !smallDescription ||
      !description ||
      !detail ||
      !numberDay ||
      !name ||
      !price
    ) {
      document.getElementById("projectCreationAllFieldRequired").style.display =
        "block";
      document.getElementById("projectCreationAllFieldRequired").style.opacity =
        "1";
    } else {
      if (smallDescriptionLenght < 80) {
        document.getElementById("smallDescriptionLenght").style.display =
          "block";
        setregister(false);
      }
      if (descriptionLenght < 200) {
        document.getElementById("descriptionLenght").style.display = "block";
        setregister(false);
      }
      else if (!LenghtOk) {
        alert("please Check that you respected the length limits in the the field width length limits")
      } else if (file) {
        HandleUpload();
      }
    }
  };

  const HandleCreate = async (e) => {
    e.preventDefault();
    setregister(true);

    // setSkillsArr(Skills.split(" "));
    console.log(detailArr);
    console.log(ProfilePicture);
    console.log(categorieName);
    await axios
      .post("/project", {
        userId: userId,
        smallDescription: `I will ${smallDescription}`,
        description: description,
        image: ProfilePicture,
        detail: detailArr,
        deliveryTime: numberDay,
        price: price,
        name: name,
        categorie: categorieName,
        subCategorie: subCategory,
      })
      .then((res) => {
        document.getElementById("projectCreationSuccesful").style.display =
          "flex";
        console.log(res);
        setregister(false);
      })
      .catch((err) => {
        setregister(false);
        console.log("error reg");
        document.getElementById("projectCreationFailed").style.display = "flex";
        document.getElementById("projectCreationFailed").style.opacity = "1";
      });
  };

  useEffect(() => {
    const fetchFaculties = async () => {
      await axios
        .get("/project/category/all")
        .then((res) => {
          setAllCategorie(res.data);
          setCategorie(res.data[0]._id);
          fetchDepartments(res.data[0]._id);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fetchDepartments = async (category) => {
      await axios
        .get(`/project/AllCatId/${category}`)
        .then((res) => {
          setAllSubCategory(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchFaculties();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      categorie &&
        (await axios
          .get(`/project/AllCatId/${categorie}`)
          .then((res) => {
            setAllSubCategory(res.data);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          }));
    };

    fetchDepartments();
  }, [categorie]);

  return (
    <>
      <Header />
      <ItemsNav />
      <div className="createProjectContainer">
        <div className="createProjectTitle">
          Create Your Gig And Start Earning
        </div>
        <form className="createProjectForm" onSubmit={HandleDocumentUpload}>
          <div className="createProjectDescription">
            <div className="createProjectDescriptionTitle">
              Give a small description of what you will do!{" "}
              <span className="requiredField">*</span>
            </div>
            <div className="createProjectDescriptionNumberCharacters">
              {smallDescriptionLenght}/200
            </div>
            <div style={{ marginBottom: "20px", position: "relative" }}>
              <span className="createProjectDescriptionSmallInputStart">
                I will{" "}
              </span>
              <input
                type="text"
                className="createProjectDescriptionSmallInput"
                onChange={(e) => {
                  setSmallDescriptionLenght(e.target.value.length);
                  setSmallDescription(e.target.value);
                  Default();
                  MaxLenghtCheck();
                }}
              />
            </div>
            <div id="smallDescriptionLenght">
              Please enter at least 80 character
            </div>
            <div id="smallDescriptionMaxLenght">
              The maximum numbers of characters is 200
            </div>
            <div className="createProjectDescriptionTitle">
              Describe your gig <span className="requiredField">*</span>
            </div>
            <div className="createProjectDescriptionNumberCharacters">
              {descriptionLenght}/2000
            </div>
            <textarea
              name="createProjectDescription"
              className="createProjectDescriptionTextArea"
              rows="5"
              placeholder="I need..."
              onChange={(e) => {
                setDescriptionLenght(e.target.value.length);
                setDescription(e.target.value);
                Default();
                MaxLenghtCheck();
              }}
            ></textarea>
            <div id="descriptionLenght">
              Please enter at least 200 character
            </div>
            <div id="descriptionMaxLenght">
              The maximum numbers of characters is 2000
            </div>
            <div className="createProjectDescriptionTitle">
              Details <span className="requiredField">*</span>
            </div>
            <div className="createProjectDescriptionNumberCharacters">
              {detailArr.length}/15
            </div>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                className="createProjectDescriptionDetailInput"
                placeholder="html css wordpress figma"
                onChange={(e) => {
                  setDetail(e.target.value);
                  HandleDetail();
                  Default();
                  MaxLenghtCheck();
                }}
              />
            </div>
            <div id="detailMaxLenght">The maximum numbers of skills is 15</div>
          </div>

          <div className="createProjectPicture">
            <div className="createProjectPictureTitle">
              Image <span className="requiredField">*</span>
            </div>
            <label
              htmlFor="postRequestDescriptionFile"
              className="postRequestDescriptionAttacheFiles"
            >
              Gig Photo
              <Image />{" "}
            </label>
            <input
              type="file"
              name="postRequestDescriptionFile"
              id="postRequestDescriptionFile"
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files[0]);
                Default();
              }}
              ref={profileRef}
            />
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="postRequestDescriptionFileImage"
              />
            ) : (
              <img
                src="/assets/persons/1.jpg"
                alt=""
                className="postRequestDescriptionFileImage"
              />
            )}
          </div>
          <div>
            {progress !== 0 && (
              <div class="progress">
                <div
                  class="progress-bar bg-primary"
                  accept="application/pdf"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuemax="100"
                >
                  {progress}%
                </div>
              </div>
            )}
          </div>
          <div className="createProjectCategorie">
            <div className="createProjectCategorieTitle">
              Category <span className="requiredField">*</span>:
            </div>
            <div className="selects">
              <spam className="categoriSelect">
                <label htmlFor="createProjectCategorieCategorie">
                  Choose a category
                </label>
                <select
                  name="categori"
                  className="createProjectCategorieCategorie"
                  onChange={(e) => {
                    setCategorie(e.target.value);
                    Default();
                  }}
                >
                  {allCategorie &&
                    allCategorie.map((category) => (
                      <option value={category._id}>{category.name}</option>
                    ))}
                </select>
              </spam>
              <spam className="categoriSelect">
                <label htmlFor="createProjectCategorieSubCategorie">
                  Choose a subcategory
                </label>
                <select
                  name="categori"
                  className="createProjectCategorieSubCategorie"
                  onChange={(e) => {
                    setSubCategory(e.target.value);
                    Default();
                  }}
                >
                  {allSubCategory &&
                    allSubCategory.map((subCategory) => (
                      <option value={subCategory.subCategorie}>
                        {subCategory.subCategorie}
                      </option>
                    ))}
                </select>
              </spam>
            </div>
          </div>
          <div className="createProjectCategorieDays">
            <div className="createProjectCategorieDaysTitle">
              number of day you need to complet this type of project{" "}
              <span className="requiredField">*</span>
            </div>
            <label htmlFor="Days">Days </label>
            <input
              type="number"
              min="1"
              className="createProjectCategorieDaysInput"
              onChange={(e) => {
                setNumberDay(e.target.value);
                Default();
              }}
            />
          </div>
          <div className="createProjectCategorieBudget">
            <div className="createProjectCategorieBudgetTitle">
              Prices (&gt; $5) <span className="requiredField">*</span>
            </div>
            <label htmlFor="createProjectCategorieBudget">$ </label>
            <input
              type="number"
              min="5"
              className="createProjectCategorieBudgetInput"
              onChange={(e) => {
                setPrice(e.target.value);
                Default();
              }}
            />
          </div>
          <div className="createProjectCategorieBudget">
            <div className="createProjectCategorieBudgetTitle">
              Name (short Name best describing your Gig) <span className="requiredField">*</span>
            </div>
            <label htmlFor="createProjectCategorieBudget">$ </label>
            <input
              type="text"
              className="createProjectCategorieBudgetInput"
              onChange={(e) => {
                setName(e.target.value);
                Default();
              }}
            />
          </div>
          {upload ? (
            <div
              className="createProjectCategorieSubmit"
              onClick={HandleCreate}
            >
              <button type="submit">Create Gig</button>
            </div>
          ) : (
            <div
              className="createProjectCategorieSubmit"
              onClick={HandleDocumentUpload}
            >
              <button type="submit">upload document</button>
            </div>
          )}
        </form>
      </div>
      <div
        class="alert alert-danger alert-dismissible fade show"
        id="projectCreationAllFieldRequired"
        role="alert"
      >
        All fields are <strong>Required !</strong>
        <button type="button" class="btn-close" onClick={Default}></button>
      </div>

      <div
        class="alert alert-success align-items-center"
        role="alert"
        id="projectCreationSuccesful"
      >
        <div>
          <InfoOutlined style={{ fontSize: "20px", marginRight: "5px" }} /> Your
          gig was successfully created
        </div>
      </div>

      <div
        class="alert alert-danger align-items-center"
        role="alert"
        id="projectCreationFailed"
      >
        <div>
          <WarningOutlined style={{ fontSize: "20px", marginRight: "5px" }} />
          Sorry but your Gig could not be Save. Please check your connection or
          try again
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateProject;
