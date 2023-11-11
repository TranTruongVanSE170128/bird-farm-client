import { useEffect, useState } from 'react'

function Test() {
  const [check, setCheck] = useState(false)

  setCheck(true)

  useEffect(() => {
    // fetchData()
  }, [check])

  return <div></div>
}

export default Test
