import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createLocation, updateLocation } from "../redux/actions/locations";

const Form = ({ formData, btntext }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    if (formData.id) {
      dispatch(updateLocation(formData.id, data));
    } else {
      dispatch(createLocation(data));
    }
  }; // your form submit function which will invoke after successful validation

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Location</label>
          <input
            className="d-block form-control"
            name="location"
            ref={register({ required: true })}
            defaultValue={formData.location || ""}
          />
          {errors.location && <p>This field is required</p>}
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            className="d-block form-control"
            name="description"
            defaultValue={formData.description || ""}
            ref={register}
          />
        </div>
        <div className="action-holder">
          <input type="submit" className="btn btn-primary" value={btntext} />
        </div>
      </form>
    </div>
  );
};

export default Form;
