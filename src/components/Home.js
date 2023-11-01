import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import img1 from '../../src/assets/giphy.gif'

function Home() {

  return (
    <>
      <div className={styles.container}>
       
        <div className={styles.heading}>
          <h1 >Virtual Talk Universe</h1>
          <p className={styles.typinganimation}>
            A virtual education person, often referred to as an educational 
          chatbot or virtual tutor, is an artificial intelligence
           assistant to engage in human-like conversations  </p>
        
        </div>
            <div className={styles.user}>
          <h1>
            <Link to="/login" className={styles.btn}>Login</Link>
          </h1>
         
          <br />
          <h1>
            <Link to="/signup" className={styles.btn}>Sign Up</Link>
          </h1>
        </div>
        <div className="earthimg">
          <img src={img1} alt="" srcset="" />
        </div>

        {/* <br />
    <br /><br /><br /><br />
    <h2>{props.name ? `Welcome ${props.name}` : `Login  Please`   }</h2> */}
      </div>
    </>
  )
}

export default Home