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
import { Application, Plugin, Entity, Vec3, util } from 'hypergl';
import { Tree, Popover, Row, Col, Divider, Card, Select, Switch, Collapse } from 'antd';
import { format } from 'util';
import { EditableTagGroup } from './editable_tag_group/editable_tag_group';
import { MyInput } from './myinput';
const { TreeNode } = Tree;
const Option = Select.Option;
const Panel = Collapse.Panel;



function create(input, key: string, cb = () => { /* */ }) {
  return <Row>
    <Col span={6}>{key}:</Col>
    <Col span={18}>{
      input[key] instanceof Vec3 ? <div>
        <MyInput defaultValue={input[key].x as any} onBlur={(e: any) => {
          let v = parseFloat(e);
          input[key].x = v;
          cb();
        }} />
        <MyInput defaultValue={input[key].y as any} onBlur={(e: any) => {
          let v = parseFloat(e);
          (input as any)[key].y = v;
          cb();
        }} />
        <MyInput defaultValue={input[key].z as any} onBlur={(e: any) => {
          let v = parseFloat(e);
          (input as any)[key].z = v;
          cb();
        }} />
      </div> : <MyInput defaultValue={input[key]} onBlur={(e: any) => {
        let v = parseFloat(e);
        (input as any)[key] = v;
        cb();
      }} />
    }

    </Col>
  </Row>;
}

