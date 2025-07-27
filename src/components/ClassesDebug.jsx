import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses } from '../redux/classSlice';

const ClassesDebug = () => {
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector((state) => state.classReducer);

  useEffect(() => {
    console.log('=== CLASSES DEBUG ===');
    console.log('Loading:', loading);
    console.log('Error:', error);
    console.log('Classes count:', classes?.length || 0);
    console.log('Classes data:', classes?.slice(0, 2));
    console.log('localStorage classes:', JSON.parse(localStorage.getItem('classes') || '[]')?.length || 0);
    console.log('===================');
  }, [classes, loading, error]);

  const handleManualFetch = async () => {
    console.log('Manual fetch attempt...');
    try {
      const response = await fetch('/data/classes.json');
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Manual fetch successful:', data?.length || 0, 'classes');
      } else {
        console.error('Manual fetch failed:', response.status);
      }
    } catch (err) {
      console.error('Manual fetch error:', err);
    }
  };

  const handleReduxFetch = () => {
    console.log('Redux fetch attempt...');
    dispatch(getClasses());
  };

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg m-4">
      <h3 className="font-bold text-yellow-800 mb-2">Classes Debug Panel</h3>
      <div className="space-y-2 text-sm">
        <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
        <p><strong>Error:</strong> {error || 'none'}</p>
        <p><strong>Classes Count:</strong> {classes?.length || 0}</p>
        <p><strong>LocalStorage Count:</strong> {JSON.parse(localStorage.getItem('classes') || '[]')?.length || 0}</p>
      </div>
      <div className="mt-4 space-x-2">
        <button 
          onClick={handleManualFetch}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Manual Fetch Test
        </button>
        <button 
          onClick={handleReduxFetch}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
        >
          Redux Fetch Test
        </button>
      </div>
    </div>
  );
};

export default ClassesDebug; 