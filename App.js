import React from "react";
import { AuthProvider } from "./Context/AuthContext";
import ProductProvider from "./Context/ProductContext";
// ...existing imports...

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        {/* ...existing components... */}
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
