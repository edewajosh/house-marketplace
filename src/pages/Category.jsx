import { useEffect, useState } from "react"

import {collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useParams} from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

const Category = () => {  
  const [listings, setListings] = useState()
  const [loading, setLoading] = useState()

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')
        
        const q = query(
          listingsRef, 
          where('type', '==', params.categoryName), 
          orderBy('timestamp', 'desc'), 
          limit(10))

        // Execute query
        const querySnap = await getDocs(q)

        const currentListings = []

        querySnap.forEach((doc) => {
          currentListings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setListings(currentListings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }
    fetchListings()
  }, [params.categoryName])
   return (
    <div className="category">
      <p className="pageHeader">
        {params.categoryName === 'rent' 
        ? 'Places for Rent'
        : 'Places for Sale'}
      </p>
      {loading ? (<Spinner /> ): listings && listings.length > 0 ? (
      <>
        <main>
          <ul className="categoryListings">
            { listings.map((listing) => {
              <ListingItem listing={listing} id={listing.id} key={listing.id} />
            })}
          </ul>
        </main>
      </>
      ): (
        <p>No listing for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category