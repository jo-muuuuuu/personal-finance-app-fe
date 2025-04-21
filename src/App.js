import { RouterProvider } from "react-router-dom";
import router from "./router";

import { initMessage } from "./utils/antdMessage";

function App() {
  const messageContextHolder = initMessage();

  return (
    <>
      {messageContextHolder}

      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
