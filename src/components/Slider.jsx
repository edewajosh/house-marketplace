import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { db } from "../firebase.config"
import Spinner from "./Spinner"

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Slider = () => {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
      const fetchListings = async () => {
        const listingRef = collection(db, 'listings')
        const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5))
        const querySnap = await getDocs(q)
        
        let currentListings = []

        querySnap.forEach((doc) => {
            return currentListings.push({
                id: doc.id,
                data: doc.data(),
            })
        })
        setListings(currentListings)
        setLoading(false)
        // console.log(listings)
      }

      fetchListings()
    }, [])
    
    if (loading){
        return <Spinner />
    }

    if (listings.length === 0){
        return <></>
    }
    return (
        listings && (
            <>
                <p className='exploreHeading'>Recommended</p>

                <Swiper slidesPerView={1} pagination={{clickable: true}}>
                    {listings.map(({data, id}) =>(
                        <SwiperSlide
                            key={id}
                            onClick={() => navigate(`category/${data.type}/${id}`)}
                        >
                            <div
                                style={{
                                    background: `url(${data.imageUrls[0]}) center no-repeat`,
                                    backgroundSize: 'cover',
                                }}
                                className='swiperSlideDiv'
                            >
                                <p className='swiperSlideText'>{data.name}</p>
                                <p className='swiperSlidePrice'>
                                    ${data.discountedPrice ?? data.regularPrice }{' '}
                                    {data.type === 'rent' && '/ month'}
                                </p>

                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    )
}

export default Slider