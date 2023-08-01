// import "./app.css"
import { Header } from "./header/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./home/Home";
import { Blogs } from "./blogs/Blogs";
import { Auth } from "./auth/Auth";
function App() {
  return (
    <div>
      <header>
      <Header/>
      </header>
      <section>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </section>
    
    </div>
  );
}

export default App;
