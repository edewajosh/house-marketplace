import { Link } from 'react-router-dom'
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'

import bedIcon from '../assets/svg/bedIcon.svg'


const ListingItem = ({listing, id, onDelete, onEdit}) => {
  return (
    <li className="categoryListing">
      <Link 
        to={`${id}`} 
        className='categoryListingLink'>
          <img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className='categoryListingImg'
           />
          <div className='categoryListingDetails'>
            <p className='categoryListingLocation'>{ listing.location }</p>
            <p className='categoryListingName'>{ listing.name }</p>
            <p className='categoryListingPrice'>
              ${listing.offer 
              ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

              {listing.type === 'rent' && ' / Month'}
            </p>
            <div>
              <img src={bedIcon} alt='bath' />
              <p className='categoryListingInfoText'>
                {listing.bathrooms > 1 
                  ? `${listing.bathrooms} Bathrooms` 
                  : '1 Bathroom' }
              </p>
            </div>
          </div>

      </Link>
      {onDelete && (
        <DeleteIcon 
          fill='rgb(231,76,60)'  
          className='removeIcon' 
          onClick={() => onDelete(listing.id, listing.name)} 
        />
      )}
      {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}

    </li>
  )
}

export default ListingItem