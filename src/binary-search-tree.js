const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    let newNode = new Node(data);
    if(!this.root()) {
      this.treeRoot = newNode;
      return;
    }
    let pointer = this.root();
    while(1) {
      if (pointer.data > data) {
        if (pointer.left) pointer = pointer.left;
        else {
          pointer.left = newNode;
          return;
        }
      } else {
        if (pointer.right) pointer = pointer.right;
        else {
          pointer.right = newNode;
          return;
        }
      }
    }
  }

  has(data) {
    let pointer = this.root();
    while (pointer) {
      if (pointer.data < data) pointer = pointer.right;
      else if (pointer.data > data) pointer = pointer.left;
      else return true;
    }
    return false;
  }

  find(data) {
    if (!this.has(data)) return null;
    let pointer = this.root();
    while (pointer) {
      if (pointer.data < data) pointer = pointer.right;
      else if (pointer.data > data) pointer = pointer.left;
      else return pointer;
    }
  }

  remove(data) {
    this.treeRoot = removeNode(this.root(), data);

    function removeNode(node, data) {
      if (!node) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let candidateToReplace = node.right;
        while (candidateToReplace.left) {
          candidateToReplace = candidateToReplace.left;
        }
        node.data = candidateToReplace.data;
        node.right = removeNode(node.right, candidateToReplace.data);
        return node;
      }
    }
  }

  min() {
    let pointer = this.root();
    while(pointer.left) {
      pointer = pointer.left;
    }
    return pointer.data;
  }

  max() {
    let pointer = this.root();
    while(pointer.right) {
      pointer = pointer.right;
    }
    return pointer.data;
  }
}

module.exports = {
  BinarySearchTree
};
