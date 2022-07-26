import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import {collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase.config'
import ListingItem from "../components/ListingItem"
import Spinner from '../components/Spinner'


const Offers = () => {

  const[listings, setListings] = useState(null)
  const[loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  useEffect(() => {
    const fetchListings = async () => {
      try {
      
        const listingsRef = collection(db, 'listings')
  
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        )
  
        const querySnapshot = await getDocs(q)
  
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        setLastFetchedListing(lastVisible)
  
        const currentListings = []
  
        querySnapshot.forEach((doc) => {
          return currentListings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListings(currentListings)
        setLoading(false)
  
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }
    fetchListings()
  }, [])

  const onFetchMoreListings = async () => {
   try {
      const listingsRef = collection(db, 'listings')


    const q = query(
      listingsRef,
      where('offer', '==', true),
      orderBy('timestamp', 'desc'),
      limit(10)
    )
    
    const querySnapshot = await getDocs(q)
  
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        setLastFetchedListing(lastVisible)
  
        const currentListings = []
  
        querySnapshot.forEach((doc) => {
          return currentListings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListings(currentListings)
        setLoading(false)
   } catch (error) {
    toast.error('Could not fetch listings')
   }
  }

  return (
    <div className='category'>
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {loading ? (
        <Spinner />
      ): listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
          <br />
          <br />

          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ): (
        <p>There are no current offers</p>
      )}
    </div>
  )
}

export default Offers