import React, { useContext,useEffect,useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import ProductContext from '../Context/ProductContext';
import s1 from "../assets/picTwo.jpg";
import { toast } from 'react-toastify';

const SearchResult = ()=>{
    const params = useParams();
    const searchQuery = params.searchQuery;
    const {
      products,
      state: { cart },
      dispatch,
      allProduct,
      editProduct,
      deleteProduct,
    } = useContext(ProductContext);
    console.log("Product items:", products);
    console.log("Carts items:", cart);
    console.log(allProduct);

    const [menuVisible, setMenuVisible] = useState(false);
    const [modelVisible, setModelVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const showAddNotification = () => toast.success("Added Cart Successfully");
    const showRemoveNotification = () =>
      toast.error("Removed Cart Successfully");

    const handleMenu = (id) => {
      setMenuVisible((prevMenu) => ({
        ...prevMenu,
        [id]: !prevMenu[id],
      }));
    };

    const OpenEditModal = (prod) => {
      setModelVisible(true);
      setSelectedProduct(prod);
    };

    const EditCloseModal = () => {
      setModelVisible(false);
      setSelectedProduct(null);
    };

    const EditSave = (updatedData) => {
      console.log("save changing or changed");
      editProduct(selectedProduct._id, updatedData);
    };

    const handleDeleteMenu = async (id) => {
      console.log("deleting products");
      await deleteProduct(id);
    };
    useEffect(() => {
      allProduct(searchQuery);
    }, [searchQuery]);
  return (
    <>
      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-2xl font-bold">My Products</h4>
            <Link
              to="/addproduct"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus size={20} />
              Add Products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products &&
              products?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative h-48">
                    <img
                      className="w-full h-full object-cover"
                      src={
                        item.image?.length > 0
                          ? `http://localhost:3000/uploads/${item.image[0]}`
                          : s1
                      }
                      alt={item.name || "Product Image"}
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h5 className="text-lg font-semibold">{item.name}</h5>
                    </div>

                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-4 space-y-1">
                      <p className="text-sm">
                        <span className="font-semibold">Price:</span> $
                        {item.price}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">InStock:</span>{" "}
                        {item.inStock}
                      </p>
                    </div>
                    <div className="mt-4">
                      {cart && cart.some((p) => p._id === item._id) ? (
                        <button
                          onClick={() => {
                            showRemoveNotification();
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item
                            });
                          }}
                          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                          Remove From Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            showAddNotification();
                            dispatch({ type: "ADD_TO_CART", payload: item });
                          }}
                          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Add To Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Edit Modal */}
          {modelVisible && selectedProduct && (
            <EditModel
              isOpen={modelVisible}
              onClose={EditCloseModal}
              prod={selectedProduct}
              onSave={EditSave}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default SearchResult