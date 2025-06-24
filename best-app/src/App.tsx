import { BrowserRouter, Route, Routes } from "react-router";
import { Col, Row } from "react-bootstrap";
import Home from "./pages/Home";
import Side from "./components/Side";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostApp from "./pages/PostApp";
import "./App.css";
import PostView from "./components/posts/PostView";
import PostEdit from "./components/posts/PostEdit";
import SignupForm from "./components/users/SignupForm";
import UserList from "./components/users/UserList";
import LoginModal from "./components/users/LoginModal";
import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  return (
    <>
      <div className="container fluid py-5">
        <BrowserRouter>
          <Row>
            <Col className="mb-5">
              <Header />
            </Col>
          </Row>
          <Row className="main">
            <Col
              xs={12}
              sm={4}
              md={4}
              lg={3}
              className="d-none d-sm-block mt-3"
            >
              <Side setShowLogin={setShowLogin} />
            </Col>
            <Col xs={12} sm={8} md={8} lg={9}>
              {/* login modal */}
              <LoginModal show={showLogin} setShowLogin={setShowLogin} />

              {/* route */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<PostApp />} />
                <Route path="/posts/:id" element={<PostView />} />
                <Route path="/postEdit/:id" element={<PostEdit />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/admin/users" element={<UserList />} />
              </Routes>
            </Col>
          </Row>
          <Row>
            <Col lg={12}></Col>
          </Row>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
