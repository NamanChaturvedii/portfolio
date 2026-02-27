import  axios from 'axios';
import React,{ useState } from 'react';







export default function ContactMe() {
    const [name,setName]=useState('');
    const [last,setLast]=useState('');
    const [email,setEmail]=useState('');
    const [number,setNumber]=useState('');
    const [topic,setTopic]=useState('');
    const [message,setMessage]=useState('');
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const data= {name,
                last,
                email,
                number,
                topic,
                message}
            const res=await axios.post(`https://portfolio-sc72.onrender.com/api/v1/auth/register`,
                data
            )
            if(res.data.success){
                console.log('Message sent successfully')
                window.location.reload()
                window.scrollTo(0,0)
                
                
            }else{
                console.log('Message not sent')
                console.log(res)
            }
            
        }catch(error){
            console.log(error)
            console.log('Message went wrong')
        }
    }






    return (
        <section id="Contact" className="contact--section">
            <div>
                <p className="sub--title">Get In Touch</p>
                <h2>Contact Me</h2>
            </div>
            <div style={{fontWeight:"bold",fontSize:"20px"}}>
                Email: namanchaturvedi58@gmail.com
                <br />
                Phone Number: +918769612896

            </div>
        </section>
    );
}
