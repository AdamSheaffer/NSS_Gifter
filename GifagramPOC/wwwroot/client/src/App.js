import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from "./providers/PostProvider";
import { UserProvider } from "./providers/UserProvider";

import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <PostProvider>
            <Header />
            <ApplicationViews />
          </PostProvider>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
