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
import { Tree } from 'antd';
import { format } from 'util';
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
      title: '',
      key: 0,
      children: [] as Array<any>
    };
    if (root.children.length > 0) {
      root.children.forEach(x => {
        node.children.push(this.format(x));
      });

    }
    node.title = root.name;
    node.key = root.EntityID;
    return node;
  }
  componentDidMount() {
    // console.log(this.props.app);
    let app = this.props.app;
    app.on('start', () => {
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


