import { useState } from "react";
import '../../styles/collections/CollectionCard.css';
import useCollectionsContext from "../../hooks/use-collections-context";

function CollectionEdit( {collection, onEditSubmit } ) {
  const [name, setName] = useState(collection.name);

  const { editCollectionById } =  useCollectionsContext();

  const handleChange = (event) => {
    setName(event.target.value);
    // console.log('handleChange', name);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('handleSubmit', name);
    editCollectionById(collection.id, name);
    onEditSubmit();
  }

  return (
      <form onSubmit={handleSubmit}>
        <label>Nom :</label>
        <input value={name} onChange={handleChange}/>
        <button>Sauvegarder</button>
      </form>
  );
}

export default CollectionEdit;
