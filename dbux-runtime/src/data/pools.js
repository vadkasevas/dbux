import Trace from 'dbux-common/src/core/data/Trace';
import ExecutionContext from 'dbux-common/src/core/data/ExecutionContext';

/**
 * TODO: proper object pooling
 */
const pools = {
  executionContexts: {
    /**
     * @return {ExecutionContext}
     */
    allocate(contextType, stackDepth, contextId, staticContextId, orderId, parentContextId, schedulerId) {
      // TODO: use object pooling
      const context = new ExecutionContext();
      context.contextType = contextType;
      context.stackDepth = stackDepth;
      context.contextId = contextId;
      context.staticContextId = staticContextId;
      context.orderId = orderId;
      context.parentContextId = parentContextId;
      context.schedulerId = schedulerId;
      // this.createdAt = _performance.now();
      // context.resumedChildren = null;

      return context;
    }
  },
  
  traces: {
    allocate() {
      return new Trace();
    }
  }
};

export default pools;