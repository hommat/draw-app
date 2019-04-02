import React, {Component} from "react";
import {connect} from "react-redux";
import {clearCtx, strokeTextBorder, fillText} from "../../helpers/canvasHelpers";

class Text extends Component{
    state = {
        startX: null,
        startY: null,
        endX: null,
        endY: null,
        typing: false,
        pressing: false
    }
    onMouseDown = e => {
        const {settingsHeight, ctx, textArea} = this.props;
        const {typing, startX, startY, endX, endY} = this.state;
        const x = e.clientX;
        const y = e.clientY - settingsHeight;
        if(!typing){
            this.setState({startX: x, startY: y, pressing: true});
        }else if(!this.clickedOnBox(x, y, startX, startY, endX, endY)) {
            const lines = textArea.value.split(/\r?\n/);
            for(let i = 0; i < lines.length; i++){
                fillText(Math.min(startX, endX), Math.min(startY, endY) + 30 + 40 *(i), lines[i], ctx);
            }
            this.resetTextArea(textArea);
            this.setState({pressing: false, typing: false});
        }
    }
    onMouseUp = e => {
        if(!this.state.pressing) return;
        const {settingsHeight, textArea, ctx2} = this.props;
        const {startX, startY} = this.state;
        const x = e.clientX;
        const y = e.clientY - settingsHeight;
        this.setState({endX: x, endY: y, pressing: false});
        if(!(x === startX && y === startY)){
            const top = Math.min(startY, y);
            const left = Math.min(startX, x);
            const height = Math.abs(y - startY);
            const width = Math.abs(x - startX);
            this.setTextAreaPosition(textArea, left, top, width, height);
            textArea.style.display = "inline-block";
            textArea.focus();

            clearCtx(ctx2);
            this.setState({typing: true}); 
        }
    }
    onMouseMove = e => {
        if(!this.state.pressing) return;
        const {settingsHeight, ctx2} = this.props;
        const {startX, startY} = this.state;
        const x = e.clientX;
        const y = e.clientY - settingsHeight;

        clearCtx(ctx2);
        strokeTextBorder(startX, startY, x, y, ctx2);     
    }
    setTextAreaPosition = (textArea, left, top, width, height) => {
        textArea.style.left = left + "px";
        textArea.style.top = top + "px";
        textArea.style.width = width + "px";
        textArea.style.height = height + "px";
    }
    resetTextArea = (textArea) => {
        this.setTextAreaPosition(textArea, 0, 0, 0, 0);
        textArea.value = "";
        textArea.style.display = "none";
    }
    clickedOnBox = (x, y, startx, starty, endx, endy) => {
        const xOk = x >= Math.min(startx, endx) && x <= Math.max(startx, endx);
        const yOk = y >= Math.min(starty, endy) && y <= Math.max(starty, endy); 
        return xOk && yOk;
    }
    addListeners = () => {
        const {canvas2} = this.props;
        if(!canvas2) return;
        canvas2.addEventListener("mousedown" , this.onMouseDown);
        canvas2.addEventListener("mouseup" , this.onMouseUp);
        canvas2.addEventListener("mousemove" , this.onMouseMove);
    }
    removeListeners = () => {
        const {canvas2} = this.props;
        if(!canvas2) return;
        canvas2.removeEventListener("mousedown" , this.onMouseDown);
        canvas2.removeEventListener("mouseup" , this.onMouseUp);
        canvas2.removeEventListener("mousemove" , this.onMouseMove);
    }
    componentDidMount(){
        this.addListeners();
    }
    componentDidUpdate(){
        this.addListeners();
    }
    componentWillUpdate(){
        this.removeListeners();
    }
    componentWillUnmount(){
        this.removeListeners();
        this.resetTextArea(this.props.textArea);
    }
    render(){
        return(
            <div className="tool" id="text"/>
        )
    }
} 

const mapStateToProps = state => {
    return {
        ctx: state.paint.ctx,
        ctx2: state.paint.ctx2,
        size: state.paint.size,
        canvas2: state.paint.canvas2,
        settingsHeight: state.paint.settingsHeight,
        textArea: state.paint.textArea
    }
}

export default connect(mapStateToProps)(Text);