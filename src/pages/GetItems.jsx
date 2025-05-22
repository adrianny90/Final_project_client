import ItemGrid from "../components/ItemGrid.jsx";

const GetItems = () => {
  return (
    <div className="p-2">
      <div className="flex mt-2">
        <div className="flex-1">
          <ItemGrid />
        </div>
      </div>
    </div>
  );
};

export default GetItems;
