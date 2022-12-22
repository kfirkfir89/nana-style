import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.componenet';
import Category from '../category/category.component';
import { featchCategoriesAsync } from '../../store/categories/category.action';

const Shop = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(featchCategoriesAsync());    
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;