let components = ['collision', 'rigidbody'];
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

    let plane = <div style={{ width: 400 }} onClick={e => { e.stopPropagation(); }} >
      <Row>
        <Col span={6}>tags:</Col>
        <Col span={18}><EditableTagGroup value={root.tag} onChange={(tags) => { root.tag = tags; }} /></Col>
      </Row>

      <Row style={{ marginTop: '5px' }}>
        <Col span={6}>position:</Col>
        <Col span={18}>
          <MyInput defaultValue={position.x} onBlur={(e: any) => {
            let v = parseFloat(e);
            root.setLocalPosition(v, position.y, position.z);
            // tslint:disable-next-line:no-unused-expression
            root.rigidbody && root.rigidbody.update();
          }} />
          <MyInput onBlur={(e: any) => {
            let v = parseFloat(e);
            root.setLocalPosition(position.x, v, position.z);
            // tslint:disable-next-line:no-unused-expression
            root.rigidbody && root.rigidbody.update();
          }} defaultValue={position.y} />
          <MyInput onBlur={(e: any) => {
            let v = parseFloat(e);
            root.setLocalPosition(position.x, position.y, v);
            // tslint:disable-next-line:no-unused-expression
            root.rigidbody && root.rigidbody.update();
          }} defaultValue={position.z} />
        </Col>
      </Row>
      <Row style={{ marginTop: '5px' }}>
        <Col span={6}>rotation:</Col>
        <Col span={18}>
          <MyInput onBlur={(e: any) => {
            let v = parseFloat(e);
            root.setLocalEulerAngles(v, position.y, position.z);
          }} defaultValue={rotation.x} />
          <MyInput onBlur={(e: any) => {
            let v = parseFloat(e);
            root.setLocalEulerAngles(position.x, v, position.z);
          }} defaultValue={rotation.y} />
          <MyInput onBlur={(e: any) => {
            let v = parseFloat(e);
            root.setLocalEulerAngles(position.x, position.y, v);
          }} defaultValue={rotation.z} />
        </Col>
      </Row>
      <Row style={{ marginTop: '5px' }}>
        <Col span={6}>scale:</Col>
        <Col span={18}>
          <MyInput onBlur={(e: any) => {
            let v = parseFloat(e);
            root.setLocalScale(v, scale.y, scale.z);
          }} defaultValue={scale.x} />
          <MyInput onBlur={(e: any) => {
            let v = parseFloat(e);
            root.setLocalScale(scale.x, v, scale.z);
          }} defaultValue={scale.y} />
          <MyInput onBlur={(e: any) => {
            let v = parseFloat(e);
            root.setLocalScale(scale.x, scale.y, v);
          }} defaultValue={scale.z} />
        </Col>
      </Row>
      <div style={{ margin: '5px 0' }}>
        <Select
          size="small"
          value={undefined}
          style={{ width: '100%' }}
          placeholder="add component"
          onChange={(e: any) => {
            root.addComponent(e, { debugger: true });
            root[e].initialize();
            this.update();
          }}
        >
          {components.map(x => {
            return <Option key={x} value={x}>{x}</Option>;
          })}
        </Select>
      </div>
      <div style={{}}></div>
      {root.collision ? <Card
        size="small"
        title="collision component"
        extra={<a href="javascript:void(0)" onClick={() => {
          root.removeComponent('collision');
          this.update();
        }} >delete</a>}
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
        {create(root.collision.inputs, 'center', () => { root.collision.update(); })}
        {root.collision.inputs.type === 'box' ? create(root.collision.inputs, 'halfExtents', () => { root.collision.update(); }) : null}
        {root.collision.inputs.type === 'sphere' || root.collision.inputs.type === 'cylinder' ? create(root.collision.inputs, 'radius', () => { root.collision.update(); }) : null}
        {root.collision.inputs.type === 'cylinder' ? <Row>
          <Col span={6}>axis:</Col>
          <Col span={18}>
            <Select size="small" defaultValue={root.collision.inputs.axis} style={{ width: 120 }} onChange={(e) => {
              (root.collision.inputs as any).axis = e;
              root.collision.update();
            }}>
              <Option value="x">y</Option>
              <Option value="y">y</Option>
              <Option value="z">z</Option>
            </Select>
          </Col>
        </Row> : null}
        {root.collision.inputs.type === 'cylinder' ? create(root.collision.inputs, 'height', () => { root.collision.update(); }) : null}
      </Card> : null}
      {root.rigidbody ? <Card
        size="small"
        title="rigidbody component"
        extra={<a href="javascript:void(0)" onClick={() => {
          root.removeComponent('rigidbody');
          this.update();
        }} >delete</a>}
      >
        <Row>
          <Col span={6}>type:</Col>
          <Col span={18}>
            <Select size="small" defaultValue={root.rigidbody.inputs.type} style={{ width: 120 }} onChange={(e) => {
              root.rigidbody.inputs.type = e;
              root.rigidbody.update();
              this.update();
            }}>
              <Option value="static">static</Option>
              <Option value="dynamic">dynamic</Option>
            </Select>
          </Col>
        </Row>
        {create(root.rigidbody.inputs, 'friction', () => { root.rigidbody.update(); })}
        {create(root.rigidbody.inputs, 'restitution', () => { root.rigidbody.update(); })}
        {root.rigidbody.inputs.type === 'dynamic' ? create(root.rigidbody.inputs, 'mass', () => { root.rigidbody.update(); }) : null}
        {root.rigidbody.inputs.type === 'dynamic' ? create(root.rigidbody.inputs, 'linearDamping', () => { root.rigidbody.update(); }) : null}
        {root.rigidbody.inputs.type === 'dynamic' ? create(root.rigidbody.inputs, 'angularDamping', () => { root.rigidbody.update(); }) : null}
        {root.rigidbody.inputs.type === 'dynamic' ? create(root.rigidbody.inputs, 'linearFactor', () => { root.rigidbody.update(); }) : null}
        {root.rigidbody.inputs.type === 'dynamic' ? create(root.rigidbody.inputs, 'angularFactor', () => { root.rigidbody.update(); }) : null}
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
      this.update();
    });
    // setInterval(() => {
    //   let nodes = this.format(app.scene.root);
    //   this.setState({ treeData: [nodes] });
    // }, 500);
  }
  update() {
    setTimeout(() => {
      let app = this.props.app;
      let nodes = this.format(app.scene.root);
      this.setState({ treeData: [nodes] });
    }, 300);
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
          <button onClick={() => {
            this.props.app.exportPhysiceConfig();
          }}>导出</button>
          {/* <Switch defaultChecked onChange={() => {

          }} /> */}
        </div>
      </div>
    );
  }
}


