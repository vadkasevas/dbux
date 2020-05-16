import { compileHtmlElement } from '@/util/domUtil';
import ClientComponentEndpoint from '../componentLib/ClientComponentEndpoint';

class ContextNode extends ClientComponentEndpoint {
  get popperEl() {
    return window._popperEl;
  }

  createEl() {
    return compileHtmlElement(/*html*/`
      <div class="context-node flex-row">
        <div class="full-width flex-column">
          <div data-el="title" class="title">
            <div class="flex-row">
              <div class="flex-row">
                <button data-el="nodeToggleBtn" class="node-toggle-btn"></button>
                <div data-el="displayName,popperTarget" class="displayName dbux-link"></div>
                &nbsp;
                <button data-el="staticContextHighlightBtn">💡</button>
                &nbsp;
                <div>
                  <span class="loc-label" data-el="locLabel"></span>
                </div>
                &nbsp;
                <div>
                  <span class="value-label" data-el="valueLabel"></span>
                </div>
              </div>
              <div class="flex-row">
              </div>
            </div>
            <div data-mount="TraceNode"></div>
          </div>
          <div class="full-width flex-row">
            <div class="node-left-padding"></div>
            <div data-mount="ContextNode" data-el="nodeChildren" class="node-children"></div>
          </div>
        </div>
      </div>
      `);
  }

  update() {
    const {
      applicationId,
      context: { contextId, staticContextId },
      displayName,
      valueLabel,
      positionLabel
    } = this.state;

    this.el.id = `application_${applicationId}-context_${contextId}`;
    this.el.style.background = `hsl(${this.getBinaryHsl(staticContextId)},50%,85%)`;
    this.els.title.id = `name_${contextId}`;
    //this.els.title.textContent = `${displayName}#${contextId}`;
    this.els.displayName.textContent = `${displayName}`;
    this.els.locLabel.textContent = positionLabel;
    this.els.valueLabel.textContent = valueLabel;
    this.els.nodeChildren.id = `children_${contextId}`;

    this.popperString = `${displayName} (shift + click to follow)`;
  }

  getBinaryHsl(i) {
    let color = 0;
    let base = 180;
    while (i !== 0) {
      color += (i % 2) * base;
      i = Math.floor(i / 2);
      base /= 2;
    }
    return color;
  }

  on = {
    displayName: {
      click(evt) {
        // const graphNode = this.controllers.getComponent('GraphNode');
        // console.log(graphNode.isDOMExpanded());

        if (evt.shiftKey) {
          const { context, applicationId } = this.state;
          this.remote.showContext(applicationId, context.contextId);
        }
      }
    },
    staticContextHighlightBtn: {
      click(evt) {
        this.remote.toggleStaticContextHighlight();
      }
    }
  }
}
export default ContextNode;