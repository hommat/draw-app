import React, { Component } from "react";
import { connect } from "react-redux";

import settings from "../../settings";
import { fillCircle, drawLine } from "../../helpers/canvasHelpers";

class Brush extends Component {
  lastX = null;
  lastY = null;
  mousePressing = false;

  onMouseDown = e => {
    const { ctx, size } = this.props;
    const x = e.clientX;
    const y = e.clientY - settings.height;

    fillCircle(x, y, size, ctx);
    this.lastX = x;
    this.lastY = y;
    this.mousePressing = true;
  };

  onMouseUp = () => {
    this.lastX = null;
    this.lastY = null;
    this.mousePressing = false;
  };

  onMouseMove = e => {
    if (!this.mousePressing) return;
    const { ctx, size } = this.props;
    const x = e.clientX;
    const y = e.clientY - settings.height;

    drawLine(this.lastX, this.lastY, x, y, size, ctx);
    fillCircle(x, y, size, ctx);
    this.lastX = x;
    this.lastY = y;
  };

  addListeners = () => {
    const { canvas2 } = this.props;
    if (!canvas2) return;
    canvas2.addEventListener("mousedown", this.onMouseDown);
    canvas2.addEventListener("mouseup", this.onMouseUp);
    canvas2.addEventListener("mousemove", this.onMouseMove);
  };

  removeListeners = () => {
    const { canvas2 } = this.props;
    if (!canvas2) return;
    canvas2.removeEventListener("mousedown", this.onMouseDown);
    canvas2.removeEventListener("mouseup", this.onMouseUp);
    canvas2.removeEventListener("mousemove", this.onMouseMove);
  };

  componentDidMount() {
    this.addListeners();
  }

  componentDidUpdate() {
    this.addListeners();
  }

  componentWillUpdate() {
    this.removeListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  render() {
    return <div className="tool" id="brush" />;
  }
}

const mapStateToProps = state => {
  return {
    ctx: state.paint.ctx,
    size: state.paint.size,
    canvas2: state.paint.canvas2
  };
};

export default connect(mapStateToProps)(Brush);
