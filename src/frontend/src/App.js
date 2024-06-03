import NotePage from "./component/container/NotePage";
import "./App.css"
import {MenuContextProvider} from "./component/common/MenuContext";

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
