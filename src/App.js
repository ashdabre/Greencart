import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import VerticalTiles from "./components/VerticalTiles";
import Checkout from './components/Checkout'; 
import translate from './pages/translate';
import "react-toastify/dist/ReactToastify.css";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
// const Checkout = lazy(() => import("./pages/Checkout"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <translate />
        <NavBar />
        <VerticalTiles
             animationDelay={1}
             animationDuration={0.5}
             minTileWidth={32}
             stagger={0.05}
             tileClassName="bg-gradient-to-r from-zinc-100 to-zinc-300"
           >
             <div className="flex h-full w-full items-center justify-center bg-zinc-800 p-24">
               <p className="text-2xl font-extrabold text-white">
                 Welcome to our amazing website!
               </p>
             </div>
           </VerticalTiles>
           <translate />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          {/* <Route path="/fprint" element={<FootprintCalculator />} /> */}
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
