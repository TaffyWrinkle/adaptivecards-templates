import React from 'react';
import { connect } from 'react-redux';

// Libraries
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

import { Template, PostedTemplate, TemplateInstance } from 'adaptive-templating-service-typescript-node';

// Redux
import { batchUpdateTemplateState, batchDeleteTemplateVersions } from '../../../store/currentTemplate/actions';

// Styles
import {
  BackDrop,
  Modal,
  Header,
  Description,
  DescriptionAccent,
  CenterPanelWrapper,
  BottomRow,
  ButtonGroup,
  LightButton,
  PrimaryStyleButton,
  Card,
  CardHeaderRow,
  CardHeaderText,
  CardBody,
  VersionWrapper,
  DateWrapper,
  StatusWrapper,
  CheckboxWrapper
} from './styled';

import {
  VersionCardRow,
} from '../../Dashboard/PreviewModal/TemplateInfo/VersionCard/styled';

import {
  StatusIndicator,
  Status
} from '../../Dashboard/PreviewModal/TemplateInfo/styled';

import { getDateString } from '../../../utils/versionUtils';
import ModalHOC from '../../../utils/ModalHOC';
import { closeModal } from '../../../store/page/actions';

interface Props {
  template: Template;
  closeModal: () => void;
  updateTemplateState: (versionList: string[], stateList: PostedTemplate.StateEnum[]) => void;
  deleteTemplateVersions: (versionList: string[]) => void;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    closeModal: () => {
      dispatch(closeModal());
    },
    updateTemplateState: (versionList: string[], stateList: PostedTemplate.StateEnum[]) => {
      dispatch(batchUpdateTemplateState(versionList, stateList, undefined));
    },
    deleteTemplateVersions: (versionList: string[]) => {
      dispatch(batchDeleteTemplateVersions(versionList, undefined))
    }
  }
}

interface State {
  versionList: boolean[];
}

class VersionModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { versionList: this.props.template.instances ? new Array(this.props.template.instances.length) : [] }
  }

  delete = () => {
    let list = this.props.template.instances!;
    let versionList: string[] = [];
    for (let i = 0; i < list.length; i++) {
      if (!this.state.versionList[i]) continue;
      versionList.push(list[i].version!);
    }
    this.props.deleteTemplateVersions(versionList);
    this.props.closeModal();
  }

  publish = () => {
    let list = this.props.template.instances!;
    let versionList: string[] = [];
    let stateList: PostedTemplate.StateEnum[] = [];
    for (let i = 0; i < list.length; i++) {
      if (!this.state.versionList[i]) continue;
      versionList.push(list[i].version!);
      stateList.push(PostedTemplate.StateEnum.Live);
    }
    this.props.updateTemplateState(versionList, stateList);
    this.props.closeModal();
  }

  unpublish = () => {
    let list = this.props.template.instances!;
    let versionList: string[] = [];
    let stateList: PostedTemplate.StateEnum[] = [];
    for (let i = 0; i < list.length; i++) {
      if (!this.state.versionList[i]) continue;
      versionList.push(list[i].version!);
      stateList.push(PostedTemplate.StateEnum.Deprecated);
    }
    this.props.updateTemplateState(versionList, stateList);
    this.props.closeModal();
  }

  render() {
    const { template } = this.props;
    return (
      <BackDrop>
        <Modal>
          <Header>Versions</Header>
          <Description>There are {template.instances!.length} versions for <DescriptionAccent>{template.name}</DescriptionAccent></Description>
          <CenterPanelWrapper>
            <Card>
              <CardHeaderRow>
                <CardHeaderText>Version</CardHeaderText>
                <CardHeaderText>Published</CardHeaderText>
                <CardHeaderText>Status</CardHeaderText>
                <CardHeaderText>{`${this.state.versionList.filter(function (s) { return s; }).length} Selected`}</CardHeaderText>
              </CardHeaderRow>
              <CardBody>
                {this.props.template.instances && this.props.template.instances.map((instance: TemplateInstance, index: number) => (
                  <VersionCardRow>
                    <VersionWrapper>
                      {instance.version}
                    </VersionWrapper>
                    <DateWrapper>{instance.publishedAt ? getDateString(instance.publishedAt) : "Not published"}</DateWrapper>
                    <StatusWrapper>
                      <StatusIndicator state={instance.state!} />
                      <Status>{instance.state && instance.state.toString().charAt(0).toUpperCase() + instance.state.toString().slice(1)}</Status>
                    </StatusWrapper>
                    <CheckboxWrapper><Checkbox checked={this.state.versionList[index]}
                      onChange={() => {
                        let updatedVersion = this.state.versionList;
                        updatedVersion[index] = !updatedVersion[index];
                        this.setState({ versionList: updatedVersion });
                      }} /></CheckboxWrapper>
                  </VersionCardRow>
                ))}
              </CardBody>
            </Card>
          </CenterPanelWrapper>
          <BottomRow>
            <ButtonGroup>
              <LightButton text="Cancel" onClick={this.props.closeModal} />
              <LightButton text="Delete" onClick={this.delete} />
              <PrimaryStyleButton text="Unpublish" onClick={this.unpublish} />
              <PrimaryStyleButton text="Publish" onClick={this.publish} />
            </ButtonGroup>
          </BottomRow>
        </Modal>
      </BackDrop>
    );
  }
}

export default ModalHOC(connect(() => { return {} }, mapDispatchToProps)(VersionModal));
