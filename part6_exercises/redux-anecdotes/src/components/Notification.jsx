import { useSelector,useDispatch } from "react-redux"
import { clearNotification } from "../reducers/notificationReducer"
import { useEffect } from "react"

const Notification = () => {
  const dispatch = useDispatch()
  
  let notification = useSelector(state => {
    console.log(state)
    return state.notification
  })
  
  useEffect(() => {
    if (notification !== null) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, 5000);
      return ()=>clearTimeout(timer)
    }
  },[notification,dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if (notification === null) {
    console.log(`MAKING IT NULL`)
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )

}

export default Notification