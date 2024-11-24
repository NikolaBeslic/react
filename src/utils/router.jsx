import { Route, BrowserRouter, Routes, Router } from "react-router-dom";
import SingleIntervjuView from "../views/SingleIntervjuView";
import IndexIntervjuView from "../views/IndexIntervjuView";

const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/kategorija/intervju" compomonent={IndexIntervjuView} />
        </Routes>
    </Router>
)

export default AppRouter;