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
                <p className="text-lg">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, odit.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="contact--form--container">
                <div className="container">
                    <label htmlFor="first-name" className="contact--label">
                        <span className="text-md" >First Name</span>
                        <input
                            className="contact--input text-md"
                            name="first-name"
                            id="first-name"
                            type="text" value={name} onChange={(e)=>setName(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="last-name" className="contact--label">
                        <span className="text-md" >Last Name</span>
                        <input
                            type="text"
                            className="contact--input text-md"
                            name="last-name"
                            id="last-name"
                            value={last} onChange={(e)=>setLast(e.target.value)}
                            
                        />
                    </label>
                    <label htmlFor="email" className="contact--label">
                        <span className="text-md" type="email">Email</span>
                        <input
                            type="email"
                            className="contact--input text-md"
                            name="email"
                            id="email"
                            value={email} onChange={(e)=>setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="phone-number" className="contact--label">
                        <span className="text-md" type="number">phone-number</span>
                        <input
                            type="number"
                            className="contact--input text-md"
                            name="phone-number"
                            id="phone-number"
                            value={number} onChange={(e)=>setNumber(e.target.value)}
                            required
                        />
                    </label>
                </div>
                {/* <label htmlFor="choode-topic" className="contact--label">
                    <span className="text-md" type="topic">Choose a topic</span>
                    <select id="choose-topic" className="contact--input text-md" value={topic} onChange={(e)=>setTopic(e.target.value)}>
                        <option>Select One...</option>
                        <option>Item 1</option>
                        <option>Item 2</option>
                        <option>Item 3</option>
                    </select>
                </label> */}
                <label htmlFor="message" className="contact--label">
                    <span className="text-md" type="message">Message</span>
                    <textarea
                        className="contact--input text-md"
                        id="message"
                        rows="8"
                        placeholder="Type your message..."
                        value={message} onChange={(e)=>setMessage(e.target.value)}
                    />
                </label>
                {/* <label htmlFor="checkboc" className="checkbox--label">
                    <input type="checkbox" required name="checkbox" id="checkbox" />
                    <span className="text-sm">I accept the terms</span>
                </label> */}
                <div>
                    <button type='submit' className="btn btn-primary contact--form--btn" 
                >Submit</button>
                </div>
            </form>
        </section>
    );
}
