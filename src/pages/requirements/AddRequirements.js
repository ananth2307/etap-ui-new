import React, { Component } from "react";
import FormRow from "../../common/forms/FormRow";
import TextInput from "../../common/forms/TextInput";
// import FileInput from "../../common/forms/FileInput";
import IconTextButton from "../../common/forms/IconTextButton";
import Button from "../../common/forms/Button";
// import SimpleDropDown from "../../common/forms/SimpleDropDown";
// import CheckBox from "../../common/forms/CheckBox";
// import CustomAlert from "../../common/forms/customAlert";
// import Loader from "../../common/Loader";
// import DataTable from "../../common/DataTable";
import Col6 from "../../common/forms/Col6";
import TextArea from "../../common/forms/TextArea";
import SiteRequirementStructure from "./SiteRequirementStructure";
import { transformProjectValue } from "./utils";
import SiteRequirementsModal from "./SiteRequirementsModal";
import PageContainer from "../../common/forms/PageContainer";
import SimpleCard from "../../common/cards/SimpleCard";
import SimpleRow from "../../common/forms/SimpleRow";
import CustomDataTable from "../../common/DataTable";

class AddRequirement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
    };
  }
  componentDidMount() {
    const name = transformProjectValue();
    console.log(`Project Name: ${name}`);
    this.setState({ projectName: name });
    this.props.getProjectList();
    this.props.getWBSList();
    this.props.getStructureData();
  }

  render() {
    // const subprop = this.props.addRequirement;

    return (
      <>
        <PageContainer>
          <SimpleCard>
            <SimpleRow>
              <TextInput
                size="col-md-6"
                labelSize="col-md-4"
                fieldSize="col-md-8"
                label="Project"
                name="projectName"
                id="projectName"
                value={this.state.projectName}
                placeholder="Auto Fetch"
                disabled={true}
              />
            </SimpleRow>

            <div class="form-group row">
              <div class="col-sm-8">
                <IconTextButton
                  btnText="Requirement"
                  onClick={this.props.addSiteRequirement}
                />
              </div>
            </div>
            <div class="form-group row">
              {this.props.requirement.siteRequirementList.map((e, i) => {
                return (
                  <Col6>
                    <SiteRequirementStructure
                      {...this.props}
                      onStructureIDChange={(e) =>
                        this.props.onStructureIDChange(e.target.value, i)
                      }
                      ondrawingNumberChange={(e) =>
                        this.props.ondrawingNumberChange(e.target.value, i)
                      }
                      onQuantityChange={(e) =>
                        this.props.onQuantityChange(e.target.value, i)
                      }
                      handleStructureNameChange={(obj) =>
                        this.props.handleStructureNameChange(obj, i)
                      }
                      onSiteRequirementRemove={(i) =>
                        this.props.onSiteRequirementRemove(i)
                      }
                      index={i}
                      structureFamily={
                        this.props.requirement.siteRequirementList[i]
                          .structFamily
                      }
                      componentsCount={
                        this.props.requirement.siteRequirementList[i]
                          .componentsCount
                      }
                      drawingNumber={
                        this.props.requirement.siteRequirementList[i].drawingNo
                      }
                      quantity={
                        this.props.requirement.siteRequirementList[i].quantity
                      }
                      structureList={this.props.requirement.structureList}
                      structureName={
                        this.props.requirement.siteRequirementList[i]
                          .structureName
                      }
                    />
                  </Col6>
                );
              })}
              <SiteRequirementsModal
                showModal={this.props.requirement.showModal}
                {...this.props}
              />
            </div>
            <FormRow>
              <CustomDataTable
                // metaData={listStructureMetaData(
                //   (id) => this.props.handleDelete(id),
                //   (id) => this.props.handleEdit(id)
                // )}
                // bodyData={transformStructureList(
                //   this.filteredItems(this.props.structure.structureList),
                //   this.props.structure.structureFamilyList
                // )}
                metaData={[
                  { text: "Structure Name", dataField: "sample" },
                  { text: "Quantity", dataField: "smaple" },
                  { text: "Actions" },
                ]}
                bodyData={[]}
              />
            </FormRow>
            <SimpleRow>
              <TextArea
                labelSize="col-lg-3"
                size="col-lg-6"
                label="Remarks"
                name="remarks"
                id="remarks"
                onChange={(e) =>
                  this.props.handleChangeRequirementRemarks(e.target.value)
                }
                value={this.props.requirement.remarks}
                placeholder="Remarks"
              />
            </SimpleRow>
            <Button
              btnText="SAVE"
              onClick={this.props.saveRequirement}
              btnType="primary"
            />
            <Button
              btnText="DISCARD"
              btnType="cancel"
              onClick={this.props.resetRequirement}
            />
          </SimpleCard>
        </PageContainer>
      </>
    );
  }
}

export default AddRequirement;
