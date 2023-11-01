import React from 'react';
import styles from './Mainpage.module.css';
import { Link } from 'react-router-dom'
function Mainpage() {
  return (
        <div className={styles.container}>
           <div className={styles.logout}>
        <Link to="/login" className={styles.btn}>Logout</Link> 
        </div>
          <div className={styles.heading1}>
          <h1 className={styles.heading}>Welcome TO Virtual Talk Universe</h1>
          </div>
        </div>
  )
}

export default Mainpage