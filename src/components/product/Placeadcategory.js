import React, { useState } from "react";

const Placeadcategory = ({ categories, selectCategory }) => {
  const [values, setValues] = useState("");

  const handleChange = (evt) => {
    console.log(evt.target.value);
    selectCategory(evt.target.value);
  };

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-12 col-md-6">
            {categories.map((categ, i) => {
              if (i <= categories.length / 2) {
                return (
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">
                      {categ.icon}
                      {categ.name}
                    </label>
                    <select
                      class="form-control form-control-lg"
                      id="exampleFormControlSelect1"
                      value={values}
                      onChange={handleChange}
                    >
                      {categ.sub.map((sub) => (
                        <option value={sub} onClick={handleChange}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
            })}
          </div>
          <div className="col-12 col-md-6">
            {categories.map((categ, i) => {
              if (i >= categories.length / 2) {
                return (
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">
                      {categ.icon}
                      {categ.name}
                    </label>
                    <select
                      //   style={{ border: "none" }}
                      class="form-control form-control-lg"
                      id="exampleFormControlSelect1"
                      value={values}
                      onChange={handleChange}
                    >
                      {categ.sub.map((sub) => (
                        <option value={sub} onClick={handleChange}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeadcategory;
