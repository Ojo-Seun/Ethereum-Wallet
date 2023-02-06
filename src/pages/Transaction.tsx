import React, { useEffect, useState } from "react"
import { ethers } from "ethers"
import styles from "../styles/Transaction.module.css"
import Loading from "../components/Loading"

const address = "0x473780deAF4a2Ac070BBbA936B0cdefe7F267dFc"

function Transaction() {
  const [data, setdata] = useState<{ price: number; loading: boolean }>({
    price: 0,
    loading: false,
  })
  const provider = new ethers.providers.EtherscanProvider()

  const felch = () => {
    setdata({ price: 0, loading: true })

    provider.getBalance(address)
      .then((price) => {
        const formatBalance = ethers.utils.formatEther(price)
        setdata({ price: parseFloat(formatBalance), loading: false })
      })
      .catch((err) => {
        setdata({ price: 0, loading: false })
        console.log(err)
      })
  }

  useEffect(() => {}, [])
  return (
    <div className={styles.transaction}>
      <h1>Transaction</h1>
      <div>
        <div>
          <span>{data.price} ETH</span>
          {data.loading && <Loading />}
        </div>
        <button className="btn" type="button" onClick={felch}>
          Send
        </button>
      </div>
    </div>
  )
}

export default Transaction
