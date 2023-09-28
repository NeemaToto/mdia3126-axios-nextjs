import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'


export default function Home() {
  const [data, setData] = useState();

  var apiKey = 'ff7d99a70f254f0c87bb88943dfea5f1';
  var type = 'tesla';
  var dateFrom = '2023-09-20';
  var dateTo = '2023-09-20';
  var sortBy = 'publishedAt';
  var pageSize = 5;

  const url = `https://newsapi.org/v2/everything?q=${type}&from=${dateFrom}&to=${dateTo}&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${apiKey}`

  function GrabNews() {
    axios.get(url)
      .then((response) => {
        //console.log(response)
        console.clear();
        setData(response.data)
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <main className={`${styles.main}`}>
        <button onClick={() => GrabNews()}>Grab Info</button>
        {
          data && data.articles.map((d, index) => {
            return (
              <div key={index}>
                {d.urlToImage && <Image width={50}
                                        height={50}
                                        src={d.urlToImage}
                                        alt='Image'
                                  />
                }
                <div>
                  {d.author}
                </div>
                <div>
                  {d.title}
                </div>
              </div>
            )
          })
        }
      </main>
    </>
  )
}
