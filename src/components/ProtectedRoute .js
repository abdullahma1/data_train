import React, { Children } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../firebase'; // Import your authentication context or hook

const ProtectedRoute = ({ Children }) => {
 let useAuth = false;
 if(!useAuth){
 return <Navigate to="/" />
 } // Get the current user from your authentication context
  return Children;
};

export default ProtectedRoute;
