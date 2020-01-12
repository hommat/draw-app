import React, { Component } from "react";
import { connect } from "react-redux";
import { clearCtx, strokeEllipse } from "../../helpers/canvasHelpers";

class Ellipse extends Component {
  startX = null;
  startY = null;
  mousePressing = false;

  onMouseDown = e => {
    const { settingsHeight } = this.props;
    const x = e.clientX;
    const y = e.clientY - settingsHeight;

    this.startX = x;
    this.startY = y;
    this.mousePressing = true;
  };

  onMouseUp = e => {
    const { ctx, ctx2, size, settingsHeight } = this.props;
    const x = e.clientX;
    const y = e.clientY - settingsHeight;

    clearCtx(ctx2);
    strokeEllipse(this.startX, this.startY, x, y, size, ctx);
    this.mousePressing = false;
  };

  onMouseMove = e => {
    if (!this.mousePressing) return;
    const { ctx2, size, settingsHeight } = this.props;
    const x = e.clientX;
    const y = e.clientY - settingsHeight;

    clearCtx(ctx2);
    strokeEllipse(this.startX, this.startY, x, y, size, ctx2);
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
    return <div className="tool" id="ellipse" />;
  }
}

const mapStateToProps = state => {
  return {
    ctx: state.paint.ctx,
    ctx2: state.paint.ctx2,
    size: state.paint.size,
    canvas2: state.paint.canvas2,
    settingsHeight: state.paint.settingsHeight
  };
};

export default connect(mapStateToProps)(Ellipse);
