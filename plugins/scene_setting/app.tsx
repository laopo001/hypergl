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
import { Tree, Popover, Row, Col, Input, Divider, Card } from 'antd';
import { format } from 'util';
import { EditableTagGroup } from './editable_tag_group/editable_tag_group';
const { TreeNode } = Tree;

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
          }} style={{ width: 40 }} size="small" />
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalPosition(position.x, v, position.z);
          }} defaultValue={position.y} style={{ width: 40 }} size="small" />
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalPosition(position.x, position.y, v);
          }} defaultValue={position.z} style={{ width: 40 }} size="small" />
        </Col>
      </Row>
      <Row>
        <Col span={6}>rotation:</Col>
        <Col span={18}>
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalEulerAngles(v, position.y, position.z);
          }} defaultValue={rotation.x} style={{ width: 40 }} size="small" />
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalEulerAngles(position.x, v, position.z);
          }} defaultValue={rotation.y} style={{ width: 40 }} size="small" />
          <Input onChange={(e) => {
            let v = parseFloat(e.target.value);
            root.setLocalEulerAngles(position.x, position.y, v);
          }} defaultValue={rotation.z} style={{ width: 40 }} size="small" />
        </Col>
      </Row>
      <Row>
        <Col span={6}>scale:</Col>
        <Col span={18}>
          <Input defaultValue={scale.x} style={{ width: 40 }} size="small" />
          <Input defaultValue={scale.y} style={{ width: 40 }} size="small" />
          <Input defaultValue={scale.z} style={{ width: 40 }} size="small" />
        </Col>
      </Row>

      {/* <Card
        size="small"
        title="rigid body"
      // extra={<a href="#">More</a>}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card> */}
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
      </div>
    );
  }
}


