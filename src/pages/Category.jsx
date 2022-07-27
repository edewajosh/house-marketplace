import { useEffect, useState } from "react"

import {collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useParams} from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

const Category = () => {  
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')
        
        // Get a query
        const q = query(
          listingsRef, 
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'), 
          limit(10)
        )

        // Execute query
        const querySnapshot = await getDocs(q)

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        console.log('Last visible', lastVisible)
        setLastFetchedListing(lastVisible)

        const currentListings = []

        querySnapshot.forEach((doc) => {
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

  // pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings')

      // Create query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      )

      // Execute query
      const querySnapshot = await getDocs(q)
      
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
    }
  }
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
            { listings.map((listing) => (
              <ListingItem 
                listing={listing} 
                id={listing.id} 
                key={listing.id} />
            ))}
          </ul>
        </main>
        <br/>
        <br/>
        {lastFetchedListing && (
          <p className="loadMore" onClick={onFetchMoreListings}>
            Load More
          </p>
        )}
      </>
      ): (
        <p>No listing for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category