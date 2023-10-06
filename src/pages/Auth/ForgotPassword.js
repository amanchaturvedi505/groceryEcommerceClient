import React,{useState} from 'react'
import Layout from '../../components/layouts/Layout'
import  toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [question,setQuestion]=useState('')
   
 
    const navigate=useNavigate()
    
     // form function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/v1/auth/forgot-password ',
        {  email, newPassword, question }
      );
      if(res && res.data.success){
        toast.success(res.data && res.data.message)
       
        navigate( '/login')
      
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Forgot password">
      <div className="form-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              className="form-control"
              id="exampleInputQuestion"
              placeholder="Who is your bestfriend ?"
              required
            />
          </div>

     

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
