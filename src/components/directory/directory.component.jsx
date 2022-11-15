import CategoryItem from '../category-item/category-item.component';

import './directory.styles.scss'

const Directory = ({categories}) => {
  return (
    <div className="categories-container container-xl row-cols-1">
      {categories.map((category) => {
        if(category.id === 5){
          return(
              <div className='col px-2'>
                <CategoryItem key={category.id} category={category}></CategoryItem>
              </div>
            );
          }
          else{
            return(
              <div className='col col-md-6 px-2'>
                <CategoryItem key={category.id} category={category}></CategoryItem>
              </div>
            );    
          }
      })}
    </div>
  );
};

export default Directory;