import '../../styles/collections/CollectionCard.css';
import useCollectionsContext from '../../hooks/use-collections-context';

function CollectionCard({ collection, handleClick}) {

  const { deleteCollection } = useCollectionsContext();

  return (
    <div>
      <button onClick={() => deleteCollection(`${collection.id}`)} className="collectionCardDeleteBtn">X</button>
      <button onClick={() => handleClick(`${collection.id}`)} className='collectionCard' >{collection.name}</button>
    </div>
  )
}

export default CollectionCard;
