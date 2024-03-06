import Router from "./providers/router.tsx";
import Layout from "../widgets/layout/Layout.tsx";
import "./styles/index.css"
function App() {

    return (
        <Layout>
            <Router/>
        </Layout>
    )
}

export default App
