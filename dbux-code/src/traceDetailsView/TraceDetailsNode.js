import { TreeItem, TreeItemCollapsibleState } from 'vscode';
import Application from 'dbux-data/src/Application';
import Trace from 'dbux-common/src/core/data/Trace';
import TraceType from 'dbux-common/src/core/constants/TraceType';
import { EmptyObject } from 'dbux-common/src/util/arrayUtil';
import TraceDetailsNodeType from './TraceDetailsNodeType';
import { getThemeResourcePath } from '../resources';

export class BaseNode extends TreeItem {
  application;
  parent;
  children = null;

  constructor(label, iconPath, application, parent, id, moreProps) {
    super(label);

    this.application = application;
    this.parent = parent;
    this.id = id;

    // treeItem data
    this.contextValue = 'event';
    this.command = {
      command: 'dbuxTraceDetailsView.itemClick',
      arguments: [this]
    };

    this.iconPath = iconPath;

    // more custom props for this node
    Object.assign(this, moreProps);
  }

  get nodeType() {
    return this.constructor.nodeType;
  }
}

export class EmptyNode extends BaseNode {
  constructor() {
    super('(no trace at cursor)');

    this.collapsibleState = TreeItemCollapsibleState.None;
  }

  // singleton
  static get instance() {
    return EmptyNode._instance = (EmptyNode._instance || new EmptyNode());
  }
}

export class ApplicationNode extends BaseNode {
  init(application) {
    this.application = application;
    this.collapsibleState = TreeItemCollapsibleState.Expanded;
  }

  static get nodeType() {
    return TraceDetailsNodeType.StaticTrace;
  }

  static makeLabel(application: Application) {
    return application.getRelativeFolder();
  }

  static makeIconPath(application: Application) {
    return 'string.svg';
  }

  static makeTreeItemProps() {
    return {};
  }
}

// export class StaticTraceNode extends BaseNode {
//   init(staticTrace) {
//     this.staticTrace = staticTrace;
//     this.collapsibleState = TreeItemCollapsibleState.Expanded;
//   }

//   static get nodeType() {
//     return TraceDetailsNodeType.StaticTrace;
//   }

//   static makeLabel(staticTrace: StaticTrace) {
//     // TODO: fix this up a bit for trace that don't have a name
//     return staticTrace.displayName || TraceType.nameFrom(staticTrace.type);
//   }

//   static makeIconPath(staticTrace: StaticTrace) {
//     return 'string.svg';
//   }

//   static makeTreeItemProps() {
//     return {};
//   }
// }

export class TraceNode extends BaseNode {
  init(trace) {
    this.trace = trace;
    this.collapsibleState = TreeItemCollapsibleState.Expanded;
  }

  static get nodeType() {
    return TraceDetailsNodeType.Trace;
  }

  static makeLabel(trace: Trace, application) {
    const {
      staticTraceId,
      type: dynamicType
    } = trace;
    const staticTrace = application.dataProvider.collections.staticTraces.getById(staticTraceId);
    const {
      displayName,
      type: staticType,
    } = staticTrace;
    const traceType = dynamicType || staticType;
    const typeName = TraceType.nameFrom(traceType);
    const title = displayName || `[${typeName}]`;
    return `${title}`;
  }

  static makeIconPath(trace: Trace) {
    return 'string.svg';
  }

  static makeTreeItemProps(trace: Trace, application: Application) {
    // description
    let description;
    const { dataProvider } = application;
    const { traceId } = trace;
    const hasValue = dataProvider.util.doesTraceHaveValue(traceId);
    if (hasValue) {
      const value = dataProvider.util.getTraceValue(traceId);
      // NOTE: description MUST be a string or it won't be properly displayed
      description = value + '';
    }
    
    return {
      description
    };
  }
}


export class TraceDetailNode extends BaseNode {
  init(traceDetail) {
    this.traceDetail = traceDetail;
    this.collapsibleState = TreeItemCollapsibleState.None;
  }

  static get nodeType() {
    return TraceDetailsNodeType.Trace;
  }

  static makeLabel(traceDetail: TraceDetail) {
    return traceDetail.toString();
  }

  static makeIconPath(traceDetail: TraceDetail) {
    return 'string.svg';
  }

  static makeTreeItemProps() {
    return {};
  }
}

let _lastId = 0;

export function createTraceDetailsNode(NodeClass, entry, application, parent): BaseNode {
  const label = NodeClass.makeLabel(entry, application, parent);
  const relativeIconPath = NodeClass.makeIconPath(entry, application, parent);
  const treeItemProps = NodeClass.makeTreeItemProps(entry, application, parent) || EmptyObject;
  const iconPath = relativeIconPath && getThemeResourcePath(relativeIconPath) || null;
  const id = (++_lastId) + '';
  const node = new NodeClass(label, iconPath, application, parent, id, treeItemProps);
  node.init(entry);
  return node;
}