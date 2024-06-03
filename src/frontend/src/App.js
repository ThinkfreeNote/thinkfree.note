import NotePage from "./component/container/NotePage";
import "./App.css"
import {MenuContextProvider} from "./component/common/MenuContext";
import {useEffect} from "react";
import {EditorSelection} from "./model/Selection";

export const editorSelection = new EditorSelection();
console.log(editorSelection);
function App() {

    const handler = (e) => {
        editorSelection.updateSelectionNodes();
    }
    useEffect(()=>{
        document.addEventListener("selectionchange",handler);

        return () => {
            document.removeEventListener("selectionchange",handler);
        }
    })

    return (
        <div className="App">
            <MenuContextProvider>
                <NotePage/>
            </MenuContextProvider>
        </div>
    );
}

export default App;
