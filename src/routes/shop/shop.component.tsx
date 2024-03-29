import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.componenet';
import Category from '../category/category.component';
import { featchCategoriesStart } from '../../store/categories/category.action';

const Shop = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(featchCategoriesStart());    
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;