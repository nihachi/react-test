import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocations,
  deleteLocation,
  viewLocation,
} from "../redux/actions/locations";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Dropdown } from "react-bootstrap";
import ModalForm from "./Modal";

const Locations = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);
  const loading = useSelector((state) => state.locations.loading);
  const error = useSelector((state) => state.locations.error);
  const success = useSelector((state) => state.actions.success);
  const data = useSelector((state) => state.actions);
  const [show, setShow] = useState(false);
  const [buttontext, setButtonText] = useState("Save");
  const [formData, setFormData] = useState({
    id: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getLocations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      setShow(false);
      dispatch(getLocations());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        id: data.id,
        location: data.data.location,
        description: data.data.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const rowActions = (cell, row) => {
    return (
      <>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="4"
              viewBox="0 0 16 4"
              fill="none"
            >
              <circle
                cx="2"
                cy="1.99988"
                r="2"
                transform="rotate(-90 2 1.99988)"
                fill="#B8BCC5"
              />
              <circle
                cx="8"
                cy="1.99988"
                r="2"
                transform="rotate(-90 8 1.99988)"
                fill="#B8BCC5"
              />
              <circle
                cx="14"
                cy="2"
                r="2"
                transform="rotate(-90 14 2)"
                fill="#B8BCC5"
              />
            </svg>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ margin: 0 }}>
            <Dropdown.Item onClick={() => updateLocation(row.id)}>
              View
            </Dropdown.Item>
            <Dropdown.Item
              className="dropdown-item"
              onClick={() => dispatch(deleteLocation(row.id))}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      headerStyle: () => {
        return { width: "10%" };
      },
      sort: true,
    },
    {
      dataField: "location",
      text: "Location",
      headerStyle: () => {
        return { width: "35%" };
      },
    },
    {
      dataField: "description",
      text: "Description",
      headerStyle: () => {
        return { width: "40%" };
      },
    },
    {
      dataField: "invoice_id",
      text: "",
      formatter: rowActions,
      headerStyle: () => {
        return { width: "5%" };
      },
      classes: () => {
        return "row_actions";
      },
    },
  ];

  const indication = () => {
    return <small>No locations available!</small>;
  };

  const updateLocation = (id) => {
    setShow(true);
    setButtonText("Update");
    dispatch(viewLocation(id));
  };

  const handleShowForm = () => {
    setShow(true);
    setButtonText("Save");
    setFormData({
      ...formData,
      id: "",
      location: "",
      description: "",
    });
  };

  const handleClose = () => {
    setShow(false);
    setFormData({
      ...formData,
      id: "",
      location: "",
      description: "",
    });
  };

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  return (
    <>
      <div className="container mt-5">
        {locations.loading && <p>Loading...</p>}
        <div className="actions-holder text-right mb-3">
          <button className="btn btn-primary" onClick={handleShowForm}>
            Add Location
          </button>
        </div>
        {locations.length > 0 && (
          <BootstrapTable
            keyField="id"
            noDataIndication={indication}
            pagination={paginationFactory()}
            data={locations}
            columns={columns}
            defaultSorted={defaultSorted}
          />
        )}
        {error && !loading && <p>{error}</p>}
      </div>
      <ModalForm
        formData={formData}
        show={show}
        handleClose={handleClose}
        btntext={buttontext}
      />
    </>
  );
};

export default Locations;
