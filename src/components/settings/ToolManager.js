import React, {useState} from "react";
import Brush from "../tools/Brush";
import Rubber from "../tools/Rubber";
import Line from "../tools/Line";
import Ellipse from "../tools/Ellipse";
import Rect from "../tools/Rect";
import Fill from "../tools/Fill";
import Picker from "../tools/Picker";
import Text from "../tools/Text";

const DrawManager = () => {
    const [tool, setTool] = useState(<Brush/>);
    const handleToolClick = newTool => {
        setTool(newTool);
    }
    return(
        <div className="toolmaganer">
            <div className="toolselect">
                <div className="tooloption" onClick={() => handleToolClick(<Brush/>)}>
                    <i className="fas fa-paint-brush"></i>
                </div>
                <div className="tooloption" onClick={() => handleToolClick(<Rubber/>)}>
                    <i className="fas fa-eraser"></i>
                </div>
                <div className="tooloption" onClick={() => handleToolClick(<Line/>)}>
                    <div className="line"></div>
                </div>
                <div className="tooloption" onClick={() => handleToolClick(<Ellipse/>)}>
                    <i className="far fa-circle"></i>
                </div>
                <div className="tooloption" onClick={() => handleToolClick(<Rect/>)}>
                    <div className="rect"></div>
                </div>
                <div className="tooloption" onClick={() => handleToolClick(<Fill/>)}>
                    <i className="fas fa-fill-drip"></i>
                </div>
                <div className="tooloption" onClick={() => handleToolClick(<Picker/>)}>
                    <i className="fas fa-eye-dropper"></i>
                </div>
                <div className="tooloption" onClick={() => handleToolClick(<Text/>)}>
                    <i className="fab fa-amilia"></i>
                </div>
            </div>
            {tool}
        </div>
    )
}

export default DrawManager;