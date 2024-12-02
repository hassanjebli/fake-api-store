
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { createRoot } from "react-dom/client";
import { ProductsList } from "./components/ProductsList";
import "./index.css"


createRoot(document.getElementById("root")).render(<ProductsList />);
