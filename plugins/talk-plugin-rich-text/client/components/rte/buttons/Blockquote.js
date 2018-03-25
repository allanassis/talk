import createToggle from '../factories/createToggle';
import {
  findIntersecting,
  insertNewLineAfterNode,
  insertNodes,
  getSelectedNodesExpanded,
  outdentNode,
  selectEndOfNode,
  endWithNewLine,
} from '../lib/dom';

function execCommand() {
  const bq = findIntersecting('BLOCKQUOTE', this.container);
  if (bq) {
    outdentNode(bq, true);
  } else {
    const node = document.createElement('blockquote');

    // Expanded selection means we always select whole lines.
    const selectedNodes = getSelectedNodesExpanded();
    if (selectedNodes.length) {
      const firstNode = selectedNodes[0];
      firstNode.parentNode.insertBefore(node, firstNode);
      selectedNodes.forEach(n => {
        node.appendChild(n);
      });
      endWithNewLine(node);
      selectEndOfNode(node);
    } else {
      node.appendChild(document.createElement('br'));
      insertNodes(node);
      selectEndOfNode(node);
    }
  }
  this.broadcastChange();
}

function isActive() {
  return this.focused && !!findIntersecting('BLOCKQUOTE', this.container);
}

function onEnter(node) {
  if (node.tagName !== 'BLOCKQUOTE') {
    return;
  }
  insertNewLineAfterNode(node, true);
  return true;
}

const Blockquote = createToggle(execCommand, { onEnter, isActive });

Blockquote.defaultProps = {
  children: 'Blockquote',
};

export default Blockquote;
