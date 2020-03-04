import TraceType from '../constants/TraceType';
import HasValue from './HasValue';

export default class Trace extends HasValue {
  traceId: number;
  staticTraceId: number;
  applicationId: number;
  runId: Number;
  contextId: number;
  loopId: Number;

  /**
   * NOTE: this is the dynamic type only.
   *       Use DataProvider.util.getTraceType to get actual TraceType.
   */
  type: TraceType;
}