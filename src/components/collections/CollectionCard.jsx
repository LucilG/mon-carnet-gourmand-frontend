import '../../styles/collections/CollectionCard.css';
import useCollectionsContext from '../../hooks/use-collections-context';
import { useState } from 'react';
import CollectionEdit from './CollectionEdit';
import { useNavigate } from 'react-router';
import { COLLECTIONS_PATH } from '../../constants';

function CollectionCard({ collection, handleClick}) {

  const { collections, deleteCollectionById, fetchCollections } = useCollectionsContext();
  const [showEdit, setShowEdit] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const navigate = useNavigate();

  // const handleClickDelete = () => {
  //   deleteCollectionById(`${collection.id}`);
  // };

  // const handleClickEdit = () => {
  //   setShowEdit(!showEdit);
  // };

  const handleEditSubmit = () => {
    setShowEdit(false);
    location.reload();
    // console.log(collections);
    // fetchCollections();
    // navigate(COLLECTIONS_PATH);
  };

  let contentEdit = <button onClick={() => handleClick(`${collection.id}`)} className='collectionCardLinkBtn' >{collection.name}</button>;
  if (showEdit) {
    contentEdit = <CollectionEdit collection={collection} onEditSubmit={handleEditSubmit} />
  }

  let contentActions = <div className='collectionCardActionBtns'/>
  if (showActions) {
    contentActions = <div className='collectionCardActionBtns'>
                        <button onClick={() => deleteCollectionById(`${collection.id}`)} className="collectionCardDeleteBtn">X</button>
                        <button onClick={() => setShowEdit(!showEdit)} className="collectionCardEditBtn">Edit</button>
                      </div>
  }
  return (
    <div className='collectionCard' onMouseOver={() => setShowActions(true)} onMouseLeave={() => setShowActions(false)}>
      {contentActions}
      {contentEdit}
    </div>
  )
}

export default CollectionCard;
