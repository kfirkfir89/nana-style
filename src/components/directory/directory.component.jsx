import CategoryItem from '../category-item/category-item.component';

import './directory.styles.scss'

const Directory = ({categories}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 content-center">
      {categories.map((category) => {
        return(
          <CategoryItem key={category.id} category={category}></CategoryItem>
        );
      })}
    </div>
  );
};

export default Directory;