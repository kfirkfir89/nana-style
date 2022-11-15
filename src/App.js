
import Directory from "./components/directory/directory.component";

const App = () => {

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
    <div className="row-cols-1">
      <div className="col text-center py-5 my-2">
        <h1>nana style</h1>
      </div>
      <div className="col">
        <Directory categories={categories}></Directory>
      </div>
    </div>
  );
  
}
export default App;
