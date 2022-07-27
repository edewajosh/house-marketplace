import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import { useNavigate, useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Spinner from "../components/Spinner"
import { db } from "../firebase.config"
import shareIcon from '../assets/svg/shareIcon.svg'

const Listing = () => {

  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sharedLinkCopied, setSharedLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {

      const docRef = doc(db, 'listings', params.ListingId)

      const docSnapshot = await getDoc(docRef)

      if (docSnapshot.exists()){
        setListing(docSnapshot.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [navigate, params.ListingId])

  if(loading){
    return <Spinner />
  }

  return (
    <main>
      <Helmet>
        <title>{listing.name}</title>
      </Helmet>
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imageUrls.map((url, index)=>(
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imageUrls[index]}) center no-repeat`,
                backgroundSize: 'cover'
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setSharedLinkCopied(true)
          setTimeout(() => {
            setSharedLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='' />
      </div>

      {sharedLinkCopied && <p className="linkCopied">Link Copied</p>}

      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - $
          {listing.offer 
              ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === 'rent'? 'Rent': 'Sale'}
        </p>
        {listing.offer && (
          <p className="discountedPrice">
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms >1 ? `${listing.bedrooms} Bedrooms`: '1 Bedroom'} 
          </li>

          <li>
            {listing.bathrooms >1 ? `${listing.bathrooms} Bathrooms`: '1 Bathroom'} 
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>

        <p className='listingLocationTitle'>Location</p>
      </div>
    </main>
  )
}

export default Listing