import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import FormRow from "../../common/forms/FormRow";
import TextInput from "../../common/forms/TextInput";
import IconTextButton from "../../common/forms/IconTextButton";
import Button from "../../common/forms/Button";
import { CSVReader } from "react-papaparse";
import CustomDataTable from "../../common/DataTable";
import TableFilter from "../../common/TableFilter";
import Col6 from "../../common/forms/Col6";
import { transformWBSData, listWBSMetaData, CSVLoaderStyles } from "./utils";
import SearchableDropDown from "../../common/forms/SearchableDropdown";
import { transformDropDownData } from "../../utils/dataTransformer";
import { Link } from "react-router-dom";
import PageContainer from "../../common/forms/PageContainer";
import SimpleCard from "../../common/cards/SimpleCard";
import SimpleRow from "../../common/forms/SimpleRow";

class AddWorkBreak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeId: null,
      showDeleteModal: false,
      filterText: "",
      resetPaginationToggle: false,
    };
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  componentDidMount() {
    this.props.getProjectList();
  }
  filteredItems = (data) => {
    console.log(data);
    return (
      data &&
      data.filter(
        (item) =>
          item.wbs &&
          item.wbs.toLowerCase().includes(this.state.filterText.toLowerCase())
      )
    );
  };

  render() {
    const subprop = this.props.addWorkBreak;
    return (
      <>
        <PageContainer>
          <SimpleCard>
            <FormRow>
              <SearchableDropDown
                label="Project Code"
                name="projectName"
                labelSize="mx-2"
                fieldSize="col-md-6"
                selectOptions={transformDropDownData(
                  this.props.wbs.projectCodesList,
                  "id",
                  "name"
                )}
                onChange={(obj) => this.props.handleChangeProjectName(obj)}
                value={this.props.wbs.wbsProjectName}
              />
            </FormRow>
            <hr />{" "}
            <FormRow>
              <Col className="col-6 offset-3">
                <CSVReader
                  onDrop={this.props.handleOnDrop}
                  onError={this.handleOnError}
                  noDrag
                  addRemoveButton
                  onRemoveFile={this.handleOnRemoveFile}
                  style={CSVLoaderStyles}
                >
                  <span className="loader-text">Click to upload WBS File</span>
                </CSVReader>
              </Col>
            </FormRow>
            <br />
            <FormRow>
              {this.props.wbs.wbsUploadedData && (
                <CustomDataTable
                  metaData={listWBSMetaData()}
                  bodyData={this.filteredItems(
                    transformWBSData(this.props.wbs.wbsUploadedData)
                  )}
                />
              )}
            </FormRow>
            <SimpleRow>
              <Col6>
                <Link to="/wbs.csv" target="_blank" download>
                  Download WBS Template
                </Link>
              </Col6>
              <Col6 size="col-md-6 d-flex justify-content-end">
                <Button
                  btnText="SAVE"
                  onClick={this.props.saveWBSData}
                  type="primary"
                  gradient
                />
                <Button
                  btnText="DISCARD"
                  type="danger"
                  onClick={this.props.resetUsersData}
                  gradient
                />
              </Col6>
            </SimpleRow>
          </SimpleCard>
        </PageContainer>
      </>
    );
  }
}

export default AddWorkBreak;
