
import { useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";

import { useDispatch,useSelector } from "react-redux";

import { getUserProfileThunk } from "./store/slice/user/user.thunk";


function App() {
  
  const dispatch = useDispatch();
  const { isAuthenticated, screenLoading } = useSelector( // <-- Get isAuthenticated from Redux
    (state) => state.userReducer
  );

  useEffect(() => {

    // Log the state to the console when the app loads
    console.log("App component loaded. IsAuthenticated:", isAuthenticated);
    (async () => {
      await dispatch(getUserProfileThunk());
    })();
  }, []);

  

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    
    </>
  );
}

export default App;
