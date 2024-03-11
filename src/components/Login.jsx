import { React, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "../config/Firebase";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';


function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Reset the user state to null
      navigate('/login'); // Navigate to the login page
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle error
    }
  };
   

    // const history = useHistory();
    // async function to SignUp user
    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Signup Successful");
        } catch (error) {
            console.error("Error signing up:", error.message);
            alert("Signup Failed: " + error.message);
        }
    }

    // async function to Signin user
// async function to Signin user
const signIn = async () => {
  try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signin Successful");
      
      // Get the current user
      const currentUser = auth.currentUser;
      
      // Update the user state with the current user's UID
      setUser(currentUser.uid);
      navigate('/userdashboard');
      
  } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Signin Failed: " + error.message);
  }
}


    // async function to Sign user in using Google OAuth
   // ...

   const signInWithGoogle = async () => {
    try {
        // Sign in with Google using popup
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Update the user state with the current user's UID
        setUser(user.uid);
        navigate('/userdashboard')
    } catch (error) {
        console.error('Error signing in with Google:', error);
        // Handle error
    }
};


// ...


    return (
        <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Sign in to your account
         </h2>
       </div>

       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <div className="space-y-6" >
           <div>
             <label htmlFor="email" className="flex text-sm font-medium leading-6 text-gray-900">
               Email address
             </label>
             <div className="mt-2">
               <input
                 id="email"
                 name="email"
                 type="email"
                 autoComplete="email"
                 required
                 onChange={(e)=>{setEmail(e.target.value)}}
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>

           <div>
             <div className="flex items-center justify-between">
               <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                 Password
               </label>
               <div className="text-sm">
                 <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                   Forgot password?
                 </a>
               </div>
             </div>
             <div className="mt-2">
               <input
                 id="password"
                 name="password"
                 type="password"
                 autoComplete="current-password"
                 required
                 onChange={(e)=>{setPassword(e.target.value)}}
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>

           <div>
             <button
               type="submit"
               onClick={signIn}
               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
               Sign in
             </button>
           </div>

           <div>
             <button
               type="submit"
               onClick={signUp}
               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
               Sign up
             </button>
           </div>

           <div>
             <button
               type="submit"
               onClick={signInWithGoogle}
               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
               Sign in with Google
             </button>
           </div>

         </div>

         <p className="mt-10 text-center text-sm text-gray-500">
           Not a member?{' '}
           <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Start a 14 day free trial
           </a>
         </p>
       </div>
     </div>
   </div>
    );
}

export default Login;

