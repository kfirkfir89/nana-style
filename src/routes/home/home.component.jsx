
import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";

const Home = () => {

  const categories = [
    {
      id: 1,
      title: 'Hats',
      imageUrl:"https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 2,
      title: 'Jackets',
      imageUrl:"https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: 3,
      title: 'Sneakers',
      imageUrl:"https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      id: 4,
      title: 'Womens',
      imageUrl:"https://i.ibb.co/GCCdy8t/womens.png",
    },
    {
      id: 5,
      title: 'Mens',
      imageUrl:"https://i.ibb.co/R70vBrQ/men.png",
    },   
  ];

  return (
    <div className="grid grid-cols-1 px-0">
      <div className="text-center text-[#00df9a] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-2xl pb-4">
        <h1>nana style</h1>
      </div>
      <div className="">
        <Directory categories={categories}></Directory>
      </div>
    </div>
  );
  
}
export default Home;
