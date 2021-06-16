import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectListing, selectAfter } from '../../store/subredditSlice';
import Post from '../../common/post/Post'

function SearchPage() {
  const listing = useSelector(selectListing) 
  const after = useSelector(selectAfter) 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData({sortBy: 'hot', after}))
  }, [])

  return (
    <section className="threads-list">
      {
        listing.map((post) => <Post title={post.title} />)
      }
    </section>
  )
}

export default SearchPage;
