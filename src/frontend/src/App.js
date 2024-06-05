import NotePage from "./component/container/NotePage";
import "./App.css"
import {MenuContextProvider} from "./component/common/MenuContext";
import {EditorSelection} from "./model/Selection";

export const editorSelection = new EditorSelection();

function App() {

    return (
        <div className="App">
            <MenuContextProvider>
                <NotePage/>
            </MenuContextProvider>
        </div>
    );
}

export default App;
