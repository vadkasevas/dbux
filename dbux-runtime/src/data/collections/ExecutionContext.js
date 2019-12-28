let _performance;

if (typeof window !== 'undefined') {
  _performance = performance;
}
else {
  _performance = eval("require('perf_hooks').performance");
}

export default class ExecutionContext {
  /**
   * @return {ExecutionContext}
   */
  static allocate(contextType, contextId, programId, staticContextId, orderId, parentContextId, schedulerId) {
    // TODO: use object pooling
    const context = new ExecutionContext();
    context._init(contextType, contextId, programId, staticContextId, orderId, parentContextId, schedulerId);
    return context;
  }

  _init(contextType, contextId, programId, staticContextId, orderId, parentContextId, schedulerId) {
    this.contextType = contextType;
    this.programId = programId;
    this.staticContextId = staticContextId;
    this.orderId = orderId;
    this.contextId = contextId;
    // this.createdAt = _performance.now();
    this.rootContextId = parentContextId;
    this.schedulerId = schedulerId;
    this.scheduledChildren = null;
  }

  /**
   * This is probably not necessary.
   * We can also find all children by searching for all contexts whose `schedulerId` equals this' `contextId`.
   */
  // addScheduledChild(scheduledContextId) {
  //   // this.scheduledChildren = this.scheduledChildren || [];
  //   // this.scheduledChildren.push(scheduledContextId);
  // }
}