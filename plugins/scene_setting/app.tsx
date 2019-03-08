/*
 * ProjectName: hypergl
 * FilePath: /plugins/sceneSetting/app.ts
 * Created Date: Friday, March 8th 2019, 10:13:06 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, March 8th 2019, 10:13:13 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */

import React, { Component } from 'react';
import { Application, Plugin, Entity } from 'hypergl';
import { Tree, Popover, Row, Col, Input, Divider, Card, Select, Switch } from 'antd';
import { format } from 'util';
import { EditableTagGroup } from './editable_tag_group/editable_tag_group';
const { TreeNode } = Tree;
const Option = Select.Option;

export class App extends Component<{ app: Application }> {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
    treeData: [],
  };

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  })
  format(root: Entity) {
    let node = {
      title: '' as any,
      key: 0,
      children: [] as Array<any>
    };
    if (root.children.length > 0) {
      root.children.forEach(x => {
        node.children.push(this.format(x));
      });

    }
    let position = root.getLocalPosition() as any;
    let rotation = root.getLocalEulerAngles() as any;
    let scale = root.getLocalScale() as any;

    let plane = <div style={{ width: 300 }}>
      <Row>
        <Col span={6}>tags:</Col>
        <Col span={18}><EditableTagGroup value={root.tag} onChange={(tags) => { root.tag = tags; }} /></Col>
      </Row>

      <Row>
        <Col span={6}>position:</Col>
        <Col span={18}>
          <Input defaultValue={position.x} onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalPosition(v, position.y, position.z);
            // tslint:disable-next-line:no-unused-expression
            root.rigidbody && root.rigidbody.update();
          }} style={{ width: 60 }} size="small" />
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalPosition(position.x, v, position.z);
            // tslint:disable-next-line:no-unused-expression
            root.rigidbody && root.rigidbody.update();
          }} defaultValue={position.y} style={{ width: 60 }} size="small" />
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalPosition(position.x, position.y, v);
            // tslint:disable-next-line:no-unused-expression
            root.rigidbody && root.rigidbody.update();
          }} defaultValue={position.z} style={{ width: 60 }} size="small" />
        </Col>
      </Row>
      <Row>
        <Col span={6}>rotation:</Col>
        <Col span={18}>
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalEulerAngles(v, position.y, position.z);
          }} defaultValue={rotation.x} style={{ width: 60 }} size="small" />
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalEulerAngles(position.x, v, position.z);
          }} defaultValue={rotation.y} style={{ width: 60 }} size="small" />
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalEulerAngles(position.x, position.y, v);
          }} defaultValue={rotation.z} style={{ width: 60 }} size="small" />
        </Col>
      </Row>
      <Row>
        <Col span={6}>scale:</Col>
        <Col span={18}>
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalScale(v, scale.y, scale.z);
          }} defaultValue={scale.x} style={{ width: 60 }} size="small" />
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalScale(scale.x, v, scale.z);
          }} defaultValue={scale.y} style={{ width: 60 }} size="small" />
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalScale(scale.x, scale.y, v);
          }} defaultValue={scale.z} style={{ width: 60 }} size="small" />
        </Col>
      </Row>
      {root.collision ? <Card
        size="small"
        title="collision body"
      // extra={<a href="#">More</a>}
      >
        <Row>
          <Col span={6}>type:</Col>
          <Col span={18}>
            <Select size="small" defaultValue={root.collision.inputs.type} style={{ width: 120 }} onChange={(e) => {
              root.collision.inputs.type = e;
              root.collision.update();
            }}>
              <Option value="box">box</Option>
              <Option value="sphere">sphere</Option>
              <Option value="cylinder">cylinder</Option>
            </Select>
          </Col>
        </Row>
        {root.collision.inputs.type === 'box' ? <Row>
          <Col span={6}>halfExtents:</Col>
          <Col span={18}>
            <Input defaultValue={root.collision.inputs.halfExtents.x as any} onChange={(e) => {
              let v = parseFloat(e.target.value);
              (root.collision.inputs as any).halfExtents.x = v;
              root.collision.update();
            }} style={{ width: 60 }} size="small" />
            <Input defaultValue={root.collision.inputs.halfExtents.y as any} onChange={(e) => {
              let v = parseFloat(e.target.value);
              (root.collision.inputs as any).halfExtents.y = v;
              root.collision.update();
            }} style={{ width: 60 }} size="small" />
            <Input defaultValue={root.collision.inputs.halfExtents.z as any} onChange={(e) => {
              let v = parseFloat(e.target.value);
              (root.collision.inputs as any).halfExtents.z = v;
              root.collision.update();
            }} style={{ width: 60 }} size="small" />
          </Col>
        </Row> : null}
        {root.collision.inputs.type === 'sphere' ? <Row>
          <Col span={6}>radius:</Col>
          <Col span={18}>
            <Input defaultValue={root.collision.inputs.radius as any} style={{ width: 60 }} size="small" />
          </Col>
        </Row> : null}
      </Card> : null}
      {root.rigidbody ? <Card
        size="small"
        title="rigid body"
      // extra={<a href="#">More</a>}
      >
        <p>Card content</p>
      </Card> : null}
    </div>;
    node.title = <Popover content={plane} placement="left" title="Title" trigger="hover">
      {root.name}
    </Popover>;


    node.key = root.EntityID;
    return node;
  }
  componentDidMount() {
    let app = this.props.app;

    app.on('add', () => {
      let nodes = this.format(app.scene.root);
      this.setState({ treeData: [nodes] });
    });


  }
  render() {
    return (
      <div >
        <Tree
          checkable
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
        >
          {this.renderTreeNodes(this.state.treeData)}
        </Tree>
        <div>
          {/* <Switch defaultChecked onChange={() => {

          }} /> */}
        </div>
      </div>
    );
  }
}


