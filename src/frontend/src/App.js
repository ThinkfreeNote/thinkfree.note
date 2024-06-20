import NotePage from "./component/container/NotePage";
import "./App.css"
import {MenuContextProvider} from "./component/ui/menu/MenuContext";
import {EditorSelection} from "./model/Selection";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NoteEditorContainer from "./component/container/NoteEditorContainer";
import HomePage from "./component/container/HomePage";

export const editorSelection = new EditorSelection();

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <NotePage>
                <HomePage/>
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
                <NoteEditorContainer key="new"/>
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
