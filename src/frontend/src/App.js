import NotePage from "./component/container/NotePage";
import "./App.css"
import {MenuContextProvider} from "./component/common/MenuContext";
import {EditorSelection} from "./model/Selection";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NoteEditorContainer from "./component/container/NoteEditorContainer";

export const editorSelection = new EditorSelection();

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <NotePage>
                <div>123</div>
            </NotePage>
        )
    },
    {
        path : "/:noteId",
        element : (
            <NotePage>
                <NoteEditorContainer/>
            </NotePage>
        )
    },
    {
        path:"/new",
        element : (
            <NotePage>
                <NoteEditorContainer/>
            </NotePage>
        )
    }
])

function App() {
    return (
        <div className="App">
            <MenuContextProvider>
                <RouterProvider router={router}/>
            </MenuContextProvider>
        </div>
    );
}

export default App;
